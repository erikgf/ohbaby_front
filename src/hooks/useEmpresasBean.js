import { useEffect, useState } from "react";
import { getEmpresas } from "../services/empresas";

export const useEmpresasBean = () =>{
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(null);
    
    const onListar = async () => {
        setCargando(true);   
        try{
            const data = await getEmpresas();
            setData(data.map( item => ({id: item.id, descripcion: item.label})));
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