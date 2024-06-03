import { useDispatch, useSelector } from "react-redux";
import { unsetMessage } from "../store/ui/uiSlice";

export const useUI = () => {
    const dispatch = useDispatch();
    const { message } = useSelector(state=>state.ui);

    const onLimpiarMensaje = () => {
        dispatch( unsetMessage() );
    };

    return {
        //* Propiedades
        mensaje : message,
        onLimpiarMensaje
    }
}