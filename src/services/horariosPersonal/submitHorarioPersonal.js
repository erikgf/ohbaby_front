import { axiosPrivate } from "../../api/axios";

export const submitHorarioPersonal = async ({idHorario, arregloIdEmpleadoContratos}) => {
    const res = await axiosPrivate.post(`/horarios-empleados-contrato/${idHorario}`, {
        empleados_contratos: arregloIdEmpleadoContratos
    });

    return res.data;
};