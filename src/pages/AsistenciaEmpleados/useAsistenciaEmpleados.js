import { useState } from "react";
import { setMessage, setMessageError } from "../../store/ui/uiSlice";
import { useDispatch } from "react-redux";
import mensajes from "../../data/mensajes";
import { getAsistenciaDia, storeAsistencia } from "@/services/asistenciaEmpleados/crud";

const procesarData = (data) => {
    const { horarios, registros, numero_dia } = data;

    return registros?.map( empresa  => { 
        return {
            ...empresa,
            registros: empresa?.registros.map ( _registro => {
                const registroAsistencia = _registro?.asistencia;
                const esEdicion = Boolean(registroAsistencia);
        
                if (esEdicion){
                    const horas = [];
                    if (registroAsistencia?.hora_entrada_mañana){
                        horas.push({
                            hora_inicio: registroAsistencia.hora_entrada_mañana,
                            hora_fin: registroAsistencia?.hora_salida_mañana
                        });
                    }
        
                    if (registroAsistencia?.hora_entrada_tarde){
                        horas.push({
                            hora_inicio: registroAsistencia.hora_entrada_tarde,
                            hora_fin: registroAsistencia?.hora_salida_tarde
                        });
                    }
        
                    return {
                        ..._registro,
                        horas,
                        esActualizando: true,
                        falto: false
                    };
                }
        
                const horas = horarios.find( 
                    horario => horario.id === _registro.horario_id
                    )
                    ?.horario_detalles
                    ?.filter( horario_detalle => horario_detalle.dias.includes(String(numero_dia)))
                    ?.map ( horario_detalle => ({
                        hora_inicio: horario_detalle.hora_inicio,
                        hora_fin: horario_detalle.hora_fin
                    }));
        
                return {
                    ..._registro,
                    horas,
                    esActualizando: false,
                    falto: esEdicion
                };
            })
        };
    });
};

export const useAsistenciaEmpleados = () =>{
    const dispatch = useDispatch();
    const [cargandoGuardar, setCargandoGuardar] = useState(false);
    const [cargando, setCargando] = useState(false);
    const [data, setData] = useState(null);

    const guardarRegistro = async (dataForm, fnImperative) => {
        setCargandoGuardar( true );
        try {   
            const ultimoRegistro = await storeAsistencia(dataForm);

            setData(prevData => [ultimoRegistro, ...prevData]);

            dispatch( setMessage({
                text: mensajes.GUARDADO_CORRECTAMENTE,
                severity: 'success'
            }));

            if (fnImperative){
                fnImperative();
            }

        } catch (error) {
            dispatch(setMessageError(error));
        } finally{
            setCargandoGuardar(false);
        }
    };

    const consultarAsistenciaDia = async (fecha) => {
        setCargando( true );
        setData(null);
        try {
            setData(await getAsistenciaDia(fecha));
        } catch (error) {
            dispatch(setMessageError(error));
        } finally {
            setCargando(false);
        }
    };

    return {
        data,
        cargando,
        cargandoGuardar,
        guardarRegistro,
        consultarAsistenciaDia
    }
}