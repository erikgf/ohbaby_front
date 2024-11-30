import { useState } from "react";
import { getDataControlAsistencia } from "../../services/imprimirAsistenciaManual";
import { useGenerarExcel } from "./useGenerarExcel";

const BASE_URL = import.meta.env.VITE_URL;
const URL_PDF_CONTROLASISTENCIA = `${BASE_URL}/pdf/control-asistencia`;

export const useImprimirAsistenciaManual = () =>{
    const [cargandoExcel, setCargandoExcel] = useState(false);
    const { saveExcel } = useGenerarExcel();

    const generarPDF = (fecha) => {
        window.open(`${URL_PDF_CONTROLASISTENCIA}/${fecha}?key=varios`, "_blank");
        window.open(`${URL_PDF_CONTROLASISTENCIA}/${fecha}?key=novarios`, "_blank");
    };

    const generarExcel = async (fecha) => {
        setCargandoExcel(true);
        
        try {
            const data = await getDataControlAsistencia(fecha);
            saveExcel({
                fileName : `reporte-asistencias-${fecha.replaceAll("-","")}`, 
                data : { ...data, fecha, numero_dia : new Date(`${fecha} GMT:-0500`).getDay() }
            });
        } catch (error) {
            console.error(error);
        } finally {
            setCargandoExcel(false);
        }
    };

    return {
        cargandoExcel,
        generarPDF,
        generarExcel
    }
}