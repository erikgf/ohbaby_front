import { Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import { ModalRegister } from "../../../components";
import { useState } from "react";
import { getHoy } from "../../../assets/utils";

const modalTitle = "Finalizar Contrato";

export const ModalFinalizarContrato = ({isOpenModal = false, seleccionado, closeModal, handleFinalizarContrato }) => {
    const [fechaFinalizacion, setFechaFinalizacion] = useState(getHoy());

    return <ModalRegister
                modalTitle = {modalTitle }
                okButtonText = 'FINALIZAR'
                open = { isOpenModal }
                maxWidth="xs"
                handleModalClose = {()=>{
                    closeModal();
                }}
                onSubmit = { (e)=>{
                    e.preventDefault();
                    handleFinalizarContrato(fechaFinalizacion);
                }}
            >
            <Card>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item  xs={12} md={12}>
                            <Typography component="p" mb={3} variant="body">Empleado: {seleccionado?.nombres}, {seleccionado?.apellidoPaterno} {seleccionado?.apellidoMaterno}</Typography>
                            <TextField
                                label="F. Finalización"
                                size="small"
                                margin="dense"
                                type="date"
                                autoFocus
                                InputLabelProps={ { shrink : true }}
                                required
                                value = {fechaFinalizacion ?? ""}
                                onChange={ (e)=>{
                                    setFechaFinalizacion(e.target.value);
                                }}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
    </ModalRegister>
};