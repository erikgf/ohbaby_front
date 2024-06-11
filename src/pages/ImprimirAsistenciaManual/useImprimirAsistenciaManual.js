const BASE_URL = import.meta.env.VITE_URL;
const URL_PDF_CONTROLASISTENCIA = `${BASE_URL}/pdf/control-asistencia`;

export const useImprimirAsistenciaManual = () =>{

    const generarPDF = ({fecha}) => {
        console.log({fecha});
        window.open(`${URL_PDF_CONTROLASISTENCIA}/${fecha}`, "_blank");
    };

    return {
        generarPDF
    }
}