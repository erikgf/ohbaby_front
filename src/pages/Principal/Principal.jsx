import { Grid } from "@mui/material";
import mainLogo from "../../assets/logo-main.jpeg";

export const Principal = ()=>{

    return <>
            <Grid container spacing={2}>
                <Grid item xs = {12}>
                   <img style={{width: "100%"}} src={mainLogo} alt="Logo Principal" />
                </Grid>
            </Grid>
        </>
}