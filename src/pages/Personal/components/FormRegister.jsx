import { useEffect, useMemo } from "react";
import {  Button, Card, CardContent, Divider, Grid, IconButton, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Tooltip, Typography } from "@mui/material";
import { MdAdd as AddIcon, MdEdit as EditIcon, MdDelete as DeleteIcon, MdClose as CloseIcon } from "react-icons/md";
import { ModalRegister } from "../../../components";
import { useForm } from "../../../hooks/useForm";
import { usePersonal } from "../hooks/usePersonal";
import { defaultValuesForm } from "../data/defaultValuesForm";
import { useUbigeoDepartamentosBean } from "../../../hooks/useUbigeoDepartamentosBean";
import { useUbigeoProvinciasBean } from "../../../hooks/useUbigeoProvinciasBean";
import { useUbigeoDistritosBean } from "../../../hooks/useUbigeoDistritosBean";
import { usePersonalContrato } from "../hooks/usePersonalContrato";
import useConfirm from "../../../hooks/useConfirm";
import { useEmpresasBean } from "../../../hooks";

export const FormRegister = () => {
    const { openModal, seleccionado, cargandoGuardar, onGuardarRegistro, onCloseModal } = usePersonal();
    const { onLeerModalContrato, onEliminarContrato, onFinalizarContrato } = usePersonalContrato();
    const { valuesForm, assignValueForm, resetValueForm } = useForm({defaultValuesForm});
    const { data : deps, cargando: cargandoDeps } = useUbigeoDepartamentosBean();
    const { data : provs, cargando: cargandoProvs, onListar : onListarProvincias } = useUbigeoProvinciasBean();
    const { data : dists, cargando: cargandoDists, onListar : onListarDistritos } = useUbigeoDistritosBean();
    const { data: empresas, cargando: cargandoEmpresas }  = useEmpresasBean();
    const { confirm } = useConfirm();
    
    const puedoAgregarNuevoContrato = Boolean(!valuesForm?.contratos?.length || valuesForm?.contratos?.find( c => Boolean(c.fechaFin)));

    useEffect(()=>{
        if (Boolean(seleccionado?.id)){
            const { idTipoDocumento,
                    numeroDocumento,
                    codigoUnico,
                    apellidoPaterno,
                    apellidoMaterno,
                    nombres,
                    direccion,
                    fechaNacimientoRaw,
                    distritoUbigeo,
                    pais,
                    id_empresa,
                    numero_orden,
                    contratos } = seleccionado;

            const departamento_ubigeo = distritoUbigeo?.substr(0, 2) ?? "";
            const provincia_ubigeo = distritoUbigeo?.substr(0, 4) ?? "";
            const distrito_ubigeo  = distritoUbigeo ?? "";

            if (departamento_ubigeo != ""){
                onListarProvincias({
                    idDepartamento : departamento_ubigeo
                });

                onListarDistritos({
                    idProvincia : provincia_ubigeo
                });
            }

            resetValueForm({
                id_tipo_documento : idTipoDocumento.substr(0, 1),
                numero_documento : numeroDocumento,
                codigo_unico : codigoUnico,
                apellido_paterno : apellidoPaterno,
                apellido_materno : apellidoMaterno,
                nombres,
                direccion,
                fecha_nacimiento : fechaNacimientoRaw,
                departamento_ubigeo,
                provincia_ubigeo,
                distrito_ubigeo,
                pais,
                contratos,
                id_empresa,
                numero_orden
            });
            return;
        }

        if (Boolean(seleccionado)){
            const { contratos } = seleccionado;

            resetValueForm({
                ...valuesForm,
                contratos
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
        return `${ !Boolean( seleccionado?.id ) ? 'Nuevo' : 'Editando'} Personal`;
    }, [seleccionado]);

    const handleFinalizarContrato = async ({id}) =>{
        const isConfirmed = await confirm({
                title: 'Finalizar Contrato', 
                description: '¿Desea finalizar el contrato seleccionado? Esta acción es irreversible.'
            });
        if (isConfirmed){
            onFinalizarContrato({id});
            return;
        }
    };

    return (
        <ModalRegister 
                modalTitle = {titleModal}
                okButtonText = 'Guardar'
                open = { openModal }
                maxWidth="lg"
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
                        <Typography variant="body2" fontWeight={"bold"} mb={2}>Datos Personales</Typography>
                        <Grid container spacing={2}>
                            <Grid item  xs={12} md={2}>
                                <TextField
                                    label="T. Documento"
                                    size="small"
                                    margin="dense"
                                    type="text"
                                    autoFocus
                                    fullWidth
                                    required
                                    select
                                    value = {valuesForm?.id_tipo_documento ?? "D"}
                                    onChange={ (e)=>{
                                        assignValueForm("id_tipo_documento", e.target.value);
                                    }}
                                >
                                    <MenuItem  value="D">DNI</MenuItem>
                                    <MenuItem  value="C">CE</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item  xs={12} md={2}>
                                <TextField
                                    label="N. Documento"
                                    size="small"
                                    margin="dense"
                                    type="text"
                                    fullWidth
                                    required
                                    value = {valuesForm?.numero_documento ?? ""}
                                    onChange={ (e)=>{
                                        assignValueForm("numero_documento", e.target.value);
                                    }}
                                />
                            </Grid>
                            <Grid item  xs={12} md={2}>
                                <TextField
                                    label="Cód. Único"
                                    size="small"
                                    margin="dense"
                                    type="text"
                                    fullWidth
                                    required
                                    inputProps={ { maxLength: 3 }}
                                    value = {valuesForm?.codigo_unico ?? ""}
                                    onChange={ (e)=>{
                                        assignValueForm("codigo_unico", e.target.value);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    label="Empresa"
                                    size="small"
                                    margin="dense"
                                    select
                                    fullWidth
                                    required
                                    disabled = { cargandoEmpresas }
                                    value = { cargandoEmpresas ? "" : (valuesForm?.id_empresa ?? "")}
                                    onChange={ (e)=>{
                                        assignValueForm("id_empresa", e.target.value);
                                    }}
                                >
                                    <MenuItem value=""><em>Seleccionar</em></MenuItem>
                                    {
                                       empresas?.map( empresa => <MenuItem key={empresa.id} value={empresa.id}>{empresa.descripcion}</MenuItem>)
                                    }
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    label="Nombres"
                                    size="small"
                                    margin="dense"
                                    type="text"
                                    fullWidth
                                    required
                                    value = {valuesForm?.nombres ?? ""}
                                    onChange={ (e)=>{
                                        assignValueForm("nombres", e.target.value);
                                    }}
                                    />
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <TextField
                                    label="Ap. Paterno"
                                    size="small"
                                    margin="dense"
                                    type="text"
                                    fullWidth
                                    required
                                    value = {valuesForm?.apellido_paterno ?? ""}
                                    onChange={ (e)=>{
                                        assignValueForm("apellido_paterno", e.target.value);
                                    }}
                                    />
                            </Grid>

                            <Grid item xs={12} sm={5}>
                                <TextField
                                    label="Ap. Materno"
                                    size="small"
                                    margin="dense"
                                    type="text"
                                    fullWidth
                                    required
                                    value = {valuesForm?.apellido_materno ?? ""}
                                    onChange={ (e)=>{
                                        assignValueForm("apellido_materno", e.target.value);
                                    }}
                                    />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <TextField
                                    label="F. Nacimiento"
                                    size="small"
                                    margin="dense"
                                    type="date"
                                    fullWidth
                                    InputLabelProps={{shrink: true}}
                                    required
                                    value = {valuesForm?.fecha_nacimiento ?? ""}
                                    onChange={ (e)=>{
                                        assignValueForm("fecha_nacimiento", e.target.value);
                                    }}
                                    />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item  xs={12} md={4}>
                                <TextField
                                    label="Dirección"
                                    size="small"
                                    margin="dense"
                                    fullWidth
                                    multiline
                                    rows={3}
                                    value = {valuesForm?.direccion ?? ""}
                                    onChange={ (e)=>{
                                        assignValueForm("direccion", e.target.value);
                                    }}
                                />
                            </Grid>
                            <Grid item  xs={12} md={2}>
                                <TextField
                                    label="Ub. Departamento"
                                    size="small"
                                    margin="dense"
                                    fullWidth
                                    select
                                    disabled = { cargandoDeps }
                                    value = { cargandoDeps ? "" : (valuesForm?.departamento_ubigeo ?? "")}
                                    onChange={ (e)=>{
                                        assignValueForm("departamento_ubigeo", e.target.value);
                                        onListarProvincias({idDepartamento: e.target.value});
                                    }}
                                >
                                    <MenuItem value=""><em>Seleccionar</em></MenuItem>
                                    {
                                       deps?.map( el => <MenuItem key={el.id} value={el.id}>{el.descripcion}</MenuItem>)
                                    }
                                </TextField>
                            </Grid>
                            <Grid item  xs={12} md={3}>
                                <TextField
                                    label="Ub. Provincia"
                                    size="small"
                                    margin="dense"
                                    fullWidth
                                    select
                                    disabled = { cargandoProvs }
                                    value = {valuesForm?.provincia_ubigeo ?? ""}
                                    onChange={ (e)=>{
                                        assignValueForm("provincia_ubigeo", e.target.value);
                                        onListarDistritos({idProvincia: e.target.value});
                                    }}
                                >
                                    <MenuItem value=""><em>Seleccionar</em></MenuItem>
                                    {
                                        provs?.map( el => <MenuItem key={el.id} value={el.id}>{el.descripcion}</MenuItem>)
                                    }
                                </TextField>
                            </Grid>
                            <Grid item  xs={12} md={3}>
                                <TextField
                                    label="Ub. Distrito"
                                    size="small"
                                    margin="dense"
                                    fullWidth
                                    select
                                    disabled = { cargandoDists }
                                    value = {valuesForm?.distrito_ubigeo ?? ""}
                                    onChange={ (e)=>{
                                        assignValueForm("distrito_ubigeo", e.target.value);
                                    }}
                                >
                                    <MenuItem value=""><em>Seleccionar</em></MenuItem>
                                    {
                                        dists?.map( el => <MenuItem key={el.id} value={el.id}>{el.descripcion}</MenuItem>)
                                    }
                                </TextField>
                            </Grid>
                            <Grid item  xs={12} md={2}>
                                <TextField
                                    label="País"
                                    size="small"
                                    margin="dense"
                                    fullWidth
                                    select
                                    required
                                    value = {valuesForm?.pais ?? "PE"}
                                    onChange={ (e)=>{
                                        assignValueForm("pais", e.target.value);
                                    }}
                                >
                                    <MenuItem value=""><em>Seleccionar</em></MenuItem>
                                    <MenuItem value="PE"><em>Perú</em></MenuItem>
                                    <MenuItem value="VE"><em>Venezuela</em></MenuItem>
                                    <MenuItem value="EC"><em>Ecuador</em></MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item  xs={12} md={2}>
                                <TextField
                                    label="N. Orden"
                                    size="small"
                                    margin="dense"
                                    fullWidth
                                    type="number"
                                    required
                                    value = {valuesForm?.numero_orden ?? ""}
                                    onChange={ (e)=>{
                                        assignValueForm("numero_orden", e.target.value);
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                <Divider sx={{mt: 1, mb: 1}} />

                <Grid container spacing={2}>
                    <Grid item sm={12}>
                        <Card >
                            <CardContent margin={1}>
                                <Paper  sx={{ width: '100%', mb: 2 }}>
                                    <Toolbar  sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 }}}>
                                        <Typography
                                            sx={{ flex: '1 1 100%' }}
                                            color="inherit"
                                            variant="subtitle1"
                                            fontWeight={"bold"}
                                            component="div"
                                            >
                                           Contratos
                                        </Typography>
                                        <Tooltip title="NUEVO CONTRATO">
                                            <Button 
                                                sx={{mr: 1, pr: 3, pl: 3}}
                                                color="primary"
                                                variant="contained"
                                                onClick={(e)=>{
                                                if (!puedoAgregarNuevoContrato){
                                                    alert("Este colaborador ya tiene un contrato ACTIVO.")
                                                    return;
                                                }
                                                onLeerModalContrato({id : null});
                                            }} startIcon= {<AddIcon />}>
                                                NUEVO
                                            </Button>
                                        </Tooltip>
                                        <Tooltip title="FINALIZAR CONTRATO">
                                            <Button 
                                                color="error"
                                                variant="contained"
                                                sx = {{pr: 3, pl: 3}}
                                                onClick={(e)=>{
                                                    const contrato = valuesForm?.contratos?.find( c => !Boolean(c.fechaFin));
                                                    if (!contrato){
                                                        alert("No hay contratos para finalizar");
                                                        return;
                                                    }
                                                    handleFinalizarContrato(contrato);
                                                }} 
                                                startIcon= {<CloseIcon />}>
                                                FINALIZAR
                                            </Button>
                                        </Tooltip>
                                    </Toolbar>
                                    <TableContainer>
                                        <Table size="small">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell sx={{fontWeight: 'bold'}}>OPC</TableCell>
                                                    <TableCell sx={{fontWeight: 'bold'}}>F. Inicio</TableCell>
                                                    <TableCell sx={{fontWeight: 'bold'}}>F. Fin</TableCell>
                                                    <TableCell sx={{fontWeight: 'bold'}}>Salario</TableCell>
                                                    <TableCell sx={{fontWeight: 'bold'}}>Días Trabajo</TableCell>
                                                    <TableCell sx={{fontWeight: 'bold'}}>Horas Día</TableCell>
                                                    <TableCell sx={{fontWeight: 'bold'}}>Costo Día</TableCell>
                                                    <TableCell sx={{fontWeight: 'bold'}}>Costo Hora</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    valuesForm?.contratos.length
                                                    ?  valuesForm?.contratos?.map( contrato => {
                                                            return <TableRow key={contrato.id}>
                                                                <TableCell width={70}>
                                                                    <IconButton title="Editar" size="small" onClick={()=>{
                                                                        onLeerModalContrato({id : contrato.id});
                                                                    }}>
                                                                        <EditIcon color="orange"/>
                                                                    </IconButton>
                                                                    <IconButton title="Eliminar" size="small" onClick={()=>{
                                                                        onEliminarContrato({id : contrato.id});
                                                                    }}>
                                                                        <DeleteIcon color="red"/>
                                                                    </IconButton>
                                                                </TableCell>
                                                                <TableCell>{contrato.fechaInicio}</TableCell>
                                                                <TableCell>{contrato.fechaFin ?? "-"}</TableCell>
                                                                <TableCell align="right">S/ {contrato.salario}</TableCell>
                                                                <TableCell align="right">{contrato.diasTrabajo}</TableCell>
                                                                <TableCell align="right">{contrato.horasDia}</TableCell>
                                                                <TableCell align="right">S/ {contrato.costoDia}</TableCell>
                                                                <TableCell align="right">S/ {contrato.costoHora}</TableCell>
                                                            </TableRow>
                                                        })
                                                    :   <TableRow>
                                                        <TableCell colSpan={99} align="center"> Sin registros </TableCell>
                                                    </TableRow>
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Paper>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
        </ModalRegister>
    )
}