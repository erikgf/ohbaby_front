import { useState } from "react";
import { setMessageError } from "../../store/ui/uiSlice";
import { useDispatch } from "react-redux";
import { consultarAsistenciaManual } from "../../services/registrarAsistenciaManual/consultarAsistenciaManual";
import { submitAsistenciaManual } from "../../services/registrarAsistenciaManual/submitAsistenciaManual";

const SEPARADOR = ".";

export const useRegistrarAsistenciaManual = () =>{
    const dispatch = useDispatch();
    const [ codigo, setCodigo ] = useState("");
    const [ resultado, setResultado ] = useState(null);
    const [ultimoRegistro, setUltimoRegistro] = useState(null);
    const [ cargando, setCargando] = useState(false);
    const [ cargandoGuardar, setCargandoGuardar] = useState(false);

    const consultarResultado = async ({codigoBarra}) => {
        const arregloStringCodigoBarra = codigoBarra.split(SEPARADOR);

        setCargando( true );
        try {
            
            if (arregloStringCodigoBarra.length != 2){
                throw "Problema al leer código de barra, formato no esperado.";
            }

            const [ fecha, codigoUnico ] = arregloStringCodigoBarra;
            const data = await consultarAsistenciaManual({ fecha, codigoUnico});

            if (data){
                if (!Boolean(data?.ok)){
                    throw `${data?.msg}`;
                }

                setResultado(data);
                setCodigo("");
            }

        } catch (error) {
            dispatch(setMessageError(error));
            setCodigo("");
        } finally{
            setCargando(false);
        }
    };

    const modificarHoras = ({key, value}) => {
        setResultado( resultadoPrev => {
            return {...resultadoPrev, [key] : value};
        });
    };

    const guardarRegistro = async () => {
        if (!Boolean(resultado?.ok)){
            return false;
        }

        setCargandoGuardar( true );
        try {   

            const { 
                fecha, 
                codigo_unico: codigoUnico,
                manana_entrada: mananaEntrada,
                manana_salida: mananaSalida,
                tarde_entrada: tardeEntrada,
                tarde_salida: tardeSalida,
            } = resultado;
            
            const data = await submitAsistenciaManual({fecha, codigoUnico, mananaEntrada, mananaSalida, tardeEntrada, tardeSalida})

            if (data){
                setResultado(null);
                setUltimoRegistro(`${data.nombre_empleado} a las  ${data.fecha_hora_registrado}`);
            }

        } catch (error) {
            dispatch(setMessageError(error));
        } finally{
            setCargandoGuardar(false);
        }
    };

    /*
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
    */

    return {
        codigo, 
        resultado,
        cargando,
        cargandoGuardar,
        ultimoRegistro,
        setCodigo,
        consultarResultado,
        modificarHoras,
        guardarRegistro
    }
}