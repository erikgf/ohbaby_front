import { axiosPrivate } from "../../api/axios";

export const deletePersonal = async ({id}) => {
    const res = await axiosPrivate.delete(`/empleados/${id}`);
    return res.data;
};

export const getPersonal = async ({id}) => {
    const res = await axiosPrivate.get(`/empleados/${id}`);
    return res.data;
};


export const getPersonals = async ({empresaFiltro}) => {
    const paramsData = new URLSearchParams({
        id_empresa: empresaFiltro
    });

    const res = await axiosPrivate.get(`/empleados?${paramsData.toString()}`);
    return res.data;
};

export const insertPersonal = async (data) => {
    const res = await axiosPrivate.post(`/empleados`, data);
    return res.data;
};

export const updatePersonal = async ({id, data}) => {
    const res = await axiosPrivate.put(`/empleados/${id}`, data);
    return res.data;
};