import { useState } from "react";
import { getProvincias } from "../services/ubigeo";

export const useUbigeoProvinciasBean = () =>{
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(null);
    const [cache, setCache] = useState({
        id: null,
        data: null
    });
    
    const onListar = async ({idDepartamento}) => {
        if (idDepartamento === cache?.id){
            setData(cache.data);
            return;
        }

        setCargando(true);   
        try{
            const data = await getProvincias({idDepartamento});
            const provincias = data.map(item => {
                return {
                    id: item.id,
                    descripcion: item.name
                }
            });
            setData(provincias);

            setCache({
                id: idDepartamento,
                data: provincias
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
        cache,
        onListar
    };
};