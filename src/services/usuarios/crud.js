import { axiosPrivate } from "../../api/axios";

export const deleteUsuario = async ({id}) => {
    const res = await axiosPrivate.delete(`/usuarios/${id}`);
    return res.data;
};

export const getUsuario = async ({id}) => {
    const res = await axiosPrivate.get(`/usuarios/${id}`);
    return res.data;
};

export const getUsuarios = async () => {
    const res = await axiosPrivate.get(`/usuarios`);
    return res.data;
};

export const insertUsuario = async (data) => {
    const res = await axiosPrivate.post(`/usuarios`, data);
    return res.data;
};

export const updateUsuario = async ({id, data}) => {
    const res = await axiosPrivate.put(`/usuarios/${id}`, data);
    return res.data;
};