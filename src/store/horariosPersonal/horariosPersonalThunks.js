import { getHorariosPersonal } from "../../services/horariosPersonal/getHorariosPersonal";
import { getPersonalLibre } from "../../services/horariosPersonal/getPersonalLibre";
import { submitHorarioPersonal } from "../../services/horariosPersonal/submitHorarioPersonal";
import { setMessage, setMessageError } from "../ui/uiSlice";
import { finallyGuardarPersonalHorario, finallyListaHorarios, finallyListarPersonalLibre, okGuardarersonalHorario, okListarHorarios, okListarPersonalLibre, startGuardarPersonalHorario, startListarHorarios, startListarPersonalLibre } from "./horariosPersonalSlice";

export const startingListarHorarios  = ()=>{
    return async ( dispatch )=>{
        dispatch( startListarHorarios() );
        try {
            const data = await getHorariosPersonal();
            dispatch( okListarHorarios(data) );
        } catch (error) {
            console.error({error});
            dispatch(setMessageError(error));
        } finally{
            dispatch(finallyListaHorarios());
        }
    }
};

export const startingListarPersonalLibre  = ()=>{
    return async ( dispatch )=>{
        dispatch( startListarPersonalLibre() );
        try {
            const data = await getPersonalLibre();
            dispatch( okListarPersonalLibre(data) );
        } catch (error) {
            console.error({error});
            dispatch(setMessageError(error));
        } finally{
            dispatch(finallyListarPersonalLibre());
        }
    }
};

export const startingGuardarPersonalHorario  = ({idHorario, arregloIdEmpleadoContratos})=>{
    return async ( dispatch )=>{
        dispatch( startGuardarPersonalHorario() );
        try {
            const data = await submitHorarioPersonal({idHorario, arregloIdEmpleadoContratos});
            dispatch( okGuardarersonalHorario(data) );
            dispatch( setMessage({
                text: 'Personal asignado correctamente.',
                severity: 'success'
            }) );
        } catch (error) {
            console.error({error});
            dispatch(setMessageError(error));
        } finally{
            dispatch(finallyGuardarPersonalHorario());
        }
    }
};