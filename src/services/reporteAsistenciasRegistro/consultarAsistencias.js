import { axiosPrivate } from "../../api/axios";

export const consultarAsistencias = async ({fechaInicio, fechaFin}) => {
    const paramsData = new URLSearchParams({
        desde: fechaInicio, hasta: fechaFin,
    });

    return await axiosPrivate.get(`/reporte-asistencia-empleados/asistencias?${paramsData.toString()}`);
};