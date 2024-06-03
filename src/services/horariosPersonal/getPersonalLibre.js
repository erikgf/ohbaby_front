import { axiosPrivate } from "../../api/axios";

export const getPersonalLibre = async () => {
    const res = await axiosPrivate.get(`/horarios-empleados-contrato-libres`);
    return res.data;
}