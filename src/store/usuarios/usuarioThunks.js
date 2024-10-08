import mensajes from "../../data/mensajes";
import { getUsuario, insertUsuario, getUsuarios, deleteUsuario, updateUsuario } from "../../services/usuarios/crud";
import { setMessage, setMessageError } from "../ui/uiSlice";
import { finallyLeer, finallyListar,
         okEliminar, okGuardar, okLeer, okListar, 
         startEliminar, startGuardar, startLeer, startListar, 
         finallyGuardar,
         finallyEliminar} from "./usuarioSlice";

export const startingListar = ()=>{
    return async ( dispatch )=>{
        dispatch( startListar() );
        try {
            const data = await getUsuarios();
            dispatch( okListar(data) );
        } catch (error) {
            console.error({error});
            dispatch(setMessageError(error));
        } finally{
            dispatch(finallyListar());
        }
    }
};

export const startingLeer = ({id})=>{
    return async ( dispatch )=>{
        dispatch( startLeer() );
        try {
            const data = await getUsuario({id});
            dispatch( okLeer(data) );

        } catch (error) {
            console.error({error});
            dispatch(setMessageError(error));
        } finally{
            dispatch(finallyLeer());
        }
    }
};

export const startingGuardar = ({dataForm, id})=>{
    return async ( dispatch )=>{
        dispatch( startGuardar() );
        try {
            const data = !Boolean(id) 
                            ? await insertUsuario(dataForm)
                            : await updateUsuario({id, data: dataForm});
            dispatch( okGuardar(data) );
            dispatch( setMessage({
                text: mensajes.GUARDADO_CORRECTAMENTE,
                severity: 'success'
            }) );
        } catch (error) {
            dispatch(setMessageError(error));
        } finally{
            dispatch(finallyGuardar());
        }
    }
};

export const startingEliminar = ({ id })=>{
    return async ( dispatch )=>{
        dispatch( startEliminar() );
        try {
            await deleteUsuario({id});
            dispatch( okEliminar(id) );
            dispatch( setMessage({
                text: mensajes.ELIMINADO_CORRECTAMENTE,
                severity: 'success'
            }) );
        } catch (error) {
            console.error({error});
            dispatch(setMessageError(error));
        } finally{
            dispatch(finallyEliminar());
        }
    }
};
