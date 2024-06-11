import { Alert, Box, Card, CardContent, Container, Divider, Grid, LinearProgress, TextField, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { MdSave as SaveIcon } from "react-icons/md";
import { useRegistrarAsistenciaManual } from "./useRegistrarAsistenciaManual";
import { LoadingButton } from "@mui/lab";


export const RegistrarAsitenciaManual = () => {
    const inputRef = useRef(null);
    const inputHoraEntrada = useRef(null);
    const { cargando, resultado, codigo, ultimoRegistro, isError,
            consultarResultado, modificarHoras, guardarRegistro,
            setCodigo } = useRegistrarAsistenciaManual();

    useEffect(()=>{
        if (codigo === "" && isError){
            inputRef.current.focus();
            return;
        }

        if(codigo.length >= 11){
            consultarResultado({codigoBarra: codigo}, ()=>{
                inputHoraEntrada.current.focus();
            });
            return;
        }
    }, [codigo, isError]);

    return <Container sx={{pt: 3}}>
            <Grid container spacing={2}>
                <Grid item sm={12} md={4}>
                    <TextField
                        type="text"
                        inputRef={inputRef}
                        label = "Ingrese código Barra"
                        fullWidth
                        value={codigo}
                        onChange={(e)=>setCodigo(e.target.value)}
                        InputLabelProps={{shrink: true}}
                        autoFocus
                        size="large"
                        autoComplete="off"
                        />     
                    {
                        cargando &&
                            <Box pt = {1} >
                                <LinearProgress color="primary"/>
                            </Box>
                    }
                </Grid>
                <Grid item sm={12} md={8}>
                    <Card>
                        <CardContent component={"form"} onSubmit={(e)=>{
                            e.preventDefault();
                            guardarRegistro(()=>{
                                inputRef.current.focus();
                            });
                        }}>
                            <Grid container spacing={2}>
                                <Grid item sm={12} md={3}>
                                <Typography variant="body2" fontWeight={"bold"}>Fecha</Typography>
                                    <Typography variant="h6">{resultado?.fecha_formateada ?? "-"}</Typography>
                                </Grid>
                                <Grid item sm={12} md={9}>
                                    <Typography variant="body2" fontWeight={"bold"}>Nombre Colaborador</Typography>
                                    <Typography variant="h6">{resultado?.nombre_empleado ?? "-"}</Typography>
                                </Grid>
                            </Grid>
                            <Divider sx={{mt:1, mb: 1}} />
                            <Grid container spacing={2}>
                                <Grid item sm={12} md={6}>
                                    <Typography variant="body2" fontWeight={"bold"}>Mañana</Typography>
                                    <Box display={"flex"} gap={2}>
                                        <TextField 
                                            inputRef={inputHoraEntrada}
                                            label="Hora Entrada"
                                            margin="dense"
                                            size="small"
                                            type = "time"
                                            name="manana_hora_entrada"
                                            value = { resultado?.manana_entrada ?? "" }
                                            onChange={(e)=> {
                                                modificarHoras({key: "manana_entrada", value: e.target.value});
                                            }}
                                            InputLabelProps={{shrink: true}}
                                            required
                                            fullWidth
                                            />
                                        <TextField 
                                            label="Hora Salida"
                                            margin="dense"
                                            type = "time"
                                            size="small"
                                            name="manana_hora_salida"
                                            value = { resultado?.manana_salida ?? "" }
                                            onChange={(e)=> {
                                                modificarHoras({key: "manana_salida", value: e.target.value});
                                            }}
                                            InputLabelProps={{shrink: true}}
                                            required
                                            fullWidth
                                            />
                                    </Box>
                                    
                                </Grid>
                                <Grid item sm={12} md={6}>
                                    <Typography variant="body2" fontWeight={"bold"}>Tarde</Typography>
                                    <Box display={"flex"} gap={2}>
                                        <TextField 
                                            label="Hora Entrada"
                                            margin="dense"
                                            size="small"
                                            type = "time"
                                            name="tarde_hora_entrada"
                                            value = { resultado?.tarde_entrada ?? "" }
                                            onChange={(e)=> {
                                                modificarHoras({key: "tarde_entrada", value: e.target.value});
                                            }}
                                            InputLabelProps={{shrink: true}}
                                            required
                                            fullWidth
                                            />
                                        <TextField 
                                            label="Hora Salida"
                                            margin="dense"
                                            size="small"
                                            type = "time"
                                            name="tarde_hora_salida"
                                            value = { resultado?.tarde_salida ?? "" }
                                            onChange={(e)=> {
                                                modificarHoras({key: "tarde_salida", value: e.target.value});
                                            }}
                                            InputLabelProps={{shrink: true}}
                                            required
                                            fullWidth
                                            />
                                    </Box>
                                </Grid>
                            </Grid>
                            <Box mt={2} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                                {
                                    Boolean(ultimoRegistro) &&
                                        <Alert color="success">
                                            <Typography>Último Registro:</Typography>
                                            <Typography variant="subtitle2">{ultimoRegistro}</Typography>
                                        </Alert>
                                }
                                <LoadingButton type="submit" disabled={ !Boolean(resultado) } variant="contained" color="success" endIcon={<SaveIcon />}>GUARDAR</LoadingButton>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            
    </Container>
};