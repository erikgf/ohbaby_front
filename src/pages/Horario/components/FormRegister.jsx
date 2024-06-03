import { useEffect, useMemo } from "react";
import {  Button, Card, CardContent, Divider, Grid, IconButton, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Tooltip, Typography } from "@mui/material";
import { MdAdd as AddIcon, MdEdit as EditIcon, MdDelete as DeleteIcon, MdClose as CloseIcon } from "react-icons/md";
import { ModalRegister } from "../../../components";
import { useForm } from "../../../hooks/useForm";
import { defaultValuesForm } from "../data/defaultValuesForm";
import useConfirm from "../../../hooks/useConfirm";
import { useHorarios } from "../hooks/useHorarios";
import { useHorarioDetalle } from "../hooks/useHorarioDetalle";

export const FormRegister = () => {
    const { openModal, seleccionado, cargandoGuardar, onGuardarRegistro, onCloseModal } = useHorarios();
    const { onLeerModalDetalle, onEliminarDetalle  } = useHorarioDetalle();
    const { valuesForm, assignValueForm, resetValueForm } = useForm({defaultValuesForm});
    const { confirm } = useConfirm();
    
    useEffect(()=>{
        if (Boolean(seleccionado?.id)){
            const { descripcion, detalles } = seleccionado;

            resetValueForm({
                descripcion,
                detalles
            });
            return;
        }

        if (Boolean(seleccionado)){
            const { detalles } = seleccionado;

            resetValueForm({
                ...valuesForm,
                detalles
            });

            return;
        }

    }, [seleccionado]);

    useEffect(()=>{
        if (openModal === false){
            resetValueForm();
        }
    }, [openModal]);

    const titleModal = useMemo(()=>{
        return `${ !Boolean( seleccionado?.id ) ? 'Nuevo' : 'Editando'} Horario`;
    }, [seleccionado]);


    return (
        <ModalRegister 
                modalTitle = {titleModal}
                okButtonText = 'Guardar'
                open = { openModal }
                maxWidth="sm"
                handleModalClose = {()=>{
                    onCloseModal();
                }}
                onSubmit = { (e)=>{
                    e.preventDefault();
                    onGuardarRegistro(valuesForm);
                }}
                submitLoading={cargandoGuardar}
            >
                <Card sx={{mb: 2}}>
                    <CardContent margin={1}>
                        <Grid container spacing={2}>
                            <Grid item  xs={12}>
                                <TextField
                                    label="Descripción"
                                    size="small"
                                    margin="dense"
                                    type="text"
                                    autoFocus
                                    fullWidth
                                    required
                                    value = {valuesForm?.descripcion ?? ""}
                                    onChange={ (e)=>{
                                        assignValueForm("descripcion", e.target.value);
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                <Grid container spacing={2}>
                    <Grid item sm={12}>
                        <Paper  sx={{ width: '100%', mb: 2 }}>
                            <Toolbar  sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 }}}>
                                <Typography
                                    sx={{ flex: '1 1 100%' }}
                                    color="inherit"
                                    variant="subtitle1"
                                    fontWeight={"bold"}
                                    component="div"
                                    >
                                    Detalles
                                </Typography>
                                <Tooltip title="NUEVO">
                                    <Button 
                                        sx={{mr: 1, pr: 3, pl: 3}}
                                        color="primary"
                                        variant="contained"
                                        onClick={(e)=>{
                                            onLeerModalDetalle({id : null});
                                        }} 
                                        startIcon= {<AddIcon />}>
                                        NUEVO
                                    </Button>
                                </Tooltip>
                            </Toolbar>
                            <TableContainer>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{fontWeight: 'bold'}}>OPC</TableCell>
                                            <TableCell sx={{fontWeight: 'bold'}}>Hora Inicio</TableCell>
                                            <TableCell sx={{fontWeight: 'bold'}}>Hora Fin</TableCell>
                                            <TableCell sx={{fontWeight: 'bold'}}>Días</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            valuesForm?.detalles.length
                                            ?  valuesForm?.detalles?.map( detalle => {
                                                    return <TableRow key={detalle.id}>
                                                        <TableCell width={70}>
                                                            <IconButton title="Editar" size="small" onClick={()=>{
                                                                onLeerModalDetalle({id : detalle.id});
                                                            }}>
                                                                <EditIcon color="orange"/>
                                                            </IconButton>
                                                            <IconButton title="Eliminar" size="small" onClick={()=>{
                                                                onEliminarDetalle({id : detalle.id});
                                                            }}>
                                                                <DeleteIcon color="red"/>
                                                            </IconButton>
                                                        </TableCell>
                                                        <TableCell>{detalle.horaInicio}</TableCell>
                                                        <TableCell>{detalle.horaFin}</TableCell>
                                                        <TableCell>{detalle.dias.filter( dia => dia.checked).map( dia => dia.descripcion).join(",") }</TableCell>
                                                    </TableRow>
                                                })
                                            :   <TableRow>
                                                <TableCell colSpan={6} align="center"> Sin registros </TableCell>
                                            </TableRow>
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                </Grid>
        </ModalRegister>
    )
}