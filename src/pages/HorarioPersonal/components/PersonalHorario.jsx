import { Button, Card, CardContent, List, ListItemButton, ListItemText, Stack, Typography } from "@mui/material"
import { usePersonalHorario } from "../hooks/usePersonalHorario"
import { BlockVacio } from "../../../components/BlockVacio/BlockVacio";
import useConfirm from "../../../hooks/useConfirm";
import { LoadingButton } from "@mui/lab";

export const PersonalHorario = () => {
    const { horarioSeleccionado, cargarPersonalGuardar, onGestionar, onCancelar, onSeleccionarHorarioPersonal, onGuardarHorarioPersonal} = usePersonalHorario();
    const {confirm} = useConfirm();

    const handleGuardar = async () =>{
        const isConfirmed = await confirm({
            title: 'Confirmar Guardar', 
            description: '¿Desea guardar estos registros?'
        });

        if (isConfirmed){
            onGuardarHorarioPersonal();
            return;
        }
    }

    if (!Boolean(horarioSeleccionado)){
        return false;
    }

    return  <Card>
                <CardContent>
                    <Typography variant = "h6">Personal Asociado</Typography>
                    <Typography variant = "body2" fontWeight={'bold'}>Horario: {horarioSeleccionado?.descripcion ?? ""}</Typography>
                    <Stack direction={"row"} gap={2}>
                        {
                                Boolean(horarioSeleccionado?.gestionando) 
                                   ?   <>
                                        <Button sx={{mt:1}} variant="contained" disabled = { cargarPersonalGuardar } type="button" color="error" onClick={()=>{ onCancelar(); }}>CANCELAR</Button>
                                        <LoadingButton loading={cargarPersonalGuardar} sx={{mt:1}} variant="contained" type="button" color="success" onClick={handleGuardar}>GUARDAR</LoadingButton>
                                       </>
                                   :   <Button sx={{mt:1}} variant="contained" color="primary" onClick={()=>{ onGestionar(); }}>GESTIONAR</Button>
                        }
                    </Stack>
                    
                    <List sx={{ width: '100%', maxWidth: 360, maxHeight: 600, bgcolor: 'background.paper', overflow: "auto" }}>
                        {
                            Boolean(horarioSeleccionado?.personal?.length) 
                            ?   horarioSeleccionado?.personal?.map( personal => {
                                    return  <ListItemButton divider key={personal.id} selected = { personal.seleccionado } onClick={()=>{
                                                    onSeleccionarHorarioPersonal(personal.id);
                                                }}
                                                sx={{
                                                    "&.Mui-selected": {
                                                        backgroundColor: "#080e58",
                                                        color: 'white'
                                                    },
                                                }}>
                                                <ListItemText primaryTypographyProps={{sx: {fontSize: '.85em'}}} primary={`${personal.numeroDocumento} | ${personal.apellidoPaterno} ${personal.apellidoMaterno}, ${personal.nombres} `} />
                                            </ListItemButton>
                                })
                            : <BlockVacio height={"400"} title="Sin empleados" />
                        }
                    </List>
                </CardContent>
            </Card>
}