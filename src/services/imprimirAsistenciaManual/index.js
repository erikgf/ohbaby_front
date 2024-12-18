import { axiosPrivate } from "../../api/axios";

export const getDataControlAsistencia = async (fecha) => {
    const res = await axiosPrivate.get(`/reporte-asistencia-registros/asistencias/excel/${fecha}`);
    return res.data;
};