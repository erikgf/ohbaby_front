import { axiosPrivate } from "../../api/axios";

export const getEmpleadosPorFecha = async (texto, fecha) => {
    const paramsData = new URLSearchParams({
        texto,
        fecha
    });

    const res = await axiosPrivate.get(`/asistencia-empleados-lista?${paramsData.toString()}`);
    return res.data;
};

export const getAsistenciaDia = async (fecha) => {
    const paramsData = new URLSearchParams({
        fecha,
    });

    const res = await axiosPrivate.get(`/asistencia-empleados?${paramsData.toString()}`);
    return res.data;
};

export const storeAsistencia = async ({fecha, id_empleado_contrato, hora_entrada, hora_salida}) => {
    const res = await axiosPrivate.post(`/asistencia-empleados`, {
        fecha, id_empleado_contrato, hora_entrada, hora_salida
    });
    return res.data;
};

export const deleteAsistencia = async (id) => {
    const res = await axiosPrivate.delete(`/asistencia-empleados/${id}`);
    return res.data;
};