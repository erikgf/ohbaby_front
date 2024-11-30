import { axiosPrivate } from "../../api/axios";

export const getDataAsistenciaManual = async (fecha) => {
    const res = await axiosPrivate.get(`/asistencia-registro-empleado-formulario/${fecha}`);
    return res.data;
};