import { Card, CardContent, LinearProgress, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material"
import { usePersonalGeneral } from "../hooks/usePersonalGeneral";
import { BlockVacio } from "../../../components/BlockVacio/BlockVacio";

export const PersonalGeneral = () => {
    const { horarioSeleccionado, personalGeneral , cargandoPersonalGeneral, 
            onSeleccionarEmpleadoGeneral } = usePersonalGeneral();

    if (!Boolean(horarioSeleccionado?.gestionando)){
        return false;
    }

    return  <Card>
                <CardContent>
                    <Typography variant = "h6">Personal General</Typography>
                    <List sx={{ width: '100%', maxWidth: 360, maxHeight: 600, overflow: "auto", bgcolor: 'background.paper' }}>
                        {
                            cargandoPersonalGeneral &&
                                <LinearProgress />
                        }
                        {
                            Boolean(personalGeneral?.length) 
                            ?   personalGeneral?.map( personal => {
                                    return <ListItemButton  divider key={personal.id} selected = { personal.seleccionado } onClick={()=>{
                                                onSeleccionarEmpleadoGeneral(personal.id);
                                            }}
                                            sx={{
                                                "&.Mui-selected": {
                                                    backgroundColor: "#080e58",
                                                    color: 'white'
                                                },
                                            }}
                                        >
                                            <ListItemText primaryTypographyProps={{sx: {fontSize: '.85em'}}} primary={`${personal.numeroDocumento} | ${personal.apellidoPaterno} ${personal.apellidoMaterno}, ${personal.nombres}`} />
                                        </ListItemButton>
                                })
                            : <BlockVacio height={"400"} title="Sin empleados" />
                        }
                    </List>
                </CardContent>
            </Card>
}