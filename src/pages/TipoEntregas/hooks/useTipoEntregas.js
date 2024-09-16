import { useDispatch, useSelector } from "react-redux";
import { startingEliminar, startingGuardar, startingLeer, startingListar } from "../../../store/tipoEntregas/tipoEntregasThunks";
import { cancelarSeleccionado,  defaultRegistro,  startNuevoRegistro } from "../../../store/tipoEntregas/tipoEntregasSlice";

export const useTipoEntregas = ()=>{
    const dispatch = useDispatch();
    const { openModal, registros, cargandoRegistros, seleccionado, cargandoSeleccionado, cargandoGuardar } = useSelector(state=>state.tipoEntregas);

    const onNuevoRegistro = ()=>{
        dispatch(startNuevoRegistro());
    };

    const onListar = async ()=>{
        dispatch(startingListar());
    };

    const onGuardarRegistro = async (dataForm)=>{
        dispatch(startingGuardar({dataForm, id: seleccionado?.id}));
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
        openModal, registros, cargandoRegistros, seleccionado, cargandoSeleccionado, cargandoGuardar, defaultValuesForm : defaultRegistro,
        onNuevoRegistro, onGuardarRegistro, onListar, onLeerRegistro, onEliminarRegistro, onCloseModal,
    }
}