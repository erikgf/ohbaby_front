import { axiosPrivate } from "../../api/axios";

export const getSearchPersonalsContrato = async (cadenaBuscar) => {
    const res = await axiosPrivate.get(`/empleados-contratos?searchTerm=${cadenaBuscar}`);
    return res.data;
};
