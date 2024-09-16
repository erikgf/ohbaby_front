import { axiosPrivate } from "../../api/axios";

export const finalizarContrato = async (id, fechaCese) => {
    const res = await axiosPrivate.post(`/empleados/finalizar-contrato/${id}`, {
        fecha_cese : fechaCese
    });
    return res.data;
};