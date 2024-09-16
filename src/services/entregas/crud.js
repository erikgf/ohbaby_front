import { axiosPrivate } from "../../api/axios";

export const deleteEntrega = async ({id}) => {
    const res = await axiosPrivate.delete(`/entregas/${id}`);
    return res.data;
};

export const getEntrega = async ({id}) => {
    const res = await axiosPrivate.get(`/entregas/${id}`);
    return res.data;
};

export const getEntregas = async (data) => {
    const paramsData = new URLSearchParams(data);
    const res = await axiosPrivate.get(`/entregas?${paramsData.toString()}`);
    return res.data;
};

export const insertEntrega = async (data) => {
    const res = await axiosPrivate.post(`/entregas`, data);
    return res.data;
};

export const updateEntrega = async ({id, data}) => {
    const res = await axiosPrivate.put(`/entregas/${id}`, data);
    return res.data;
};