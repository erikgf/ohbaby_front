import { axiosPrivate } from "../../api/axios";

export const cambiarClave = async ({id, clave}) => {
    const res = await axiosPrivate.post(`/usuarios/cambiar-clave/${id}`, {clave});
    return res.data;
};