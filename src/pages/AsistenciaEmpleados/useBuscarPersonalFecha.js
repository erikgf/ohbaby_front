import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { getEmpleadosPorFecha } from "@/services/asistenciaEmpleados/crud";

export const useBuscarPersonalFecha = (fecha) => {
    const [ data, setData ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ searchTerm, setSearchTerm ] = useState("");
    const debouncedTerm = useDebounce(searchTerm, 600);

    const obtenerData = async()=>{
        try{
            setLoading(true);
            setData(await getEmpleadosPorFecha(debouncedTerm, fecha));
        }catch(error){
            console.error(error);
            dispatch(setData([]));
        } finally {
            setLoading(false);
        }
    };

    useEffect(()=>{
        if (debouncedTerm && debouncedTerm.length >= 2){
            obtenerData();
        } else {
            setLoading(false);
            setData(null);
        }
    }, [debouncedTerm]);

    return {
        loading,
        data,
        setSearchTerm,
    }
}