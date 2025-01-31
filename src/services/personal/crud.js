import { getDateFormattedToRaw } from "@/assets/utils";
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

export const processMasiveEmpleado = async (dataAlta, dataBaja) => {
    return await axiosPrivate.post('empleados-masivo', {
        data_alta: dataAlta?.map( item => (
            {
                ...item,
                numero_de_documento_antiguo: item.numero_de_documento_antiguo?.toString(),
                numero_de_documento: item.numero_de_documento?.toString(),
                tipo_de_documento: item?.tipo_de_documento,
                fecha_de_ingreso: getDateFormattedToRaw(item?.fecha_de_ingreso),
                fecha_de_nacimiento: getDateFormattedToRaw(item?.fecha_de_nacimiento),
                telefono_de_referencia: item?.telefono_de_referencia?.toString(),
                fecha_inicio_de_contrato: getDateFormattedToRaw(item?.fecha_inicio_de_contrato),
                empresa : item?.empresa?.toString().trim(),
                celular: item?.celular?.toString(),
                distrito_ubigeo : item?.distrito_ubigeo?.toString()
            }
        )),
        data_baja: dataBaja?.map( item => (
            {
                numero_de_documento_antiguo: item.numero_de_documento_antiguo?.toString(),
            }
        ))
    });
};