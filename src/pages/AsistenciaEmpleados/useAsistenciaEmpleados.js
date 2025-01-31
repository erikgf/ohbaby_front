import { useState } from "react";
import { setMessage, setMessageError } from "../../store/ui/uiSlice";
import { useDispatch } from "react-redux";
import mensajes from "../../data/mensajes";
import { deleteAsistencia, getAsistenciaDia, storeAsistencia } from "@/services/asistenciaEmpleados/crud";

export const useAsistenciaEmpleados = () =>{
    const dispatch = useDispatch();
    const [cargandoGuardar, setCargandoGuardar] = useState(false);
    const [cargando, setCargando] = useState(false);
    const [data, setData] = useState(null);

    const guardarRegistro = async (dataForm, fnImperative) => {
        setCargandoGuardar( true );
        try {   
            const ultimoRegistro = await storeAsistencia(dataForm);

            setData(prevData => [ultimoRegistro, ...prevData]);

            dispatch( setMessage({
                text: mensajes.GUARDADO_CORRECTAMENTE,
                severity: 'success'
            }));

            if (fnImperative){
                fnImperative();
            }

        } catch (error) {
            dispatch(setMessageError(error));
        } finally{
            setCargandoGuardar(false);
        }
    };

    const consultarAsistenciaDia = async (fecha) => {
        setCargando( true );
        setData(null);
        try {
            setData(await getAsistenciaDia(fecha));
        } catch (error) {
            dispatch(setMessageError(error));
        } finally {
            setCargando(false);
        }
    };

    const eliminarAsistenciaRegistro = async (id) => {
        setData( prev => prev.map( item => item.id === id ? {...item, _eliminando: true} : item));
        try {
            await deleteAsistencia(id);

            setData( prev => prev.filter( item => item.id != id));
        } catch (error) {
            dispatch(setMessageError(error));
        } finally {
            setData( prev => prev.map( item => item.id === id ? {...item, _eliminando: false} : item));
        }
    };

    return {
        data,
        cargando,
        cargandoGuardar,
        guardarRegistro,
        consultarAsistenciaDia,
        eliminarAsistenciaRegistro
    }
}