import { Button, Container, Grid, TextField } from "@mui/material";
import { MdFaceRetouchingNatural, MdFileCopy, MdPictureAsPdf as PdfIcon } from "react-icons/md";
import { useImprimirAsistenciaManual } from "./useImprimirAsistenciaManual";
import { getHoy } from "../../assets/utils";

const hoy = getHoy();

export const ImprimirAsistenciaManual = () => {
    const { generarPDF, generarExcel } = useImprimirAsistenciaManual();

    return <Container sx={{pt: 3}} component={"form"} onSubmit={(e)=>{
        e.preventDefault();
        const { target : form, nativeEvent: { submitter } } = e;
        const fecha = form?.fecha?.value;
        switch( submitter?.value ){
            case "pdf":
                generarPDF(fecha);
            break;
            case "excel":
                generarExcel(fecha)
            break;
            default:
                alert("Action not found.");
            break;
        }
    }}>
            <Grid container spacing={2}>
                <Grid item sm={12} md={2}>
                    <TextField
                        type="date"
                        fullWidth
                        name="fecha"
                        label="Fecha"
                        required
                        InputLabelProps={{shrink: true}}
                        defaultValue={hoy}
                        autoFocus
                        size="small"
                        autoComplete="off"
                        />
                </Grid>
                <Grid item sm={12} md={2}>
                    <Button type="submit" value="pdf" variant="contained" color="error" endIcon={<PdfIcon />}>GENERAR PDF</Button>
                </Grid>
                <Grid item sm={12} md={3}>
                    <Button type="submit" value="excel" variant="contained" color="success" endIcon={<MdFileCopy />}>GENERAR EXCEL</Button>
                </Grid>
            </Grid>
            
    </Container>
};