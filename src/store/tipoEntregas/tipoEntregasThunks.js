import { deleteTipoEntrega, getTipoEntrega, getTipoEntregas, insertTipoEntrega, updateTipoEntrega } from "../../services/tipoEntregas/crud";
import { finallyLeer, finallyListar, okEliminar, okGuardar, okLeer, okListar, startEliminar, startGuardar, startLeer, startListar } from "./tipoEntregasSlice";
import { setMessage, setMessageError } from "../ui/uiSlice";

export const startingListar = ()=>{
    return async ( dispatch )=>{
        dispatch( startListar() );
        try {
            const data = await getTipoEntregas();
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
            const data = await getTipoEntrega({id});
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
                            ? await insertTipoEntrega(dataForm)
                            : await updateTipoEntrega({id, data: dataForm});
            dispatch( okGuardar(data) );
            dispatch( setMessage({
                text: 'Guardado correctamente.',
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
            await deleteTipoEntrega({id});
            dispatch( okEliminar(id) );
            dispatch( setMessage({
                text: 'Eliminado correctamente.',
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