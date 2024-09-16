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
    const { onAgregarCuotas, onQuitarCuota, onActualizarCuota, onDistribuirEquitativamente, onActualizarMontoTotal, onRefrescarFechaCuotas} = useHandleCuotas();
    const { data : tipoEntregas, cargando: cargandoTipoEntregas  } = useTipoEntregaBean({loadFromStart: true});
    const { data : listaPersonal, loading: cargandoPersonal, setSearchTerm : setBuscarTermPersona } = useBuscarPersonal();
    const { valuesForm, assignValueForm, resetValueForm } = useForm({defaultValuesForm});
    const [cantidadCuotas, setCantidadCuotas] = useState(1);

    useEffect(()=>{
        if (Boolean(seleccionado?.id)){
            resetValueForm({
                ...seleccionado,
                cuotas : onRefrescarFechaCuotas(seleccionado.fecha_registro, seleccionado?.cuotas)
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
        return `${ !Boolean( seleccionado?.id ) ? 'Nuevo' : 'Editando'} Registro`;
    }, [seleccionado]);

    const handleNuevaCuota = () => {
        assignValueForm( "cuotas", onAgregarCuotas(cantidadCuotas, valuesForm?.fecha_registro, valuesForm?.cuotas) );
    };

    const handleActualizarCuota = (newCuota) => {
        assignValueForm( "cuotas",  onActualizarCuota(newCuota, valuesForm?.cuotas));
    };

    const handleDistribuirEquitativamente = () => {
        assignValueForm( "cuotas",  onDistribuirEquitativamente(valuesForm.monto_registrado, valuesForm?.cuotas));
    }

    const handleQuitarTodasCuotas = () => {
        assignValueForm( "cuotas",  [] );
    };

    const handleQuitarCuota = (cuota) => {
        assignValueForm( "cuotas",  onQuitarCuota(cuota, valuesForm?.fecha_registro, valuesForm?.cuotas));
    };


    useEffect(()=> {
        assignValueForm("monto_registrado", parseFloat(onActualizarMontoTotal(valuesForm?.cuotas)).toFixed(2));
    }, [valuesForm?.cuotas]);

    return (
        <ModalRegister 
                modalTitle = { titleModal }
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
                            
                            <Grid item  xs={12} md={4}>
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

                            <Grid item  xs={12} md={4}>
                                <TextField
                                    label="Fecha Registro"
                                    size="small"
                                    margin="dense"
                                    type="date"
                                    fullWidth
                                    InputLabelProps={{shrink: true}}
                                    required
                                    value = {valuesForm?.fecha_registro ?? ""}
                                    onChange={ (e)=>{
                                        assignValueForm("fecha_registro", e.target.value);
                                    }}
                                />
                            </Grid>
                            <Grid item md={12}>
                                <Typography mb={2} component="p" variant="caption">Se asignarán cuotas desde el siguiente mes acorde al fecha de registro.</Typography>
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
                                            <TableCell align="center" >Mes Cuota</TableCell>
                                            <TableCell align="right">
                                                Monto Cuota
                                                <Typography onClick = {handleDistribuirEquitativamente} component="div" className="link" variant="caption">Distribuir equitativamente</Typography>
                                            </TableCell>
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
                                                            <TableCell align="center">
                                                                { item?.fecha_cuota ?? "" }
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
                                    <TableFooter>
                                        <TableRow>
                                            <TableCell colSpan={2}>
                                                <Button 
                                                    size="small" 
                                                    type="button" 
                                                    color="primary" 
                                                    variant="contained" 
                                                    sx={{margin: 1, pl: 3, pr: 3}} endIcon={<MdAdd />} 
                                                    disabled = { !Boolean(valuesForm?.fecha_registro) }
                                                    onClick={handleNuevaCuota}>
                                                Agregar Cuotas(s)
                                                </Button>
                                            </TableCell>
                                            <TableCell align="left">
                                                <TextField 
                                                        size="small"
                                                        margin="dense"
                                                        value={cantidadCuotas}
                                                        sx={{width: 50}}
                                                        onChange={(e)=>{
                                                            if (!Boolean(e.target.value) || e.target.value <= 0){
                                                                setCantidadCuotas("");
                                                                return;
                                                            }
                                                            setCantidadCuotas(e.target.value)
                                                        }}
                                                        />
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography variant="h6">S/{valuesForm?.monto_registrado ?? ""}</Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </Grid>
                            <Grid item  xs={12}>
                                <TextField
                                    label="Motivo del Registro"
                                    size="small"
                                    margin="dense"
                                    type="text"
                                    multiline
                                    rows={2}
                                    fullWidth
                                    InputLabelProps={{shrink: true}}
                                    value = {valuesForm?.motivo ?? ""}
                                    onChange={ (e)=>{
                                        assignValueForm("motivo", e.target.value);
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
        </ModalRegister>
    )
};