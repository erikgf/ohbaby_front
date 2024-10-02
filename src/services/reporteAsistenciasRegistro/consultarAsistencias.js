import { axiosPrivate } from "../../api/axios";

export const consultarAsistencias = async ({fechaInicio, fechaFin}) => {
    const paramsData = new URLSearchParams({
        desde: fechaInicio, hasta: fechaFin,
    });

    return await axiosPrivate.get(`/reporte-asistencia-registros/asistencias?${paramsData.toString()}`);
};