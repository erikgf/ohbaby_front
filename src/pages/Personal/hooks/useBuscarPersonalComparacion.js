import { useEffect, useState } from "react";
import { useDebounce } from "../../../hooks/useDebounce";
import { getSearchPersonals } from "../../../services/personal";

export const useBuscarPersonalComparacion = () => {
    const [ data, setData ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ searchTerm, setSearchTerm ] = useState("");
    const debouncedTerm = useDebounce(searchTerm, 600);

    const obtenerData = async()=>{
        try{
            setLoading(true);
            setData(await getSearchPersonals(debouncedTerm));
        }catch(error){r
            console.error(error);
            dispatch(setData([]));
        } finally {
            setLoading(false);
        }
    };

    useEffect(()=>{
        if (debouncedTerm){
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