import { Box, Button, Container, LinearProgress, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { MdCheckBox as CheckIcon, MdExitToApp as ExitIcon } from "react-icons/md";
import { useMarcarAsistencia } from "./useMarcarAsistencia";
import { useNavigate } from "react-router-dom";
import { getFormalDate } from "../../assets/utils";
import { useState } from "react";

const fechaFormalCompleta = getFormalDate();

export const MarcarAsistencia = () => {
    const inputRef = useRef(null);
    const { cargando, resultado, codigo, 
            consultarResultado,
            setCodigo } = useMarcarAsistencia();
    const navigate = useNavigate();
    const [tiempo, setTiempo] = useState(new Date().toLocaleTimeString())
    
    useEffect(()=>{
        let intervalKey  = setInterval(()=>{
            setTiempo(new Date().toLocaleTimeString())
        }, 1000);

        return () => {
            if (intervalKey){
                clearInterval(intervalKey);
                intervalKey = null;
            }
        };
    },[]);

    useEffect(()=>{
        if (codigo === ""){
            inputRef.current.focus();
            return;
        }

        if(codigo.length >= 3){
            consultarResultado({codigoUnico: codigo});
            return;
        }
    }, [codigo]);

    return <Container maxWidth="sm">
            <Box pt={2} pb={12} display={"flex"} justifyContent={"space-between"} alignItems={"flex-start"}>
                <Stack>
                    <Typography variant="subtitle2">{fechaFormalCompleta}</Typography>
                    <Typography variant="caption" fontWeight={"bold"}>{tiempo}</Typography>
                </Stack>
                <Button type="button" color="primary" size="small" onClick={()=>{
                    navigate("/main");
                }} endIcon={<ExitIcon/>}>SALIR</Button>
            </Box>
            <Box  display={"flex"} flexDirection={"column"} flexWrap={"nowrap"} justifyContent={"center"} alignItems={"center"}>
                <TextField
                    type="text"
                    inputRef={inputRef}
                    sx={{ maxWidth: '360px'}}
                    label = "Ingrese código QR"
                    fullWidth
                    value={codigo}
                    onChange={(e)=>setCodigo(e.target.value)}
                    InputLabelProps={{shrink: true}}
                    inputProps={{maxLength: 3}}
                    autoFocus
                    size="large"
                    autoComplete="off"
                    />     
                {
                    Boolean(resultado) &&
                    (
                        Boolean(resultado?.ok)
                        ?   <Box p={5} m={3} sx={{backgroundColor: "#d2fcc4"}} borderRadius={"1em"}>
                                <Box textAlign={"center"}>
                                    <CheckIcon size={172} color="green" />
                                </Box>
                                <Typography textAlign={"center"} variant="h4" fontWeight="bold" color={"green"}>{resultado.msg}</Typography>
                                <Typography textAlign={"center"} variant="h6" fontWeight="bold" >{resultado.label}</Typography>
                                <Typography textAlign={"center"} variant="body2" fontWeight="bold" >Hora: {resultado?.hora}</Typography>
                            </Box>
                        :   <Box p={5} m={3} sx={{backgroundColor: "#fcd2ce"}} borderRadius={"1em"}>
                                <Box textAlign={"center"}>
                                    <CheckIcon size={172} color="red" />
                                </Box>
                                <Typography variant="h4" fontWeight="bold" color={"red"}>{resultado.msg}</Typography>
                            </Box>
                    )
                }
            </Box>
            {
                cargando &&
                    <Box p = {2} display={"flex"} justifyContent={"center"}>
                        <LinearProgress color="primary"  sx={{ width: '360px'}}/>
                    </Box>
            }
    </Container>
};