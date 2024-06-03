import { Checkbox, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import { ModalRegister } from "../../../components";
import { useForm } from "../../../hooks/useForm";
import { useEffect } from "react";
import { useHorarioDetalle } from "../hooks/useHorarioDetalle";

const modalTitle = "Agregar Detalle", modalTitleEditar = "Editar Detalle";

export const ModalRegistroDetalles = () => {
    const { openModalDetalle, detalle, onCerrarDetalle, onAgregarDetalle, onModificarDetalle } = useHorarioDetalle();
    const { valuesForm, assignValueForm, resetValueForm } = useForm({
        id: null,
        horaInicio: "",
        horaFin : "",
        dias : [
            { id: 1, descripcion: "Lunes", checked: false},
            { id: 2, descripcion: "Martes", checked: false},
            { id: 3, descripcion: "Miércoles", checked: false},
            { id: 4, descripcion: "Jueves", checked: false},
            { id: 5, descripcion: "Viernes", checked: false},
            { id: 6, descripcion: "Sábado", checked: false},
        ]
    });

    useEffect(()=>{
        if (Boolean(detalle)){
            const { id, horaInicio, horaFin, dias } = detalle;

            resetValueForm({
                id,
                horaInicio,
                horaFin,
                dias
            });
            return;
        }
    }, [detalle]);

    useEffect(()=>{
        if (openModalDetalle === false){
            resetValueForm();
        }
    }, [openModalDetalle]);

    return <ModalRegister
                modalTitle = { !Boolean(detalle?.id) ? modalTitle : modalTitleEditar}
                okButtonText = 'Guardar'
                open = { openModalDetalle }
                maxWidth="sm"
                handleModalClose = {()=>{
                    onCerrarDetalle();
                }}
                onSubmit = { (e)=>{
                    e.preventDefault();

                    if (Boolean(valuesForm?.id)){
                        onModificarDetalle(valuesForm);
                    } else {
                        onAgregarDetalle(valuesForm);
                    }
                    
                }}
            >
            <Grid container spacing={2} mb={1}>
                <Grid item  xs={12} md={4}>
                    <TextField
                        label="H. Inicio"
                        size="small"
                        margin="dense"
                        type="time"
                        autoFocus
                        fullWidth
                        InputLabelProps={ { shrink : true }}
                        required
                        value = {valuesForm?.horaInicio ?? ""}
                        onChange={ (e)=>{
                            assignValueForm("horaInicio", e.target.value);
                        }}
                    />
                </Grid>
                <Grid item  xs={12} md={4}>
                    <TextField
                        label="H. Fin"
                        size="small"
                        margin="dense"
                        type="time"
                        autoFocus
                        fullWidth
                        InputLabelProps={ { shrink : true }}
                        required
                        value = {valuesForm?.horaFin ?? ""}
                        onChange={ (e)=>{
                            assignValueForm("horaFin", e.target.value);
                        }}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="body2" fontWeight={"bold"}>Días asociados</Typography>
                    {
                        valuesForm?.dias.map( ({id,descripcion,checked}) => {
                            return <FormControlLabel key={id} control={<Checkbox value={id} checked={checked}
                                        onChange={ (e)=>{
                                            assignValueForm("dias", valuesForm.dias.map( dia  => {
                                                if (dia.id == id){
                                                    return {
                                                        ...dia,
                                                        checked: !dia.checked
                                                    }
                                                }

                                                return dia;
                                            }));
                                        }}/>} label={descripcion} />
                        })
                    }
                </Grid>
            </Grid>
    </ModalRegister>
};