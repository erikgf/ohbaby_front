import { axiosPrivate } from "../../api/axios";

export const getEmpresas = async () => {
    const res = await axiosPrivate.get(`/empresas`);
    return res.data;
};
