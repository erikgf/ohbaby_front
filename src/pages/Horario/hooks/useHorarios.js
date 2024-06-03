import { useDispatch, useSelector } from "react-redux";
import { startingEliminar, startingGuardar, startingLeer, startingListar } from "../../../store/horarios/horariosThunks";
import { cancelarSeleccionado,  startNuevoRegistro } from "../../../store/horarios/horariosSlice";

export const useHorarios = ()=>{
    const dispatch = useDispatch();
    const { openModal, registros, cargandoRegistros, seleccionado, cargandoSeleccionado, cargandoGuardar  } = useSelector(state=>state.horarios);

    const onNuevoRegistro = ()=>{
        dispatch(startNuevoRegistro());
    };

    const onListar = async ()=>{
        dispatch(startingListar());
    };

    const onGuardarRegistro = async (dataForm)=>{
        const dataFormProcesado = {
            ...dataForm,
            horario_detalles: dataForm.detalles.map( detalle => {
                return {
                    id: detalle.backend ? detalle?.id : null,
                    hora_inicio: detalle.horaInicio,
                    hora_fin: detalle.horaFin,
                    dias: detalle.dias.filter( dia => Boolean(dia.checked) ).map( dia => dia.id).join(",")
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