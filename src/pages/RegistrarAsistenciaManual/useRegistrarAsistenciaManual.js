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
    const [ isError, setIsError ] = useState(false);

    const consultarResultado = async ({codigoBarra}, imperativeFn) => {
        const arregloStringCodigoBarra = codigoBarra.split(SEPARADOR);

        setIsError(false);
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
                if (imperativeFn){
                    imperativeFn();
                }
            }

        } catch (error) {
            dispatch(setMessageError(error));
            setCodigo("");
            setIsError(true);
        } finally{
            setCargando(false);
        }
    };

    const modificarHoras = ({key, value}) => {
        setResultado( resultadoPrev => {
            return {...resultadoPrev, [key] : value};
        });
    };

    const guardarRegistro = async (fnImperative) => {
        if (!Boolean(resultado?.ok)){
            return false;
        }

        setIsError(false);
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
                if (fnImperative){
                    fnImperative();
                }
            }

        } catch (error) {
            dispatch(setMessageError(error));
            setIsError(true);
        } finally{
            setCargandoGuardar(false);
        }
    };

    return {
        codigo, 
        resultado,
        cargando,
        cargandoGuardar,
        ultimoRegistro,
        isError,
        setCodigo,
        consultarResultado,
        modificarHoras,
        guardarRegistro
    }
}