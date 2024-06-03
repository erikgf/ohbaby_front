import { axiosPrivate } from "../../api/axios";

export const deleteHorario = async ({id}) => {
    const res = await axiosPrivate.delete(`/horarios/${id}`);
    return res.data;
};

export const getHorario = async ({id}) => {
    const res = await axiosPrivate.get(`/horarios/${id}`);
    return res.data;
};


export const getHorarios = async () => {
    const res = await axiosPrivate.get(`/horarios`);
    return res.data;
};

export const insertHorario = async (data) => {
    const res = await axiosPrivate.post(`/horarios`, data);
    return res.data;
};

export const updateHorario = async ({id, data}) => {
    const res = await axiosPrivate.put(`/horarios/${id}`, data);
    return res.data;
};