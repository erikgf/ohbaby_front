import { useState } from "react";
import { usePersonal } from "./usePersonal";
import { useDispatch } from "react-redux";
import { setMessageError, setMessageOK } from "@/store/ui/uiSlice";
import { processMasiveEmpleado } from "@/services/personal";
import mensajes from "@/data/mensajes";

const defaultState = {
    cargandoGuardarMasivo: false,
    isOpenImportador: false,
    resultados: null,
    erroresMasivo: null
};

export const useImportadorMantenedor = () => {
    const [state, setState] = useState(defaultState);
    const dispatch = useDispatch();
    const {onListar} = usePersonal();


    const onCloseImportador = (event, reason) => {
        if (state.cargandoGuardarMasivo || reason === 'backdropClick' || reason === 'escapeKeyDown') return;
        setState(prev => ({...prev, resultados: null, erroresMasivo: null, isOpenImportador : false}));
    };

    const onOpenImportador= () => {
        setState(prev => ({...prev, isOpenImportador : true}));
    };

    const onClearResultado = () => {
        setState(prev => ({...prev, resultados : null, erroresMasivo: null}));
    };

    const onGuardarMasivo = async(dataAlta, dataBaja) => {
        setState(prev => ({...prev, erroresMasivo: null, cargandoGuardarMasivo : true}));
        try {
            const { data } = await processMasiveEmpleado(dataAlta, dataBaja);

            if (data){
                setState(prev => ({
                    ...prev, 
                    resultados: data
                }));

                dispatch(setMessageOK(mensajes.PROCESADO_CORRECTO));
                onListar();
            }
            
        } catch (error) {
            const errorProcesado = error?.response?.data;
            if ( errorProcesado && errorProcesado?.errors ){
                setState(prev => ({
                    ...prev, 
                    erroresMasivo: Object.keys(errorProcesado?.errors).map( key => errorProcesado?.errors[key].join(" "))
                }));
                return;
            }

            dispatch(setMessageError(error));
        } finally {
            setState(prev => ({...prev, cargandoGuardarMasivo : false}));
        }
    };

    return {
        state,
        onGuardarMasivo,
        onOpenImportador, onCloseImportador, onClearResultado
    }
}