import { useEffect, useState } from "react";
import { getTipoEntregas } from "../services/tipoEntregas/crud";

export const useTipoEntregaBean = ({loadFromStart = false}) =>{
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(null);
    
    const onListar = async () => {
        setCargando(true);   
        try{
            const data = await getTipoEntregas();
            setData(data.map(item => {
                return {
                    id: item.id,
                    descripcion: item.descripcion
                }
            }));
        } catch (e) {
            setError(e);
        } finally {
            setCargando(false);
        }
    };

    useEffect(()=>{
        if (Boolean(loadFromStart)){
            onListar();
        }
    }, [loadFromStart])

    return {
        data,
        cargando, 
        error,
        onListar
    };

};