import { axiosPrivate } from "../../api/axios";

export const getHorariosPersonal = async () => {
    const res = await axiosPrivate.get(`/horarios-empleados-contrato`);
    return res.data;
};