import { Checkbox, Container, FormControlLabel, Grid, TextField } from "@mui/material";
import { MdImportExport as ExcelIcon } from "react-icons/md";
import { useReporteAsistenciaRegistro } from "./useReporteAsistenciaRegistro";
import { getHoy } from "../../assets/utils";
import { LoadingButton } from "@mui/lab";

const hoy = getHoy();
export const ReporteAsistenciaRegistro = () => {
    const { cargando, isAsistencia, setIsAsistencia, isSueldo, setIsSueldo, obtenerDataParaReportes} = useReporteAsistenciaRegistro();

    return <Container sx={{pt: 3}} component={"form"} onSubmit={(e)=>{
        e.preventDefault();
        const { target : form} = e;
        obtenerDataParaReportes({
            fechaInicio : form.fecha_inicio.value,
            fechaFin : form.fecha_fin.value
        });
    }}>
            <Grid container spacing={2}>
                <Grid item sm={12} md={2}>
                    <TextField
                        type="date"
                        fullWidth
                        name="fecha_inicio"
                        label="Fecha Inicio"
                        required
                        InputLabelProps={{shrink: true}}
                        defaultValue={hoy}
                        autoFocus
                        size="small"
                        autoComplete="off"
                        />
                </Grid>
                <Grid item sm={12} md={2}>
                    <TextField
                        type="date"
                        fullWidth
                        name="fecha_fin"
                        label="Fecha Fin"
                        required
                        InputLabelProps={{shrink: true}}
                        defaultValue={hoy}
                        autoFocus
                        size="small"
                        autoComplete="off"
                        />
                </Grid>
                <Grid item sm={12} md={2}>
                    <FormControlLabel control={<Checkbox checked={isAsistencia}  onChange={(e)=>{setIsAsistencia(e.target.checked)}}/>} label="Asistencia" />
                    <FormControlLabel control={<Checkbox checked={isSueldo} onChange={(e)=>{setIsSueldo(e.target.checked)}}/>} label="Sueldos" />
                </Grid>
                <Grid item sm={12} md={2}>
                    <LoadingButton loading={cargando} disabled={Boolean(!isAsistencia && !isSueldo)} type="submit" variant="contained" color="success" endIcon={<ExcelIcon />}>GENERAR EXCEL</LoadingButton>
                </Grid>
            </Grid>
            
    </Container>
};