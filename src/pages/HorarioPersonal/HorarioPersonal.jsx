import { Box, Grid } from "@mui/material"
import { Flechas, Horarios, PersonalGeneral, PersonalHorario } from "./components";
import { useEffect } from "react";
import { usePersonalHorario } from "./hooks/usePersonalHorario";

export const HorarioPersonal = () => {
    const { onCancelar } = usePersonalHorario();

    useEffect(()=>{
        return onCancelar();
    }, []);

    
    return <Box m={2}>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
                <Horarios />
            </Grid>
            <Grid item xs={12} sm={8}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                        <PersonalHorario />
                    </Grid>
                    <Grid item xs={12} sm={1} sx={{display: 'flex', justifyContent: 'center'}}>
                        <Flechas />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <PersonalGeneral />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Box>
}