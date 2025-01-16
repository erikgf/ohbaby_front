import { Box, Card, CardContent, CardHeader, Divider, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { ModalRegister } from "../../../components";
import { useForm } from "../../../hooks/useForm";
import { useEffect, useState } from "react";
import { usePersonalContrato } from "../hooks/usePersonalContrato";
import { recalcularCostosDiaHora } from "../data/recalcularCostosDiaHora";
import { AutocompleteOnline } from "../../../components/AutocompleteOnline/AutocompleteOnline";
import { useBuscarPersonalComparacion } from "../hooks/useBuscarPersonalComparacion";
import { PersonalCompara } from "./PersonalCompara";
import { useHorariosBean } from "../../../hooks";
import Constantes from "../../../data/constantes";

const modalTitle = "Agregar Contrato", modalTitleEditar = "Editar Contrato";

const defaultValuesForm = {
    id: null,
    fechaInicio: "",
    descuentoPlanilla: "0.000",
    idHorario : null,
    salario : "0.000",
    horasSemana: "0",
    diasTrabajo : Constantes.DIAS_TRABAJO_MENSUAL,
    horasDia: "0",
    costoDia: "0.000",
    costoHora: "0.000"
};

export const ModalRegistroContratos = () => {
    const { openModalContrato, contrato, onCerrarContrato, onAgregarContrato, onModificarContrato } = usePersonalContrato();
    const { data: listaHorarios } = useHorariosBean();
    const [ personalCompara, setPersonalCompara ] = useState(null);
    const { data : listaPersonalCompara, loading: cargandoPersonalCompara, setSearchTerm : setBuscarTermPersonalCompara } = useBuscarPersonalComparacion();
    const { valuesForm, assignValueForm, resetValueForm } = useForm({defaultValuesForm});

    useEffect(()=>{
        if (Boolean(contrato?.id)){
            const { id, fechaInicio, descuentoPlanilla, salario, diasTrabajo, horasSemana, idHorario } = contrato;
            //const [{id: idHorario}] = contrato.horarios;
            const { horasDia, costoDia, costoHora } = recalcularCostosDiaHora( salario, diasTrabajo, horasSemana);

            resetValueForm({
                id,
                fechaInicio,
                descuentoPlanilla,
                salario,
                idHorario,
                diasTrabajo,
                horasSemana,
                horasDia,
                costoDia,
                costoHora
            });
            return;
        }
    }, [contrato]);

    useEffect(()=>{
        if (!Boolean(valuesForm?.idHorario )){
            return;
        }

        const horario = listaHorarios?.find( item => item.id === valuesForm?.idHorario);
        assignValueForm("horasSemana", horario?.total_horas_semana);
    }, [valuesForm?.idHorario]);

    useEffect(()=>{
        if (openModalContrato === false){
            resetValueForm();
        }
    }, [openModalContrato]);

    useEffect(()=>{
        return setPersonalCompara(null);
    }, []);
    
    return <ModalRegister
                modalTitle = { !Boolean(contrato?.id) ? modalTitle : modalTitleEditar}
                okButtonText = 'Guardar'
                open = { openModalContrato }
                maxWidth="md"
                handleModalClose = {()=>{
                    onCerrarContrato();
                }}
                onSubmit = { (e)=>{
                    e.preventDefault();
                    if (Boolean(valuesForm?.id)){
                        onModificarContrato(valuesForm);
                    } else {
                        onAgregarContrato(valuesForm);
                    }
                }}
            >
            <Card>
                <CardHeader sx={{pb: 0}} title="Buscar trabajador" titleTypographyProps={{variant: "body1"}} />
                <CardContent>
                    <Grid container spacing={2} pb={2}>
                        <Grid item xs={12}>
                            <AutocompleteOnline
                                    value = { personalCompara }
                                    setValue = { setPersonalCompara }
                                    loadingItems = { cargandoPersonalCompara }
                                    items = { listaPersonalCompara }
                                    setBuscarItemTerm={ setBuscarTermPersonalCompara }
                                    label = {"Buscar personal para comparar"}
                                />
                        </Grid>
                    </Grid>
                    {
                        personalCompara &&
                            <PersonalCompara personal={personalCompara}/>
                    }
                </CardContent>
            </Card>
            <Divider sx={{mb: 2}} />
            <Grid container spacing={2}>
                <Grid item  xs={12} md={3}>
                    <TextField
                        label="F. Inicio"
                        size="small"
                        margin="dense"
                        type="date"
                        autoFocus
                        fullWidth
                        InputLabelProps={{ shrink : true }}
                        required
                        value = {valuesForm?.fechaInicio ?? ""}
                        onChange={ (e)=>{
                            assignValueForm("fechaInicio", e.target.value);
                        }}
                    />
                </Grid>
                <Grid item  xs={12} md={2}>
                    <TextField
                        label="Descuento Planilla"
                        size="small"
                        margin="dense"
                        type="number"
                        autoFocus
                        fullWidth
                        value = {valuesForm?.descuentoPlanilla ?? "0.0000"}
                        onFocus={(e)=>e.target.select()}
                        onChange={ (e)=>{
                            assignValueForm("descuentoPlanilla", e.target.value === "" ? "0.0000" : e.target.value );
                        }}
                    />
                </Grid>
                <Grid item  xs={12} md={6}>
                    <TextField
                        label="Horarios"
                        size="small"
                        margin="dense"
                        fullWidth
                        select
                        required
                        value = {valuesForm?.idHorario ?? ""}
                        onChange={ (e)=>{
                            assignValueForm("idHorario", e.target.value);
                        }}
                    >
                        <MenuItem value="" disabled><em>Seleccionar horario</em></MenuItem>
                        {
                            listaHorarios?.map( item  => {
                                return <MenuItem key={item.id} value={item.id}>
                                            <Box>
                                            <Typography fontWeight="bold" variant="body1">{item.descripcion}</Typography>
                                            {
                                                item?.detalles?.map( (_item, index)  => {
                                                    return <Typography key={_item.id} variant={"body2"}>{index + 1 }) {_item.dias.map( _ => _.descripcion).join(",")} | {_item?.horaInicio} - {_item?.horaFin}</Typography>
                                                })
                                            }
                                            </Box>
                                        </MenuItem>
                            })
                        }
                    </TextField>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item  xs={12} md={2}>
                    <TextField
                            label="Salario"
                            size="small"
                            margin="dense"
                            type="number"
                            fullWidth
                            required
                            value = {valuesForm?.salario ?? "0.000"}
                            onChange={ (e)=>{
                                const salario = e.target.value ?? "0";
                                const { horasDia, costoDia, costoHora } = recalcularCostosDiaHora( 
                                        salario,
                                        valuesForm?.diasTrabajo, 
                                        valuesForm?.horasSemana);

                                resetValueForm({
                                    ...valuesForm, 
                                    salario,
                                    horasDia,
                                    costoDia,
                                    costoHora
                                });
                            }}
                        />
                </Grid>
                <Grid item  xs={12} md={2}>
                    <TextField
                        label="Días Trabajo"
                        size="small"
                        margin="dense"
                        type="number"
                        fullWidth
                        required
                        value = {valuesForm?.diasTrabajo ?? "0"}
                        inputProps={
                            {readOnly: true}
                        }
                    />
                </Grid>
                <Grid item  xs={12} md={2}>
                    <TextField
                        label="Horas Semana"
                        size="small"
                        margin="dense"
                        type="number"
                        fullWidth
                        required
                        value = {valuesForm?.horasSemana ?? "0.000"}
                        inputProps={
                            {readOnly: true}
                        }
                    />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <TextField
                        label="Horas al Día"
                        size="small"
                        margin="dense"
                        type="text"
                        fullWidth
                        required
                        value = {valuesForm?.horasDia ?? "0"}
                        inputProps={
                            {readOnly: true}
                        }
                        />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <TextField
                        label="Costo Día"
                        size="small"
                        margin="dense"
                        type="text"
                        fullWidth
                        inputProps={
                            {readOnly: true}
                        }
                        value = {valuesForm?.costoDia ?? "0.000"}
                        />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <TextField
                        label="Costo Hora"
                        size="small"
                        margin="dense"
                        type="text"
                        fullWidth
                        inputProps={
                            {readOnly: true}
                        }
                        value = {valuesForm?.costoHora ?? "0.000"}
                        />
                </Grid>
            </Grid>
    </ModalRegister>
};