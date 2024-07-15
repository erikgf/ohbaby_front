import { Box, Grid, TextField } from "@mui/material"
import { getDiasFromNumDias } from "../../../assets/utils";

export const PersonalCompara = ({ personal }) => {
    const contrato = personal?.contrato;
    const horarioDetalles = contrato?.horarios[0]?.horario_detalles[0];
    const totalHorasMes = parseFloat(contrato?.horas_dia * contrato?.costo_hora);
    let horarioAsignado = "";
    if (horarioDetalles){
        horarioAsignado = `${getDiasFromNumDias(horarioDetalles?.dias)} | ${horarioDetalles?.hora_inicio} - ${horarioDetalles?.hora_fin}`
    }


    return <Box mt={2}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField margin="dense" size="small" fullWidth  InputProps={{readOnly: true}}  value={horarioAsignado} label="Horario asignado" InputLabelProps={{shrink: true}} ></TextField>
                </Grid>
                <Grid item sm={3} xs={6}>
                    <TextField margin="dense" size="small" fullWidth  InputProps={{readOnly: true}}  value={contrato?.dias_trabajo ?? ""} label="Cant. Días" InputLabelProps={{shrink: true}} ></TextField>
                </Grid>
                <Grid item sm={3} xs={6}>
                    <TextField margin="dense" size="small" fullWidth  InputProps={{readOnly: true}}  value={ Boolean(totalHorasMes) ? totalHorasMes.toFixed(2) : ""} label="Total Horas/Mes" InputLabelProps={{shrink: true}} ></TextField>
                </Grid>
                <Grid item sm={3} xs={6}>
                    <TextField margin="dense" size="small" fullWidth  InputProps={{readOnly: true}}  value={contrato?.salario ?? ""} label="Sueldo" InputLabelProps={{shrink: true}} ></TextField>
                </Grid>
                <Grid item sm={3} xs={6}>
                    <TextField margin="dense" size="small" fullWidth InputProps={{readOnly: true}} value={contrato?.costo_hora ?? ""}  label="Costo/Hora" InputLabelProps={{shrink: true}} ></TextField>
                </Grid>
            </Grid>
        </Box>
}