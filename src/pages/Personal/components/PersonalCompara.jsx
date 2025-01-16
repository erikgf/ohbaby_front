import { Box, Grid, TextField, Typography } from "@mui/material"
import { getDiasFromNumDias } from "../../../assets/utils";

export const PersonalCompara = ({ personal }) => {
    const contrato = personal?.contrato;
    const horarioDetalles = contrato?.horarios;
    //const totalHorasMes = parseFloat(contrato?.horas_dia * contrato?.costo_hora);
   
    return <Box mt={2}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {
                        horarioDetalles?.map ( horario  => {
                            return  <Box key={horario.id} id={horario.id}>
                                        <Typography fontWeight={"bold"} variant="body1">{horario.descripcion}</Typography>
                                        {
                                            horario?.horario_detalles?.map( (item, index)  => {
                                                return <Typography key={item.id} variant={"body2"}>{index + 1 }) {getDiasFromNumDias(item?.dias)} | {item?.hora_inicio} - {item?.hora_fin}</Typography>
                                            })
                                        }
                                    </Box>
                        })
                    }
                </Grid>
                
                <Grid item sm={2} xs={6}>
                    <TextField margin="dense" size="small" fullWidth  InputProps={{readOnly: true}}  value={contrato?.salario} label="Salario" InputLabelProps={{shrink: true}} ></TextField>
                </Grid>
                <Grid item sm={2} xs={6}>
                    <TextField margin="dense" size="small" fullWidth  InputProps={{readOnly: true}}  value={contrato?.dias_trabajo ?? ""} label="Días Trabajo" InputLabelProps={{shrink: true}} ></TextField>
                </Grid>
                <Grid item sm={2} xs={6}>
                    <TextField margin="dense" size="small" fullWidth  InputProps={{readOnly: true}}  value={ contrato?.horas_semana ?? ""} label="Horas Semana" InputLabelProps={{shrink: true}} ></TextField>
                </Grid>
                <Grid item sm={2} xs={6}>
                    <TextField margin="dense" size="small" fullWidth InputProps={{readOnly: true}} value={contrato?.horas_dia ?? ""}  label="Horas al Día" InputLabelProps={{shrink: true}} ></TextField>
                </Grid>
                <Grid item sm={2} xs={6}>
                    <TextField margin="dense" size="small" fullWidth InputProps={{readOnly: true}} value={contrato?.costo_dia ?? ""}  label="Costo Día" InputLabelProps={{shrink: true}} ></TextField>
                </Grid>
                <Grid item sm={2} xs={6}>
                    <TextField margin="dense" size="small" fullWidth InputProps={{readOnly: true}} value={contrato?.costo_hora ?? ""}  label="Costo Hora" InputLabelProps={{shrink: true}} ></TextField>
                </Grid>
            </Grid>
        </Box>
}