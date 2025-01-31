import mensajes from "../../data/mensajes";
import { finalizarContrato } from "../../services/personal";
import { getPersonal, insertPersonal, getPersonals, deletePersonal, updatePersonal } from "../../services/personal/crud";
import { setMessage, setMessageError } from "../ui/uiSlice";
import { finallyFinalizarContrato, finallyLeer, finallyListar, finallyListarExportar, okEliminar, okFinalizarContrato, okGuardar, okLeer, okListar, okListarExportar, startEliminar, startFinalizarContrato, startGuardar, startLeer, startListar, startListarExportar } from "./personalSlice";

export const startingListar = ({empresaFiltro})=>{
    return async ( dispatch )=>{
        dispatch( startListar() );
        try {
            const data = await getPersonals({empresaFiltro});
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
            await deletePersonal({id});
            dispatch( okEliminar(id) );
            dispatch( setMessage({
                text:  mensajes.ELIMINADO_CORRECTAMENTE,
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

export const startingFinalizarContrato = ({ id, fechaCese, razonCese })=>{ //idContrato
    return async ( dispatch )=>{
        dispatch( startFinalizarContrato() );
        try {
            await finalizarContrato(id, fechaCese, razonCese);
            dispatch( okFinalizarContrato({id, fechaCese, razonCese}) );
            dispatch( setMessage({
                text: mensajes.CONTRATO_FINALIZADO_CORRECTAMENTE,
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


export const startingListarExportar = ({empresaFiltro})=>{
    return async ( dispatch )=>{
        dispatch( startListarExportar() );
        try {
            const data = await getPersonals({empresaFiltro});
            dispatch( okListarExportar(data) );
        } catch (error) {
            console.error({error});
            dispatch(setMessageError(error));
        } finally{
            dispatch(finallyListarExportar());
        }
    }
};