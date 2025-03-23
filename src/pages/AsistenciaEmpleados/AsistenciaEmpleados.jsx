import { Card, CardContent, Container, Divider, Grid, LinearProgress, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import { MdDelete, MdSave } from "react-icons/md";
import { useBuscarPersonalFecha } from "./useBuscarPersonalFecha";
import { useEffect, useRef, useState } from "react";
import { AutocompleteOnline } from "@/components/AutocompleteOnline/AutocompleteOnline";
import { LoadingButton } from "@mui/lab";
import { useAsistenciaEmpleados } from "./useAsistenciaEmpleados";
import { BlockVacio } from "@/components";

export const AsistenciaEmpleados = () => {
    const inputFecha = useRef(null);
    const [ fecha, setFecha ] = useState("");
    const [ empleado, setEmpleado ] = useState(null);
    const { data : listaEmpleados, loading: cargandoEmpleados, setSearchTerm : setBuscarTermEmpleado } = useBuscarPersonalFecha(fecha);
    const { data : registrosEmpleado, cargando, cargandoGuardar, guardarRegistro, consultarAsistenciaDia, eliminarAsistenciaRegistro} = useAsistenciaEmpleados();

    useEffect(()=>{
        if (Boolean(fecha)){
            consultarAsistenciaDia(fecha);
        }
    }, [fecha]);

    return  <Container sx={{pt: 3}}>
                <Grid container spacing={2}>
                    <Grid item sm={12} >
                        <Card>
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6} md={2}>
                                        <TextField 
                                                inputRef={inputFecha}
                                                label= { "Fecha de Registro" }
                                                size="small"
                                                type = "date"
                                                InputLabelProps={{shrink: true}}
                                                required
                                                fullWidth
                                                onBlur={ (e) => setFecha(e.target.value )}
                                                />
                                    </Grid>
                                    {
                                        Boolean(fecha) &&
                                            <Grid item xs={12} sm={6}>
                                                <AutocompleteOnline
                                                    value = { empleado }
                                                    autoFocus
                                                    setValue = { setEmpleado }
                                                    loadingItems = { cargandoEmpleados }
                                                    items = { listaEmpleados }
                                                    setBuscarItemTerm={ (texto) => {
                                                        setBuscarTermEmpleado(texto, fecha);
                                                    } }
                                                    label = {"Buscar empleado"}
                                                />
                                            </Grid>
                                    }
                                    
                                </Grid>
                                <Divider sx={{mt:1, mb: 1}} />
                                {
                                    (Boolean(empleado) && Boolean(fecha)) && 
                                        <Grid container spacing={2} component={"form"} 
                                            onSubmit={(e)=>{
                                                e.preventDefault();
                                                const form = e.target;
                                                guardarRegistro({
                                                    hora_entrada: form.hora_entrada.value,
                                                    hora_salida: form.hora_salida.value,
                                                    id_empleado_contrato : empleado?.id,
                                                    fecha
                                                }, ()=>{
                                                    setEmpleado(null);
                                                    inputFecha.current.focus();
                                                })
                                            }}>
                                            <Grid item xs={12} md={2}>
                                                <TextField 
                                                        margin="dense"
                                                        size="small"
                                                        type = "time"
                                                        name="hora_entrada"
                                                        label="Hora Entrada"
                                                        autoFocus
                                                        InputLabelProps={{shrink: true}}
                                                        required
                                                        fullWidth
                                                        />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <TextField 
                                                        margin="dense"
                                                        size="small"
                                                        type = "time"
                                                        name="hora_salida"
                                                        label="Hora Salida"
                                                        InputLabelProps={{shrink: true}}
                                                        required
                                                        fullWidth
                                                        />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <LoadingButton type="submit" size="large" variant="contained" color="success" loading={cargandoGuardar} endIcon={<MdSave />}>GUARDAR</LoadingButton>
                                            </Grid>
                                        </Grid>
                                }
                                <Divider sx={{mt:1, mb: 1}} />
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Table size="small">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell width={"50px"} sx={{fontWeight: "bold"}}>Código</TableCell>
                                                    <TableCell sx={{fontWeight: "bold"}}>Empleado</TableCell>
                                                    <TableCell sx={{fontWeight: "bold"}}>Empresa</TableCell>
                                                    <TableCell width={"100px"} align="center" sx={{fontWeight: "bold"}}>H. Entrada</TableCell>
                                                    <TableCell width={"100px"} align="center" sx={{fontWeight: "bold"}}>H. Salida</TableCell>
                                                    <TableCell width={"75px"} align="center" sx={{fontWeight: "bold"}}>Total Horas</TableCell>
                                                    <TableCell width={"50px"} align="center" sx={{fontWeight: "bold"}}>Opc.</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                            {
                                                cargando &&
                                                    <TableRow>
                                                        <TableCell colSpan={7}>
                                                            <LinearProgress />
                                                        </TableCell>
                                                    </TableRow>
                                            }   
                                            {
                                                !Boolean(registrosEmpleado) || (registrosEmpleado?.length <= 0) 
                                                ?   <TableRow>
                                                        <TableCell colSpan={7} align="center"> 
                                                            <BlockVacio />
                                                        </TableCell>
                                                    </TableRow>
                                                : registrosEmpleado?.map( registro => {
                                                    return  <TableRow key = {registro.id}>
                                                                <TableCell>
                                                                    {registro.codigo_unico}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {registro.empleado}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {registro.empresa}
                                                                </TableCell>
                                                                <TableCell align="center" >
                                                                    {registro.hora_entrada}
                                                                </TableCell>
                                                                <TableCell align="center" >
                                                                    { registro.hora_salida }
                                                                </TableCell>
                                                                <TableCell align="center" >
                                                                    { parseFloat(registro.total_horas).toFixed(2) }
                                                                </TableCell>
                                                                <TableCell>
                                                                    <LoadingButton onClick={()=>eliminarAsistenciaRegistro(registro.id)} type="button" size="large" variant="contained" color="error" loading={registro?._eliminando}><MdDelete /></LoadingButton>
                                                                </TableCell>
                                                        </TableRow>
                                                })
                                            }
                                            </TableBody>
                                        </Table>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
};  