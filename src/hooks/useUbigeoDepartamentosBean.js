import { useEffect, useState } from "react";
import { getDepartamentos } from "../services/ubigeo";

export const useUbigeoDepartamentosBean = () =>{
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(null);
    
    const onListar = async () => {
        setCargando(true);   
        try{
            const data = await getDepartamentos();
            setData(data.map(item => {
                return {
                    id: item.id,
                    descripcion: item.name
                }
            }));
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