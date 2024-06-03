import { useEffect, useState } from "react";
import { setMessageError } from "../../store/ui/uiSlice";
import { submitAsistencia } from "../../services/marcarAsistencia/submitAsistencia";
import { useDispatch } from "react-redux";


const TIEMPO_MOSTRAR_MENSAJE_MS = 10000;

export const useMarcarAsistencia = () =>{
    const dispatch = useDispatch();
    const [ codigo, setCodigo ] = useState("");
    const [ resultado, setResultado ] = useState(null);
    const [ cargando, setCargando] = useState(false);

    const consultarResultado = async ({codigoUnico}) => {
        setCargando( true );
        try {

            const data = await submitAsistencia(codigoUnico);
            if (data){
                setResultado(data);
                setCodigo("");
            }

        } catch (error) {
            dispatch(setMessageError(error));
        } finally{
            setCargando(false);
        }
    };

    useEffect(()=>{
        let timer;
        if(Boolean(resultado)){
            timer = setTimeout(() => {
                setResultado(null);
            }, TIEMPO_MOSTRAR_MENSAJE_MS);            
        }

        return () => {
            if ( timer ){
                clearTimeout(timer);
                timer = null;
            }
        }

    }, [resultado]);

    return {
        codigo, 
        resultado,
        cargando,
        setCodigo,
        consultarResultado
    }
}