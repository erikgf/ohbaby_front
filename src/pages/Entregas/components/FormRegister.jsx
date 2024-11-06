import { useEffect, useMemo, useState } from "react";
import { ModalRegister } from "../../../components";
import { Button, Card, CardContent, Grid, IconButton, MenuItem, Table, TableBody, TableCell, TableFooter, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useForm } from "../../../hooks";
import { useEntregas } from "../hooks/useEntregas";
import { useTipoEntregaBean } from "../../../hooks/useTipoEntregaBean";
import { useBuscarPersonal } from "../hooks/useBuscarPersonal";
import { AutocompleteOnline } from "../../../components/AutocompleteOnline/AutocompleteOnline";
import { MdAdd, MdDelete } from "react-icons/md";
import { useHandleCuotas } from "../hooks/useHandleCuotas";

export const FormRegister = () => {
    const { openModal, seleccionado, cargandoGuardar, defaultValuesForm, onGuardarRegistro, onCloseModal } = useEntregas();
    const { onAgregarCuotas, onQuitarCuota, onActualizarCuota } = useHandleCuotas();
    const { data : tipoEntregas, cargando: cargandoTipoEntregas  } = useTipoEntregaBean({loadFromStart: true});
    const { data : listaPersonal, loading: cargandoPersonal, setSearchTerm : setBuscarTermPersona } = useBuscarPersonal();
    const { valuesForm, assignValueForm, resetValueForm } = useForm({defaultValuesForm});
    const [cantidadCuotas, setCantidadCuotas] = useState(1);

    useEffect(()=>{
        if (Boolean(seleccionado?.isEditando)){
            resetValueForm({
                ...seleccionado,
            });
            return;
        }

        if (Boolean(seleccionado)){
            resetValueForm({
                ...valuesForm,
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
        return `${ !Boolean( seleccionado?.isEditando ) ? 'Nuevos' : 'Editando'} Registros`;
    }, [seleccionado]);

    const handleNuevaCuota = () => {
        assignValueForm( "cuotas", onAgregarCuotas(cantidadCuotas, valuesForm?.cuotas) );
    };

    const handleActualizarCuota = (newCuota) => {
        assignValueForm( "cuotas",  onActualizarCuota(newCuota, valuesForm?.cuotas));
    };

    const handleQuitarTodasCuotas = () => {
        assignValueForm( "cuotas",  [] );
    };

    const handleQuitarCuota = (cuota) => {
        assignValueForm( "cuotas",  onQuitarCuota(cuota, valuesForm?.fecha_registro, valuesForm?.cuotas));
    };

    return (
        <ModalRegister 
                modalTitle = { titleModal }
                okButtonText = 'Guardar'
                open = { openModal }
                maxWidth="md"
                handleModalClose = {()=>{
                    onCloseModal();
                }}
                onSubmit = { (e)=>{
                    e.preventDefault();
                    onGuardarRegistro(valuesForm);
                }}
                submitLoading={cargandoGuardar}
            >
                <Card>
                    <CardContent margin={1}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <AutocompleteOnline
                                    value = { valuesForm?.empleado_contrato ?? null }
                                    setValue = { (option) => {
                                        assignValueForm("empleado_contrato", option );
                                    } }
                                    required
                                    loadingItems = { cargandoPersonal }
                                    items = { listaPersonal }
                                    setBuscarItemTerm={ setBuscarTermPersona }
                                    label = {"Seleccionar personal"}
                                    />
                            </Grid>
                            
                            <Grid item  xs={12} md={3}>
                                <TextField
                                    label="Tipo de Entrega"
                                    size="small"
                                    margin="dense"
                                    fullWidth
                                    select
                                    required
                                    disabled = { cargandoTipoEntregas }
                                    value = {valuesForm?.tipo_entrega?.id ?? ""}
                                    onChange={ (e)=>{
                                        const tipoEntrega = tipoEntregas.find( item => item.id == e.target.value) ?? null;
                                        assignValueForm("tipo_entrega", tipoEntrega);
                                    }}
                                >
                                    <MenuItem value="" disabled><em>Seleccionar</em></MenuItem>
                                    {
                                        tipoEntregas?.map( ({id, descripcion}) => {
                                            return <MenuItem key={id} value={id}>{descripcion}</MenuItem>
                                        })
                                    }
                                </TextField>
                            </Grid>
                            <Grid item md={12}>
                                <Table padding="none">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell width={70} align="center">
                                                Opc.
                                                <IconButton 
                                                    onClick={(e)=>{
                                                        handleQuitarTodasCuotas();
                                                    }}
                                                    size="small" type="button" color="error" variant="contained">
                                                        <MdDelete />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell width={70} align="center">N°</TableCell>
                                            <TableCell align="left">Fecha Registro</TableCell>
                                            <TableCell align="left">Motivo Registro</TableCell>
                                            <TableCell align="right">Monto Cuota</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            valuesForm?.cuotas?.map( (item, index) => {
                                                return  <TableRow key={item?.id}>
                                                            <TableCell align="center" width={70}>
                                                                <IconButton 
                                                                    onClick={(e)=>{
                                                                        handleQuitarCuota(item);
                                                                    }}
                                                                    size="small" type="button" color="error" variant="contained">
                                                                        <MdDelete />
                                                                </IconButton>
                                                            </TableCell>
                                                            <TableCell align="center" width={70}>
                                                                { index + 1}
                                                            </TableCell>
                                                            <TableCell align="left">
                                                                <TextField 
                                                                    type="date"
                                                                    size="small"
                                                                    margin="dense"
                                                                    value= { item?.fecha_cuota ?? ""}
                                                                    InputLabelProps={
                                                                        { shrink: true }
                                                                    }
                                                                    onChange={ (e)=>{
                                                                        handleActualizarCuota({
                                                                            ...item,
                                                                            fecha_cuota:  e.target.value
                                                                        });
                                                                    }}
                                                                    />
                                                            </TableCell>
                                                            <TableCell align="left" >
                                                                <TextField 
                                                                    multiline
                                                                    rows={2}
                                                                    fullWidth
                                                                    size="small"
                                                                    margin="dense"
                                                                    value= { item?.motivo_registro ?? ""}
                                                                    onFocus={(e) => {
                                                                        e.target.select()
                                                                    }}
                                                                    onChange={ (e)=>{
                                                                        handleActualizarCuota({
                                                                            ...item,
                                                                            motivo_registro:  e.target.value
                                                                        });
                                                                    }}
                                                                    />
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                <TextField
                                                                    label="Monto Registro S/"
                                                                    size="small"
                                                                    margin="dense"
                                                                    type="number"
                                                                    autoFocus
                                                                    required
                                                                    inputProps={{sx: { textAlign: "right", maxWidth: 125}}}
                                                                    value = {item?.monto_cuota ?? "0.00"}
                                                                    onFocus={(e) => {
                                                                        e.target.select()
                                                                    }}
                                                                    onBlur={(e) => {
                                                                        const valorCuota = !Boolean(e.target.value) 
                                                                                            ? "0.00"
                                                                                            : parseFloat(e.target.value).toFixed(2);

                                                                        handleActualizarCuota({
                                                                            ...item,
                                                                            monto_cuota:  valorCuota
                                                                        })
                                                                    }}
                                                                    onChange={ (e)=>{
                                                                        handleActualizarCuota({
                                                                            ...item,
                                                                            monto_cuota:  e.target.value
                                                                        });
                                                                    }}
                                                                />
                                                            </TableCell>
                                                        </TableRow>
                                            })
                                        }
                                    </TableBody>
                                    {
                                        !Boolean(seleccionado?.isEditando) &&
                                            <TableFooter>
                                                <TableRow>
                                                    <TableCell colSpan={3} padding="normal">
                                                        <Button 
                                                            type="button" 
                                                            color="primary" 
                                                            fullWidth
                                                            variant="contained" 
                                                            sx={{ pl: 3, pr: 3 }} endIcon={<MdAdd />} 
                                                            onClick={handleNuevaCuota}>
                                                        Agregar Cuotas(s)
                                                        </Button>
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <TextField 
                                                                size="small"
                                                                margin="dense"
                                                                value={cantidadCuotas}
                                                                fullWidth
                                                                sx={{width: 100}}
                                                                onChange={(e)=>{
                                                                    if (!Boolean(e.target.value) || e.target.value <= 0){
                                                                        setCantidadCuotas("");
                                                                        return;
                                                                    }
                                                                    setCantidadCuotas(e.target.value)
                                                                }}
                                                                />
                                                    </TableCell>
                                                    <TableCell></TableCell>
                                                </TableRow>
                                            </TableFooter>
                                    }
                                    
                                </Table>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
        </ModalRegister>
    )
};