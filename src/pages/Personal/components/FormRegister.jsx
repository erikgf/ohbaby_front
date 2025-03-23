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
import { ModalFinalizarContrato } from "./ModalFinalizarContrato";
import { useState } from "react";
import mensajes from "../../../data/mensajes";

export const FormRegister = () => {
    const { openModal, seleccionado, cargandoGuardar, onGuardarRegistro, onCloseModal } = usePersonal();
    const { onLeerModalContrato, onEliminarContrato, onFinalizarContrato } = usePersonalContrato();
    const { valuesForm, assignValueForm, resetValueForm } = useForm({defaultValuesForm});
    const { data : deps, cargando: cargandoDeps } = useUbigeoDepartamentosBean();
    const { data : provs, cargando: cargandoProvs, onListar : onListarProvincias } = useUbigeoProvinciasBean();
    const { data : dists, cargando: cargandoDists, onListar : onListarDistritos } = useUbigeoDistritosBean();
    const { data: empresas, cargando: cargandoEmpresas }  = useEmpresasBean();
    const [isFinalizandoContrato, setIsFinalizandoContrato] = useState(false);
    const { confirm } = useConfirm();
    
    
    const titleModal = useMemo(()=>{
        return `${ !Boolean( seleccionado?.id ) ? 'Nuevo' : 'Editando'} Personal`;
    }, [seleccionado]);

    const puedoAgregarNuevoContrato = Boolean(valuesForm?.contratos?.filter( c => !Boolean(c.fechaFin))?.length < 1) || (valuesForm?.contratos?.length <= 0);
    const existeContratoValido = valuesForm?.contratos?.find( c => !Boolean(c.fechaFin));
    
    const handleFinalizarContrato = async ( { fechaFinalizacion, observacionFinalizacion } ) =>{
        const { id } = existeContratoValido;
        const isConfirmed = await confirm({
                title: mensajes.ROTULO_FINALIZAR_CONTRATO, 
                description: mensajes.ESTA_SEGURO_FINALIZAR_CONTRATO 
            });

        if (isConfirmed){
            onFinalizarContrato({id, fechaCese: fechaFinalizacion, razonCese: observacionFinalizacion});
            return;
        }
    };

    const handleChangeForm = (e) => {
        assignValueForm(e.target.name, e.target.value)
    };

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
                    fechaIngresoRaw,
                    distritoUbigeo,
                    pais,
                    id_empresa,
                    numero_orden,
                    contratos,
                    celular,
                    sexo,
                    estadoCivil,
                    puesto,
                    telefonoReferencia,
                    nombreFamiliar } = seleccionado;

            const departamento_ubigeo = distritoUbigeo?.substr(0, 2) ?? "";
            const provincia_ubigeo = distritoUbigeo?.substr(0, 4) ?? "";
            const distrito_ubigeo  = distritoUbigeo ?? "";

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
                numero_orden,
                celular,
                sexo,
                estado_civil : estadoCivil,
                puesto,
                telefono_referencia : telefonoReferencia,
                nombre_familiar : nombreFamiliar,
                fecha_ingreso : fechaIngresoRaw
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

    useEffect(()=>{
        if (valuesForm?.departamento_ubigeo != ""){
            onListarProvincias({ idDepartamento: valuesForm?.departamento_ubigeo});
        }
    }, [valuesForm?.departamento_ubigeo]);

    useEffect(()=>{
        if (valuesForm?.provincia_ubigeo != ""){
            onListarDistritos({ idProvincia: valuesForm?.provincia_ubigeo});
        }
    }, [valuesForm?.provincia_ubigeo]);


    return ( <>
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
                                    name = "id_tipo_documento"
                                    select
                                    value = {valuesForm?.id_tipo_documento ?? "D"}
                                    onChange={ handleChangeForm }
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
                                    name ="numero_documento"
                                    value = {valuesForm?.numero_documento ?? ""}
                                    onChange={ handleChangeForm }
                                />
                            </Grid>
                            <Grid item  xs={12} md={2}>
                                <TextField
                                    label="Cód. Único"
                                    size="small"
                                    margin="dense"
                                    type="text"
                                    fullWidth
                                    inputProps={ { maxLength: 3, readOnly: true }}
                                    value = {valuesForm?.codigo_unico ?? ""}
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
                                    name = "id_empresa"
                                    onChange={ handleChangeForm }
                                >
                                    <MenuItem value=""><em>Seleccionar</em></MenuItem>
                                    {
                                       empresas?.map( empresa => <MenuItem key={empresa.id} value={empresa.id}>{empresa.descripcion}</MenuItem>)
                                    }
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
                                    inputProps={ { maxLength: 3, readOnly: true }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Nombres"
                                    size="small"
                                    margin="dense"
                                    type="text"
                                    fullWidth
                                    required
                                    value = {valuesForm?.nombres ?? ""}
                                    name = "nombres"
                                    onChange={ handleChangeForm }
                                    />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    label="Ap. Paterno"
                                    size="small"
                                    margin="dense"
                                    type="text"
                                    fullWidth
                                    required
                                    value = {valuesForm?.apellido_paterno ?? ""}
                                    name="apellido_paterno"
                                    onChange={ handleChangeForm }
                                    />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    label="Ap. Materno"
                                    size="small"
                                    margin="dense"
                                    type="text"
                                    fullWidth
                                    required
                                    value = {valuesForm?.apellido_materno ?? ""}
                                    name = "apellido_materno"
                                    onChange={ handleChangeForm }
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
                                    name="fecha_nacimiento"
                                    value = {valuesForm?.fecha_nacimiento ?? ""}
                                    onChange={ handleChangeForm }
                                    />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <TextField
                                    label="Celular"
                                    size="small"
                                    margin="dense"
                                    type="tel"
                                    fullWidth
                                    value = {valuesForm?.celular ?? ""}
                                    name="celular"
                                    onChange={ handleChangeForm }
                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <TextField
                                    label="Sexo"
                                    size="small"
                                    margin="dense"
                                    select
                                    fullWidth
                                    required
                                    value = {valuesForm?.sexo ?? ""}
                                    name="sexo"
                                    onChange={ handleChangeForm }
                                >
                                    <MenuItem value="" disabled><em>Seleccionar</em></MenuItem>
                                    <MenuItem value="M">Masculino</MenuItem>
                                    <MenuItem value="F">Femenino</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <TextField
                                    label="Est. Civil"
                                    size="small"
                                    margin="dense"
                                    select
                                    fullWidth
                                    required
                                    value = {valuesForm?.estado_civil ?? ""}
                                    name="estado_civil"
                                    onChange={ handleChangeForm }
                                >
                                    <MenuItem value="" disabled><em>Seleccionar</em></MenuItem>
                                    <MenuItem value="S">Soltero</MenuItem>
                                    <MenuItem value="C">Casado</MenuItem>
                                    <MenuItem value="D">Divorciado</MenuItem>
                                    <MenuItem value="V">Viudo</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    label="Puesto"
                                    size="small"
                                    margin="dense"
                                    type="text"
                                    fullWidth
                                    required
                                    name="puesto"
                                    value = {valuesForm?.puesto ?? ""}
                                    onChange={ handleChangeForm }
                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <TextField
                                    label="Fecha Ingreso"
                                    size="small"
                                    margin="dense"
                                    type="date"
                                    fullWidth
                                    required
                                    InputLabelProps={{shrink: true}}
                                    value = {valuesForm?.fecha_ingreso ?? ""}
                                    name="fecha_ingreso"
                                    onChange={ handleChangeForm}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={2}>
                                <TextField
                                    label="Telf. Ref."
                                    size="small"
                                    margin="dense"
                                    type="tel"
                                    fullWidth
                                    value = {valuesForm?.telefono_referencia ?? ""}
                                    name="telefono_referencia"
                                    onChange={ handleChangeForm }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Nombre del Familiar"
                                    size="small"
                                    margin="dense"
                                    type="text"
                                    fullWidth
                                    value = {valuesForm?.nombre_familiar ?? ""}
                                    name="nombre_familiar"
                                    onChange={ handleChangeForm}
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
                                    name="direccion"
                                    onChange={ handleChangeForm}
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
                                    name="departamento_ubigeo"
                                    onChange={ handleChangeForm}
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
                                    name="provincia_ubigeo"
                                    onChange={ handleChangeForm}
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
                                    name="distrito_ubigeo"
                                    onChange={ handleChangeForm}
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
                                    name="pais"
                                    onChange={ handleChangeForm}
                                >
                                    <MenuItem value=""><em>Seleccionar</em></MenuItem>
                                    <MenuItem value="PE"><em>Perú</em></MenuItem>
                                    <MenuItem value="VE"><em>Venezuela</em></MenuItem>
                                    <MenuItem value="EC"><em>Ecuador</em></MenuItem>
                                </TextField>
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
                                        <Tooltip title={"FINALIZAR"}>
                                            <span>
                                                <Button 
                                                    color="error"
                                                    variant="contained"
                                                    sx = {{pr: 3, pl: 3}}
                                                    disabled = { !existeContratoValido || !Boolean(seleccionado?.id) }
                                                    onClick={(e)=>{
                                                        setIsFinalizandoContrato(true);
                                                    }} 
                                                    startIcon= {<CloseIcon />}>
                                                    FINALIZAR
                                                </Button>
                                            </span>
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
                                                    <TableCell sx={{fontWeight: 'bold'}}>Horas Semana</TableCell>
                                                    <TableCell sx={{fontWeight: 'bold'}}>Costo Hora</TableCell>
                                                    <TableCell sx={{fontWeight: 'bold'}}>Dscto. Planilla</TableCell>
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
                                                                <TableCell title={contrato.observacionesFinContrato ?? "Sin observaciones."}>{contrato.fechaFin ?? "-"}</TableCell>
                                                                <TableCell align="right">S/ {contrato.salario}</TableCell>
                                                                <TableCell align="right">{contrato.diasTrabajo}</TableCell>
                                                                <TableCell align="right">{contrato.horasSemana}</TableCell>
                                                                <TableCell align="right">S/ {contrato.costoHora}</TableCell>
                                                                <TableCell align="right">S/ {parseFloat(contrato?.descuentoPlanilla).toFixed(2) || "0.00"}</TableCell>
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
        <ModalFinalizarContrato 
                isOpenModal = {isFinalizandoContrato && existeContratoValido} 
                seleccionado = { seleccionado }
                closeModal = {()=> setIsFinalizandoContrato(false)}
                handleFinalizarContrato = {handleFinalizarContrato} />
    </>
    )
}