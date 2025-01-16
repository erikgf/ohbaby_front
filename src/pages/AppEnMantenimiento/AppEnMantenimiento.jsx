import { Box, Container, Typography } from "@mui/material";
import imgMant  from "@/assets/images.jpg";

export const AppEnMantenimiento = () => {
    return <Box sx={{height: "100vh"}} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                <Container sx={{textAlign: "center"}}>
                    <img src={imgMant} alt="" />
                    <Typography variant="h6" fontWeight={"bold"}>
                        App en Mantenimiento
                    </Typography>
                    <Typography variant="body2">
                        Volveremos pronto.
                    </Typography>
                </Container>
            </Box>
};