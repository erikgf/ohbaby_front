import { useDispatch, useSelector } from "react-redux";
import { startingEliminar, startingGuardar, startingLeer, startingListar, startingListarExportar } from "../../../store/personal/personalThunks";
import { cancelarSeleccionado,  clearRegistrosExportar,  startNuevoRegistro } from "../../../store/personal/personalSlice";
import { useEffect } from "react";
import { useExcel } from "@/hooks/useExcel";
import Constantes from "@/data/constantes";

export const usePersonal = ()=>{
    const { saveExcel } = useExcel();
    const dispatch = useDispatch();
    const { openModal, registros, cargandoRegistros, seleccionado, cargandoSeleccionado, cargandoGuardar, 
            registrosExportar, cargandoRegistrosExportar
     } = useSelector(state=>state.personal);

    const onNuevoRegistro = ()=>{
        dispatch(startNuevoRegistro());
    };

    const onListar = async (empresaFiltro)=>{
        dispatch(startingListar({empresaFiltro}));
    };

    const onGuardarRegistro = async (dataForm)=>{
        const dataFormProcesado = {
            ...dataForm,
            contratos: dataForm.contratos.map( contrato => {
                return {
                    id: contrato.backend ? contrato?.id : null,
                    fecha_inicio: contrato.fechaInicio,
                    salario: contrato.salario,
                    id_horario: contrato.idHorario,
                    descuento_planilla: contrato.descuentoPlanilla === "" ? 0 : contrato.descuentoPlanilla
                }
            })
        };
        dispatch(startingGuardar({dataForm : dataFormProcesado, id: seleccionado?.id}));
    };

    const onListarExportar = async (empresaFiltro)=>{
        dispatch(startingListarExportar({empresaFiltro}));
    };

    const onLeerRegistro = async ({id})=>{
        dispatch(startingLeer({id}));
    };

    const onEliminarRegistro = async ({id})=>{
        dispatch(startingEliminar({id}));
    };

    const onCloseModal = () => {
        dispatch(cancelarSeleccionado());
    };

    useEffect(()=>{
        if (Boolean(registrosExportar)){
            saveExcel({
                fileName: `exportar_empleados_${new Date().getTime()}`,
                workSheets: [
                    {
                        name: "Registro Empleados",
                        columns: [
                            {key: "numeroDocumento", header:"N. Documento" },
                            {key: "codigoUnico", header:"Código" },
                            {key: "empresaDesc", header:"Empresa"},
                            {key: "numeroOrden", header:"N. Orden" },
                            {key: "nombres", header:"Nombres"},
                            {key: "apellidoPaterno", header:"Apellido Paterno"},
                            {key: "apellidoMaterno", header:"Apellido Materno"},
                            {key: "fechaNacimientoRaw", header:"F. Nacimiento" , style: { numFmt : Constantes.EXCELJS_FORMAT_DATE} },
                            {key: "fechaIngresoRaw", header:"F. Ingreso" , style: { numFmt : Constantes.EXCELJS_FORMAT_DATE} },
                            {key: "tieneHorarios", header:"¿Tiene Horario?"},
                            {key: "costoHora", header:"Costo Hora"},
                            {key: "horasSemana", header:"Horas Semana", align: "center" },
                        ],
                        data: registrosExportar
                    }
                ]
            });
            dispatch(clearRegistrosExportar());
        }
    }, [registrosExportar]);

    return {
        openModal, registros, cargandoRegistros, seleccionado, cargandoSeleccionado, cargandoGuardar, registrosExportar, cargandoRegistrosExportar,
        onNuevoRegistro, onGuardarRegistro, onListar, onLeerRegistro, onEliminarRegistro, onCloseModal,
        onListarExportar
    }
}