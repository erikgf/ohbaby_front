import { useEffect, useState } from "react";
import { consultarAsistencias } from "../../services/reporteAsistenciasRegistro/consultarAsistencias";
import { setMessageError } from "../../store/ui/uiSlice";
import { useDispatch } from "react-redux";
import { consultarSueldos } from "../../services/reporteAsistenciasRegistro/consultarSueldos";
import { useExcel } from "../../hooks/useExcel";
import Constantes from "../../data/constantes";

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
        { key: "total_horas", header: "Total Horas", align: "right", style : { numFmt : formatNumber}},
        { key: "total_pagar", header: "Total a Pagar", align: "right", style: { numFmt : formatMoney}},
        { key: "adelanto_1", header: "Adel 1", align: "right", style: { numFmt : formatMoney}},
        { key: "adelanto_2", header: "Adel 2", align: "right", style: { numFmt : formatMoney}},
        { key: "adelanto_3", header: "Adel 3", align: "right", style: { numFmt : formatMoney}},
        { key: "adelanto_resto", header: "Adel 4", align: "right", style: { numFmt : formatMoney}},
        { key: "descuento_1", header: "Dscto 1", align: "right", style: { numFmt : formatMoney}},
        { key: "descuento_resto", header: "Dscto 2", align: "right", style: { numFmt : formatMoney}},
        { key: "adicional_dif", header: "Adic(-)", align: "right", style: { numFmt : formatMoney}, vacio: true},
        { key: "t_adel_b", header: "T.Adel y B.", align: "right", style: { numFmt : formatMoney}, formula : "=SUM(E#,K#)"},
        { key: "neto_pagar", header: "Neto a Pagar", align: "right", style: { numFmt : formatMoney}, formula : "=D#-L#"},
        { key: "act", header: "#Act", vacio: true},
        { key: "total", header: "#Total", vacio: true},
        { key: "vb", header: "V°B°", vacio: true},
    ]
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
                _data.push({
                    name: "Sueldos",
                    columns: columnasWorksheets.sueldos,
                    data: procesarSueldos(dataSueldos)
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

    const procesarSueldos = (_data) => {
        return _data.map( item => {
            //Procesar adelantos
            const adelantos = item?.entregas?.filter( _entrega => _entrega.tipo_entrega?.tipo == Constantes.CODIGO_ADELANTOS).map( _entrega  => _entrega.cuotas_sum_monto_cuota );
            const adelantosTamano = adelantos.length;
            //Procesar descuentos
            const descuentos = item?.entregas?.filter( _entrega => _entrega.tipo_entrega?.tipo == Constantes.CODIGO_DESCUENTOS).map( _entrega  => _entrega.cuotas_sum_monto_cuota );
            const descuentosTamano = descuentos.length;

            return {
                codigo_unico: item.empleado?.codigo_unico,
                trabajador:  item.empleado?.nombres,
                total_horas: item?.asistencias_sum_total_horas,
                total_pagar: item?.salario,
                adelanto_1: adelantosTamano >= 1 ? adelantos[0] : "",
                adelanto_2: adelantosTamano >= 2 ? adelantos[1] : "",
                adelanto_3: adelantosTamano >= 3 ? adelantos[2] : "",
                adelanto_resto: adelantosTamano >= 4 ? adelantos.reduce((acumulador, actual, actualIndex) =>  actualIndex >= 3 ? acumulador + actual : 0, 0) : "",
                descuento_1: descuentosTamano >= 1 ? descuentos[0] : "",
                descuento_resto:  descuentosTamano >= 2 ? descuentos.reduce((acumulador, actual, actualIndex) =>  actualIndex >= 1 ? acumulador + actual : 0, 0) : "",
                adicional_dif: "",
                t_adel_b: "",
                neto_pagar: "",
                act: "",
                total: "",
                vb: ""
            };
        });
    };

    useEffect(()=>{
        if (worksheets == null || !Boolean(worksheets?.length)){
            return;
        }

        console.log({
            worksheets
        })
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