import { axiosPrivate } from "../../api/axios";

export const deleteTipoEntrega = async ({id}) => {
    const res = await axiosPrivate.delete(`/tipo-entregas/${id}`);
    return res.data;
};

export const getTipoEntrega = async ({id}) => {
    const res = await axiosPrivate.get(`/tipo-entregas/${id}`);
    return res.data;
};

export const getTipoEntregas = async () => {
    const res = await axiosPrivate.get(`/tipo-entregas`);
    return res.data;
};

export const insertTipoEntrega = async (data) => {
    const res = await axiosPrivate.post(`/tipo-entregas`, data);
    return res.data;
};

export const updateTipoEntrega = async ({id, data}) => {
    const res = await axiosPrivate.put(`/tipo-entregas/${id}`, data);
    return res.data;
};