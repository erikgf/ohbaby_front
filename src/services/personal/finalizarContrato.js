import { axiosPrivate } from "../../api/axios";

export const finalizarContrato = async (id) => {
    const res = await axiosPrivate.post(`/empleados/finalizar-contrato/${id}`);
    return res.data;
};