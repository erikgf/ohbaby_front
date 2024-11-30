import { Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import { ModalRegister } from "../../../components";
import { useState } from "react";
import { getHoy } from "../../../assets/utils";

const modalTitle = "Finalizar Contrato";

export const ModalFinalizarContrato = ({isOpenModal = false, seleccionado, closeModal, handleFinalizarContrato }) => {
    const [fechaFinalizacion, setFechaFinalizacion] = useState(getHoy());
    const [observacionFinalizacion, setObservacionFinalizacion] = useState("");

    return <ModalRegister
                modalTitle = {modalTitle }
                okButtonText = 'FINALIZAR'
                open = { isOpenModal }
                maxWidth="sm"
                handleModalClose = {()=>{
                    closeModal();
                }}
                onSubmit = { (e)=>{
                    e.preventDefault();
                    handleFinalizarContrato({
                        fechaFinalizacion,
                        observacionFinalizacion
                    });
                }}
            >
            <Card>
                <CardContent>
                    <Typography component="p" mb={3} variant="body">Empleado: {seleccionado?.nombres}, {seleccionado?.apellidoPaterno} {seleccionado?.apellidoMaterno}</Typography>
                    <Grid container spacing={2}>
                        <Grid item sm={6} md={4}>
                            <TextField
                                label="F. Finalización"
                                size="small"
                                margin="dense"
                                type="date"
                                autoFocus
                                InputLabelProps={ { shrink : true }}
                                required
                                fullWidth
                                value = {fechaFinalizacion ?? ""}
                                onChange={ (e)=>{
                                    setFechaFinalizacion(e.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item sm={12} md={8}>
                            <TextField
                                label="Observación Finalización"
                                size="small"
                                margin="dense"
                                multiline
                                fullWidth
                                rows={4}
                                required
                                value = {observacionFinalizacion ?? ""}
                                onChange={ (e)=>{
                                    setObservacionFinalizacion(e.target.value);
                                }}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
    </ModalRegister>
};