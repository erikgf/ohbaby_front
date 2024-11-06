import { useEffect, useState } from "react";
import { getHorarios } from "../services/horarios";

export const useHorariosBean = () =>{
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(null);
    
    const onListar = async () => {
        setCargando(true);   
        try{
            const data = await getHorarios();
            setData(data.map( item => ({id: item.id, descripcion: item.descripcion, total_horas_semana: item.total_horas_semana, detalles: item.detalles})));
        } catch (e) {
            setError(e);
        } finally {
            setCargando(false);
        }
    };

    useEffect(()=>{
        onListar();
    }, []);

    return {
        data,
        cargando, 
        error
    };

};