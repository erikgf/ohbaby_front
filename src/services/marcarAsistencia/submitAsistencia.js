import { axiosPrivate } from "../../api/axios";

export const submitAsistencia = async (codigoUnico) => {
    const res = await axiosPrivate.post(`/asistencia/marcar/${codigoUnico}`);
    return res.data;
};