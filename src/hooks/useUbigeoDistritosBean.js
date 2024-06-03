import { useState } from "react";
import { getDistritos } from "../services/ubigeo";

export const useUbigeoDistritosBean = () =>{
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(null);
    
    const onListar = async ({idProvincia}) => {
        setCargando(true);   
        try{
            const data = await getDistritos({idProvincia});
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

    return {
        data,
        cargando, 
        error,
        onListar
    };

};