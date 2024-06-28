import { cambiarClave } from "../../services/usuarios";
import { setMessage, setMessageError } from "../ui/uiSlice";
import { startGuardar, finallyGuardar, closeModalCambiarClave } from "./cambiarClaveSlice";

export const startingGuardar = ({id, clave})=>{
    return async ( dispatch )=>{
        dispatch( startGuardar() );
        try {
            await cambiarClave({id, clave});
            dispatch( closeModalCambiarClave() ); 
            dispatch( setMessage({
                text: 'Clave cambiada correctamente.',
                severity: 'success'
            }) );
        } catch (error) {
            console.error({error});
            dispatch(setMessageError(error));
        } finally{
            dispatch(finallyGuardar());
        }
    }
};