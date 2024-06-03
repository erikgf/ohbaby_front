import { finalizarContrato } from "../../services/personal";
import { getPersonal, insertPersonal, getPersonals, deletePersonal, updatePersonal } from "../../services/personal/crud";
import { setMessage, setMessageError } from "../ui/uiSlice";
import { finallyFinalizarContrato, finallyLeer, finallyListar, okEliminar, okFinalizarContrato, okGuardar, okLeer, okListar, startEliminar, startFinalizarContrato, startGuardar, startLeer, startListar } from "./personalSlice";

export const startingListar = ()=>{
    return async ( dispatch )=>{
        dispatch( startListar() );
        try {
            const data = await getPersonals();
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
            const data = await getPersonal({id});
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
                            ? await insertPersonal(dataForm)
                            : await updatePersonal({id, data: dataForm});
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
            await deletePersonal({id});
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



export const startingFinalizarContrato = ({ id })=>{ //idContrato
    return async ( dispatch )=>{
        dispatch( startFinalizarContrato() );
        try {
            const data = await finalizarContrato(id);
            dispatch( okFinalizarContrato({id, fecha : data}) );
            dispatch( setMessage({
                text: 'Contrato finalizado correctamente.',
                severity: 'success'
            }) );
        } catch (error) {
            console.error({error});
            dispatch(setMessageError(error));
        } finally{
            dispatch(finallyFinalizarContrato());
        }
    }
};

