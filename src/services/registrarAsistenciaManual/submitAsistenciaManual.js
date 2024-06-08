import { axiosPrivate } from "../../api/axios";

export const submitAsistenciaManual = async ({fecha, codigoUnico, mananaEntrada, mananaSalida, tardeEntrada, tardeSalida}) => {
    const data = {
        fecha,
        codigo_unico: codigoUnico,
        hora_entrada_mañana: mananaEntrada,
        hora_salida_mañana: mananaSalida,
        hora_entrada_tarde: tardeEntrada,
        hora_salida_tarde: tardeSalida,
    };

    const res = await axiosPrivate.post(`/asistencia-registro-empleado`, data);
    return res.data;
};