import { axiosPrivate } from "../../api/axios";


export const getSearchPersonals = async (cadenaBuscar) => {
    const res = await axiosPrivate.get(`/empleados?searchTerm=${cadenaBuscar}`);
    return res.data;
};
