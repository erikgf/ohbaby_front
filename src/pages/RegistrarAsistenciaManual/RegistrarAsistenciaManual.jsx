import { Box, Card, CardContent, Checkbox, Container, Divider, Grid, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { MdSearch, MdSave as SaveIcon } from "react-icons/md";
import { useRegistrarAsistenciaManual } from "./useRegistrarAsistenciaManual";
import { LoadingButton } from "@mui/lab";

const inputNames = [
    "turno_uno_entrada",
    "turno_dos_entrada",
    "turno_uno_salida",
    "turno_dos_salida"
];

const deshabilitarInputsFila = ({form, id, checked}) => {
    let input;
    inputNames.forEach(inputName => {
        input = form?.[`${inputName}_${id}`];
        if (input){
            input.readOnly = checked;
            input.required = !checked;
        }
    });
};

const procesarForm = (form, data) => {
    return data?.map( item => {
        const newItem = {
            id: item?.id
        };

        inputNames.forEach( input => {
            const $input = form?.[`${input}_${item?.id}`];
            if (Boolean($input)){
                newItem[input] = $input.value.substr(0, 5);
            }
        });

        newItem.falto = form[`falto_${item?.id}`].checked ? 1 : 0;
        return newItem;
    });
};

export const RegistrarAsitenciaManual = () => {
    const formRef = useRef(null);
    const inputFecha = useRef(null);
    const [fecha, setFecha] = useState("");
    const { cargando, cargandoGuardar, data,
            guardarRegistro, consultarDatosFecha
          } = useRegistrarAsistenciaManual();

    return <Container sx={{pt: 3}}>
            <Grid container spacing={2}>
                <Grid item sm={12} >
                    <Card>
                        <CardContent component={"form"} ref={formRef} onSubmit={(e)=>{
                            e.preventDefault();
                            const { target : form } = e;
                            const dataForm = procesarForm(form, data);
                            guardarRegistro(
                                fecha,
                                dataForm, 
                                ()=>{
                                    inputFecha.current.focus();
                                }
                            );
                        }}>
                            <Grid container spacing={2}>
                                <Grid item sm={12} md={2}>
                                    <Typography variant="body2" fontWeight={"bold"}>Fecha de Registro</Typography>
                                    <TextField 
                                            inputRef={inputFecha}
                                            margin="dense"
                                            size="small"
                                            type = "date"
                                            name="fecha"
                                            autoFocus
                                            value = { fecha }
                                            onChange={(e)=> {
                                                setFecha(e.target.value);
                                            }}
                                            InputLabelProps={{shrink: true}}
                                            required
                                            fullWidth
                                            />
                                </Grid>
                                <Grid item sm={12} md={2} alignItems="center" display={"flex"} >
                                    <LoadingButton
                                        onClick={() => {
                                            consultarDatosFecha(fecha);
                                        }}
                                        color="primary"
                                        type="button"
                                        disabled = {!Boolean(fecha)}
                                        loading = { cargando }
                                        variant="contained"
                                        endIcon={<MdSearch />}
                                    >
                                        CONSULTAR
                                    </LoadingButton>
                                </Grid>
                            </Grid>
                            <Divider sx={{mt:1, mb: 1}} />
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" sx={{fontWeight: "bold"}}>Código</TableCell>
                                        <TableCell sx={{fontWeight: "bold"}}>Nombres y Apellidos</TableCell>
                                        <TableCell colSpan={2} align="center" sx={{fontWeight: "bold"}}>Mañana</TableCell>
                                        <TableCell colSpan={2} align="center" sx={{fontWeight: "bold"}}>Tarde</TableCell>
                                        <TableCell align="center" sx={{fontWeight: "bold"}}>Faltó</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                        {
                                            data?.map ( item => {
                                                return  <TableRow key = {item.id}>
                                                            <TableCell align="center">{item.empleado_codigo_unico}</TableCell>
                                                            <TableCell >{item.empleado_nombres}</TableCell>
                                                            <TableCell>
                                                                <TextField 
                                                                        label="Hora Entrada"
                                                                        margin="dense"
                                                                        size="small"
                                                                        type = "time"
                                                                        name={`turno_uno_entrada_${item.id}`}
                                                                        InputLabelProps={{shrink: true}}
                                                                        defaultValue={ item?.horas[0]?.hora_inicio }
                                                                        inputProps={{
                                                                            max: item?.horas[0]?.hora_fin,
                                                                        }}
                                                                        fullWidth
                                                                    />
                                                            </TableCell>
                                                            <TableCell>
                                                                <TextField 
                                                                        label="Hora Salida"
                                                                        margin="dense"
                                                                        size="small"
                                                                        type = "time"
                                                                        name={`turno_uno_salida_${item.id}`}
                                                                        InputLabelProps={{shrink: true}}
                                                                        defaultValue={ item?.horas[0]?.hora_fin}
                                                                        inputProps={{
                                                                            max: item?.horas[0]?.hora_fin,
                                                                        }}
                                                                        fullWidth
                                                                    />
                                                            </TableCell>
                                                            <TableCell>
                                                                {
                                                                    (item.horas.length > 1  || item.esActualizando) &&
                                                                        <TextField 
                                                                            label="Hora Entrada"
                                                                            margin="dense"
                                                                            size="small"
                                                                            type = "time"
                                                                            name={`turno_dos_entrada_${item.id}`}
                                                                            InputLabelProps={{shrink: true}}
                                                                            fullWidth
                                                                            inputProps={{
                                                                                max: item?.horas[1]?.hora_fin,
                                                                            }}
                                                                            defaultValue={ item?.horas[1]?.hora_inicio || ""}
                                                                        />
                                                                }
                                                            </TableCell>
                                                            <TableCell>
                                                                {
                                                                    (item.horas.length > 1  || item.esActualizando) &&
                                                                        <TextField 
                                                                            label="Hora Salida"
                                                                            margin="dense"
                                                                            size="small"
                                                                            type = "time"
                                                                            name={`turno_dos_salida_${item.id}`}
                                                                            InputLabelProps={{shrink: true}}
                                                                            fullWidth
                                                                            inputProps={{
                                                                                max: item?.horas[1]?.hora_fin,
                                                                            }}
                                                                            defaultValue={ item?.horas[1]?.hora_fin || ""}
                                                                        />
                                                                }
                                                            </TableCell>
                                                            <TableCell align="center" sx={{fontWeight: "bold"}}>
                                                                <Checkbox inputProps = {{ 'aria-label': 'Faltó' }} 
                                                                    name={`falto_${item.id}`} 
                                                                    defaultChecked = { item.falto } 
                                                                    onChange={(e)=>deshabilitarInputsFila({
                                                                        form: formRef?.current,
                                                                        id: item.id,
                                                                        checked: e.target.checked
                                                                    })}/>
                                                            </TableCell>
                                                        </TableRow>
                                            })
                                        }
                                </TableBody>
                            </Table>
                            <Box mt={2} display={"flex"} justifyContent={"flex-end"} alignItems={"center"}>
                                <LoadingButton type="submit" size="large" variant="contained" color="success" loading={cargandoGuardar} endIcon={<SaveIcon />}>GUARDAR</LoadingButton>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            
    </Container>
};