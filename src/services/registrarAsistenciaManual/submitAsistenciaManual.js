import { axiosPrivate } from "../../api/axios";

export const submitAsistenciaManual = async ({fecha, dataForm}) => {
    const data = {
        fecha,
        asistencias: dataForm
    };

    const res = await axiosPrivate.post(`/asistencia-registro-empleado`, data);
    return res.data;
};