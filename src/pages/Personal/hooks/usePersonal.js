import { useDispatch, useSelector } from "react-redux";
import { startingEliminar, startingGuardar, startingLeer, startingListar } from "../../../store/personal/personalThunks";
import { cancelarSeleccionado,  startNuevoRegistro } from "../../../store/personal/personalSlice";

export const usePersonal = ()=>{
    const dispatch = useDispatch();
    const { openModal, registros, cargandoRegistros, seleccionado, cargandoSeleccionado, cargandoGuardar  } = useSelector(state=>state.personal);

    const onNuevoRegistro = ()=>{
        dispatch(startNuevoRegistro());
    };

    const onListar = async ()=>{
        dispatch(startingListar());
    };

    const onGuardarRegistro = async (dataForm)=>{
        const dataFormProcesado = {
            ...dataForm,
            contratos: dataForm.contratos.map( contrato => {
                return {
                    id: contrato.backend ? contrato?.id : null,
                    fecha_inicio: contrato.fechaInicio,
                    salario: contrato.salario,
                    dias_trabajo: contrato.diasTrabajo,
                    horas_dia: contrato.horasDia
                }
            })
        };
        dispatch(startingGuardar({dataForm : dataFormProcesado, id: seleccionado?.id}));
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

    return {
        openModal, registros, cargandoRegistros, seleccionado, cargandoSeleccionado, cargandoGuardar,
        onNuevoRegistro, onGuardarRegistro, onListar, onLeerRegistro, onEliminarRegistro, onCloseModal,
    }
}