import { useState } from "react";
import { getDistritos } from "../services/ubigeo";

export const useUbigeoDistritosBean = () =>{
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(null);
    const [cache, setCache] = useState({
        id: null,
        data: null
    });
    
    const onListar = async ({idProvincia}) => {
        if (idProvincia === cache?.id){
            setData(cache.data);
            return;
        }

        setCargando(true);   
        try{
            const data = await getDistritos({idProvincia});
            const distritos = data.map(item => {
                return {
                    id: item.id,
                    descripcion: item.name
                }
            });
            setData(distritos);
            setCache({
                id: idProvincia,
                data: distritos
            });
        } catch (e) {
            setError(e);
            setCache({
                id: null,
                data: null
            });
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