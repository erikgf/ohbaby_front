import { Button, Container, Grid, TextField } from "@mui/material";
import { MdPictureAsPdf as PdfIcon } from "react-icons/md";
import { useImprimirAsistenciaManual } from "./useImprimirAsistenciaManual";
import { getHoy } from "../../assets/utils";

const hoy = getHoy();

export const ImprimirAsistenciaManual = () => {
    const { generarPDF } = useImprimirAsistenciaManual();

    return <Container sx={{pt: 3}} component={"form"} onSubmit={(e)=>{
        e.preventDefault();
        const { target : form} = e;
        generarPDF( {fecha: form.fecha.value});
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
                    <Button type="submit" variant="contained" color="error" endIcon={<PdfIcon />}>GENERAR PDF</Button>
                </Grid>
            </Grid>
            
    </Container>
};