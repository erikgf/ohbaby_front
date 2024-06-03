import axios, { axiosPrivate } from "../api/axios";

export const logIn = async (data) => {
    const res = await axios.post(`/sesion/iniciar`, data);
    return res.data;
};

export const logOut = async () => {
    const res = await axiosPrivate.post(`/sesion/cerrar`);
    return res.data;
};