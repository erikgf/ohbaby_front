import { axiosPrivate } from "../../api/axios";

export const getDepartamentos = async () => {
    const res = await axiosPrivate.get(`/ubigeo-departamentos`);
    return res.data;
};

export const getProvincias = async ({idDepartamento}) => {
    const res = await axiosPrivate.get(`/ubigeo-provincias/${idDepartamento}`);
    return res.data;
};

export const getDistritos = async ({idProvincia}) => {
    const res = await axiosPrivate.get(`/ubigeo-distritos/${idProvincia}`);
    return res.data;
};