import { deleteEntrega, getEntrega, getEntregas, insertEntrega, updateEntrega } from "../../services/entregas/crud";
import { finallyLeer, finallyListar, okEliminar, okGuardar, okLeer, okListar, startEliminar, startGuardar, startLeer, startListar } from "./entregasSlice";
import { setMessage, setMessageError } from "../ui/uiSlice";
import mensajes from "../../data/mensajes";

export const startingListar = (paramsData)=>{
    return async ( dispatch )=>{
        dispatch( startListar() );
        try {
            const data = await getEntregas(paramsData);
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
            const data = await getEntrega({id});
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
            const isEditando = Boolean(id);
            const data = !isEditando
                            ? await insertEntrega(dataForm)
                            : await updateEntrega({id, data: dataForm});
            dispatch( okGuardar(data) );
            dispatch( setMessage({
                text: mensajes.GUARDADO_CORRECTAMENTE,
                severity: 'success'
            }) );
        } catch (error) {
            console.error({error});
            dispatch(setMessageError(error));
        } finally{
            dispatch(finallyLeer());
        }
    }
};

export const startingEliminar = ({ id })=>{
    return async ( dispatch )=>{
        dispatch( startEliminar() );
        try {
            await deleteEntrega({id});
            dispatch( okEliminar(id) );
            dispatch( setMessage({
                text: mensajes.ELIMINADO_CORRECTAMENTE,
                severity: 'success'
            }) );
        } catch (error) {
            console.error({error});
            dispatch(setMessageError(error));
        } finally{
            dispatch(finallyLeer());
        }
    }
};