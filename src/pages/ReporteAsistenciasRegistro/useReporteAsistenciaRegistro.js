import { useEffect, useState } from "react";
import { consultarAsistencias } from "../../services/reporteAsistenciasRegistro/consultarAsistencias";
import { setMessageError } from "../../store/ui/uiSlice";
import { useDispatch } from "react-redux";
import { consultarSueldos } from "../../services/reporteAsistenciasRegistro/consultarSueldos";
import { useExcel } from "../../hooks/useExcel";
import { getFormattedDate } from "../../assets/utils";

const formatDate= 'dd/mm/yyyy';
const formatNumber = '0.00';
const formatMoney = '_-"S/" * #,##0.00_-;-"S/" * #,##0.00_-;_-"S/" * "-"??_-;_-@_-';

const columnasWorksheets = {
    asistencias: [
        { key : "fecha", header: "FECHA", style: { numFmt : formatDate }},
        { key : "codigo_unico", header: "PERSONAL"},
        { key : "hora_entrada_mañana", header: "HORA ENTRADA MAÑANA"},
        { key : "hora_salida_mañana", header: "HORA SALIDA MAÑANA"},
        { key : "hora_entrada_tarde", header: "HORA ENTRADA TARDE"},
        { key : "hora_salida_tarde", header: "HORA SALIDA TARDE"},
        { key : "total_horas", header: "TOTAL HORAS", style : { numFmt : formatNumber}},
    ],
    sueldos: [
        { key: "codigo_unico", header: "Código", align: "left"},
        { key: "trabajador", header: "Nombres de Trabajador", align: "left"},
        { key: "empresa", header: "Empresa", align: "left"},
        { key: "costo_horas", header: "Costo Hora", align: "right", style : { numFmt : formatMoney}},
        { key: "total_horas", header: "Total Horas", align: "right", style : { numFmt : formatNumber}},
        { key: "total_pagar", header: "Total a Pagar", align: "right", style: { numFmt : formatMoney}},
        //
        { key: "descuento_planilla", header: "Dscto PLAME", align: "right", style: { numFmt : formatMoney}},
        { key: "t_adel_b", header: "T.Adel y B.", align: "right", style: { numFmt : formatMoney}, formula : "=SUM(E#,K#)"},
        { key: "dscto_2", header: "Dscto 2", align: "right", style: { numFmt : formatMoney}, vacio: true, fgColor: "E97132"},
        { key: "adicional_dif", header: "Adic(-)", align: "right", style: { numFmt : formatMoney}, vacio: true, fgColor: "E97132"},
        { key: "neto_pagar", header: "Neto a Pagar", align: "right", style: { numFmt : formatMoney}, formula : "=D#-L#"},
        { key: "act", header: "#Act", vacio: true, fgColor: "E97132"},
        { key: "total", header: "#Total", vacio: true, fgColor: "E97132"},
        { key: "vb", header: "V°B°", vacio: true},
        { key: "numero_documento", header: "N° Documento", align: "left"},
    ]
};

const _abecedario  =  "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const _procesarFechaAdelantos = (_data) => {
    const listaFechas = _data.map( item => item.entregas.map( _item => _item.fecha_registro ) );
    return [... new Set(listaFechas.flat(1))].sort().map( fecha_registro => ({ fecha_registro, fecha_registro_ft : getFormattedDate(fecha_registro)}));
};

const _procesarColumnasSueldos = (colSueldosOriginal, colFechas) => {
    const colSueldosOriginalCopia = [...colSueldosOriginal];
    const posicionColumnKeyTotalPagar = colSueldosOriginalCopia.findIndex( item => item.key === "total_pagar");
    const cantidadFechas = colFechas.length;
    console.log({posicionColumnKeyTotalPagar, cantidadFechas, x: _abecedario[posicionColumnKeyTotalPagar + cantidadFechas + 1]});
    const primeraLetraAdelantosTotal = _abecedario[posicionColumnKeyTotalPagar + 1];
    const ultimaLetraAdelantosTotal = _abecedario[posicionColumnKeyTotalPagar + cantidadFechas + 1];
    const letraTotalPagar = _abecedario[posicionColumnKeyTotalPagar];
    const letraAdelantosTotal = _abecedario[posicionColumnKeyTotalPagar + cantidadFechas + 2];
    const colFechasFormateadasParaExcel = colFechas.map( item => {
        return { key: `adelanto_${item.fecha_registro}`, header: item.fecha_registro_ft, align: "right", style: { numFmt : formatMoney}, fgColor: "E97132"};
    });
    colSueldosOriginalCopia.splice.apply(colSueldosOriginalCopia, [posicionColumnKeyTotalPagar + 1, 0].concat(colFechasFormateadasParaExcel));
    return colSueldosOriginalCopia.map( item => {
        if (item.key === "t_adel_b"){
            return {...item, formula : `=SUM(${primeraLetraAdelantosTotal}#:${ultimaLetraAdelantosTotal}#)`};
        }

        if (item.key === "neto_pagar"){
            return {...item, formula : `=${letraTotalPagar}#-${letraAdelantosTotal}#` };
        }

        return item;
    });
};

