const BASE_URL = import.meta.env.VITE_URL;
const URL_PDF_CONTROLASISTENCIA = `${BASE_URL}/pdf/control-asistencia`;

export const useImprimirAsistenciaManual = () =>{

    const generarPDF = ({fecha}) => {
        window.open(`${URL_PDF_CONTROLASISTENCIA}/${fecha}?key=varios`, "_blank");
        window.open(`${URL_PDF_CONTROLASISTENCIA}/${fecha}?key=novarios`, "_blank");
    };

    return {
        generarPDF
    }
}