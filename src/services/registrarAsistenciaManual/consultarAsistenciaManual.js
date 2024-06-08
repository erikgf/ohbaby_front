import { axiosPrivate } from "../../api/axios";

export const consultarAsistenciaManual = async ({fecha, codigoUnico}) => {
    const paramsData = new URLSearchParams({
        fecha, codigo_unico: codigoUnico,
    });

    const res = await axiosPrivate.get(`/asistencia-registro-empleado?${paramsData.toString()}`);
    return res.data;
};