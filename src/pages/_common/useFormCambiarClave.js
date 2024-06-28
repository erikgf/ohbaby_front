import { useDispatch, useSelector } from "react-redux";
import { closeModalCambiarClave, openModalCambiarClave } from "../../store/cambiarClave/cambiarClaveSlice";
import { startingGuardar } from "../../store/cambiarClave/cambiarClaveThunks";

export const useFormCambiarClave = () => {
    const dispatch = useDispatch();
    const { registro, openModal, cargandoGuardar } = useSelector(state => state.cambiarClave);

    const onGuardar = (clave) => {
        if (!Boolean(registro)){
            return;
        }
        dispatch( startingGuardar({id : registro?.id, clave}) ); 
    };

    const onAbrirModal = (registro) => {
        dispatch ( openModalCambiarClave(registro));
    };

    const onCerrarModal = () => {
        dispatch ( closeModalCambiarClave());
    };

    return {
        registro,
        openModal,
        cargandoGuardar,
        onGuardar,
        onAbrirModal,
        onCerrarModal
    };
};