import { useState } from "react";
import { setMessage, setMessageError } from "../../store/ui/uiSlice";
import { useDispatch } from "react-redux";
import { submitAsistenciaManual } from "../../services/registrarAsistenciaManual/submitAsistenciaManual";
import { getDataAsistenciaManual } from "../../services/registrarAsistenciaManual/getDataAsistenciaManual";
import mensajes from "../../data/mensajes";

const procesarData = (data) => {
    const { horarios, registros, registros_realizados, numero_dia } = data;
    const esEdicion = registros_realizados.length > 0;
    
    return registros.map ( _registro => {
        const registroAsistencia = registros_realizados.find( item => item.id_empleado_contrato === _registro.id);

        if (Boolean(registroAsistencia)){
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
    });
};

export const useRegistrarAsistenciaManual = () =>{
    const dispatch = useDispatch();
    const [cargandoGuardar, setCargandoGuardar] = useState(false);
    const [cargando, setCargando] = useState(false);
    const [data, setData] = useState(null);

    const guardarRegistro = async (fecha, dataForm, fnImperative) => {
        setCargandoGuardar( true );
        try {   
            await submitAsistenciaManual({
                fecha,
                dataForm,
            });

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

    const consultarDatosFecha = async (fecha) => {
        setCargando( true );
        setData(null);
        try {
            
            const data = await getDataAsistenciaManual(fecha);
          
            const dataProcesada = procesarData({ 
                ...data, 
                fecha, 
                numero_dia : new Date(`${fecha} GMT:-0500`).getDay()
            });

            setData(dataProcesada);
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
        consultarDatosFecha
    }
}