import { Box, Card, CardContent,  Divider,  LinearProgress,  List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material"
import { horarios } from "../data/horarios";
import { useHorario } from "../hooks/useHorario";
import { useEffect } from "react";

const styles = {
    horas: {
        display: "flex",
        gap: "16px",
        justifyContent: "flex-start",
        alignItems: "center",
        color: 'inherit'
    }
}

export const Horarios = () => {
    const { cargandoHorarios, horarios, onListarHorarios, onSeleccionarHorario} = useHorario();

    useEffect(()=>{
        onListarHorarios();
    }, []);

    return <Card>
            <CardContent>
                <Typography variant = "h6">Horarios Disponibles</Typography>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {
                        cargandoHorarios &&
                            <LinearProgress />
                    }
                    {
                        horarios?.map ( horario => {
                            return <ListItemButton key={horario.id} alignItems="flex-start" 
                                            divider 
                                            sx={{
                                                    "&.Mui-selected": {
                                                        backgroundColor: "#080e58",
                                                        color: 'white'
                                                    },
                                                }}
                                            selected = { horario.seleccionado }
                                            onClick={()=>{
                                                onSeleccionarHorario({
                                                    id: horario.id
                                                });
                                            }}>
                                        <ListItemText
                                            primary={<Typography variant="h6" component="span" fontWeight={'bold'}>{horario.descripcion}</Typography>}
                                            secondaryTypographyProps={{component: "div", sx:{color: 'inherit'}}}
                                            secondary={
                                                <>
                                                {
                                                    horario?.detalles.map( (detalle, index) => {
                                                        return <Box key={detalle.id}>
                                                                    <Box sx={styles.horas}>
                                                                        <Typography
                                                                            variant="caption"
                                                                        >
                                                                            <strong>{index +1 }. Hora Inicio: </strong> {detalle.horaInicio} | <strong>Hora Fin: </strong> {detalle.horaFin}
                                                                        </Typography>
                                                                    </Box>
                                                                    <Typography
                                                                        variant="caption"
                                                                    >
                                                                        <strong>* Días: </strong> {detalle.dias.map( dia => dia.descripcion).join(", ") }
                                                                    </Typography>
                                                                </Box>
                                                    })
                                                }
                                                </>
                                            }
                                            />
                                    </ListItemButton>
                        })
                    }
                    
                </List>
            </CardContent>
        </Card>
}