export const useReporteAsistenciaRegistro = () => {
    const dispatch = useDispatch();
    const [isAsistencia, setIsAsistencia] = useState(false);
    const [isSueldo, setIsSueldo] = useState(false);
    const [cargando, setCargando] = useState(false);
    const [worksheets, setWorksheets] = useState(null);
    const { saveExcel } = useExcel();

    const obtenerDataParaReportes = async ({ fechaInicio, fechaFin }) => {
        setCargando(true);
        try {
            const _data = [];

            if (isAsistencia){
                const { data: dataAsistencias } = await consultarAsistencias({ fechaInicio, fechaFin });
                _data.push({
                    name: "Asistencias",
                    columns: columnasWorksheets.asistencias,
                    data: procesarAsistencias(dataAsistencias)
                });
            }
            
            if (isSueldo){
                const { data: dataSueldos } = await consultarSueldos({ fechaInicio, fechaFin });
                const columnasFechaAdelantos = _procesarFechaAdelantos(dataSueldos);
                const columnasSueldos = _procesarColumnasSueldos(columnasWorksheets.sueldos, columnasFechaAdelantos);
                const datosSueldosProcesados = procesarSueldos(dataSueldos, columnasFechaAdelantos);
                _data.push({
                    name: "Sueldos",
                    columns: columnasSueldos,
                    data: datosSueldosProcesados
                });
            }
    
           setWorksheets(_data);
        } catch (error) {
            dispatch(setMessageError(error));
        } finally {
            setCargando(false);
        }
    };

    const procesarAsistencias = (_data) => {
        return _data.map( item => {
            return {
                fecha: item.fecha,
                codigo_unico: item.empleado_base?.codigo_unico,
                hora_entrada_mañana: item.hora_entrada_mañana,
                hora_salida_mañana: item.hora_salida_mañana,
                hora_entrada_tarde: item.hora_entrada_tarde,
                hora_salida_tarde: item.hora_salida_tarde,
                total_horas: item.total_horas ?? 0
            };
        });
    };

    const procesarSueldos = (_data, columnasFechaAdelantos) => {
        const columnasFecha = columnasFechaAdelantos.map( item => item.fecha_registro );
        return _data.map( item => {
            const adelantos = columnasFecha?.map( fecha_registro => {
                const montoEncontrado = item?.entregas?.find( item => item.fecha_registro === fecha_registro )?.monto_registrado ?? "";
                    return {
                        [`adelanto_${fecha_registro}`] :  montoEncontrado
                    };
                }).reduce(function(result, item) {
                    const key = Object.keys(item)[0]; //first property: a, b, c
                    result[key] = item[key];
                    return result;
                }, {});;
            
            return {
                codigo_unico: item.empleado?.codigo_unico,
                trabajador: `${item.empleado?.nombres}, ${item.empleado?.apellido_paterno} ${item.empleado?.apellido_materno}`,
                empresa: item.empleado?.empresa?.razon_social,
                total_horas: item?.asistencias_sum_total_horas,
                costo_horas: item?.costo_hora,
                total_pagar: item?.salario,
                ...adelantos,
                descuento_planilla: item?.descuento_planilla,
                adicional_dif: "",
                t_adel_b: "",
                neto_pagar: "",
                act: "",
                total: "",
                vb: "",
                numero_documento: item?.empleado?.numero_documento
            };
        });
    };

    useEffect(()=>{
        if (worksheets == null || !Boolean(worksheets?.length)){
            return;
        }

        saveExcel({
            fileName: "Reporte de Asistencias",
            workSheets : worksheets
        });

    }, [worksheets]);

    return {
        cargando,
        worksheets,
        isAsistencia, setIsAsistencia,
        isSueldo, setIsSueldo,
        obtenerDataParaReportes
    }
};