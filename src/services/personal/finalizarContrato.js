import { axiosPrivate } from "../../api/axios";

export const finalizarContrato = async (id, fechaCese, razonCese) => {
    const res = await axiosPrivate.post(`/empleados/finalizar-contrato/${id}`, {
        fecha_cese : fechaCese,
        razon_cese: razonCese
    });
    return res.data;
};