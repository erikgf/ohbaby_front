import { Card, CardContent, CardHeader, Divider, Grid, TextField, Typography } from "@mui/material";
import { ModalRegister } from "../../../components";
import { useForm } from "../../../hooks/useForm";
import { useEffect, useState } from "react";
import { usePersonalContrato } from "../hooks/usePersonalContrato";
import { recalcularCostosDiaHora } from "../data/recalcularCostosDiaHora";
import { AutocompleteOnline } from "../../../components/AutocompleteOnline/AutocompleteOnline";
import { useBuscarPersonalComparacion } from "../hooks/useBuscarPersonalComparacion";
import { PersonalCompara } from "./PersonalCompara";

const modalTitle = "Agregar Contrato", modalTitleEditar = "Editar Contrato";


export const ModalRegistroContratos = () => {
    const { openModalContrato, contrato, onCerrarContrato, onAgregarContrato, onModificarContrato } = usePersonalContrato();
    const [ personalCompara, setPersonalCompara ] = useState(null);
    const { data : listaPersonalCompara, loading: cargandoPersonalCompara, setSearchTerm : setBuscarTermPersonalCompara } = useBuscarPersonalComparacion();
    const { valuesForm, assignValueForm, resetValueForm } = useForm({
        id: null,
        fechaInicio: "",
        salario : "0.00",
        diasTrabajo : "0",
        horasDia: "0",
        costoDia: "0.00",
        costoHora: "0.00"
    });

    useEffect(()=>{
        if (Boolean(contrato)){
            const { id, fechaInicio, salario, diasTrabajo, horasDia } = contrato;
            const { costoDia, costoHora } = recalcularCostosDiaHora( salario, diasTrabajo, horasDia);

            resetValueForm({
                id,
                fechaInicio,
                salario,
                diasTrabajo,
                horasDia,
                costoDia,
                costoHora
            });
            return;
        }
    }, [contrato]);

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
                maxWidth="sm"
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
                <Grid item  xs={12} md={4}>
                    <TextField
                        label="F. Inicio"
                        size="small"
                        margin="dense"
                        type="date"
                        autoFocus
                        fullWidth
                        InputLabelProps={ { shrink : true }}
                        required
                        value = {valuesForm?.fechaInicio ?? ""}
                        onChange={ (e)=>{
                            assignValueForm("fechaInicio", e.target.value);
                        }}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item  xs={12} md={3}>
                    <TextField
                            label="Salario"
                            size="small"
                            margin="dense"
                            type="number"
                            fullWidth
                            required
                            value = {valuesForm?.salario ?? "0.00"}
                            onChange={ (e)=>{
                                const salario = e.target.value ?? "0";
                                const { costoDia, costoHora } = recalcularCostosDiaHora( 
                                        salario,
                                        valuesForm?.diasTrabajo, 
                                        valuesForm?.horasDia);

                                resetValueForm({
                                    ...valuesForm, 
                                    salario,
                                    costoDia,
                                    costoHora
                                });
                            }}
                        />
                </Grid>
                <Grid item  xs={12} md={3}>
                    <TextField
                        label="Días Trabajo"
                        size="small"
                        margin="dense"
                        type="number"
                        fullWidth
                        required
                        value = {valuesForm?.diasTrabajo ?? "0"}
                        onChange={ (e)=>{
                            const diasTrabajo = e.target.value ?? "0";
                            const { costoDia, costoHora } = recalcularCostosDiaHora( 
                                    valuesForm?.salario,
                                    diasTrabajo, 
                                    valuesForm?.horasDia);

                            resetValueForm({
                                ...valuesForm, 
                                diasTrabajo,
                                costoDia,
                                costoHora
                            });
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        label="Horas al Día"
                        size="small"
                        margin="dense"
                        type="text"
                        fullWidth
                        required
                        value = {valuesForm?.horasDia ?? "0"}
                        onChange={ (e)=>{
                            const horasDia = e.target.value ?? "0";
                            const { costoDia, costoHora } = recalcularCostosDiaHora( 
                                    valuesForm?.salario,
                                    valuesForm?.diasTrabajo, 
                                    horasDia);

                            resetValueForm({
                                ...valuesForm, 
                                horasDia,
                                costoDia,
                                costoHora
                            });
                        }}
                        />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                    <TextField
                        label="Costo Día"
                        size="small"
                        margin="dense"
                        type="text"
                        fullWidth
                        InputProps={{
                            style: {
                                backgroundColor: '#b8b8b8de'
                            }
                        }}
                        inputProps={
                            {readOnly: true}
                        }
                        value = {valuesForm?.costoDia ?? "0.00"}
                        />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        label="Costo Hora"
                        size="small"
                        margin="dense"
                        type="text"
                        fullWidth
                        InputProps={{
                            style: {
                                backgroundColor: '#b8b8b8de'
                            }
                        }}
                        inputProps={
                            {readOnly: true}
                        }
                        value = {valuesForm?.costoHora ?? "0.00"}
                        />
                </Grid>
            </Grid>
    </ModalRegister>
};