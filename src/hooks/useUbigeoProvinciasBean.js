import { useState } from "react";
import { getProvincias } from "../services/ubigeo";

export const useUbigeoProvinciasBean = () =>{
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(null);
    
    const onListar = async ({idDepartamento}) => {
        setCargando(true);   
        try{
            const data = await getProvincias({idDepartamento});
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