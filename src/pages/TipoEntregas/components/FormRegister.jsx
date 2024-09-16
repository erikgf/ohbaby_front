import { useEffect, useMemo } from "react";
import { ModalRegister } from "../../../components";
import { Card, CardContent, Grid, MenuItem, TextField } from "@mui/material";
import { useForm } from "../../../hooks";
import { useTipoEntregas } from "../hooks/useTipoEntregas";

export const FormRegister = () => {
    const { openModal, seleccionado, cargandoGuardar, defaultValuesForm, onGuardarRegistro, onCloseModal } = useTipoEntregas()
    const { valuesForm, assignValueForm, resetValueForm } = useForm({defaultValuesForm});

    useEffect(()=>{
        if (Boolean(seleccionado?.id)){
            const { tipo, descripcion } = seleccionado;

            resetValueForm({
                tipo,
                descripcion
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
        return `${ !Boolean( seleccionado?.id ) ? 'Nueva' : 'Editando'} Tipo de Entrega`;
    }, [seleccionado]);

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
                            <Grid item  xs={12} md={8}>
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
                                        assignValueForm("descripcion", e.target.value.toUpperCase());
                                    }}
                                />
                            </Grid>
                            <Grid item  xs={12} md={4}>
                                <TextField
                                    label="Tipo"
                                    size="small"
                                    margin="dense"
                                    type="text"
                                    fullWidth
                                    select
                                    required
                                    value = {valuesForm?.tipo ?? ""}
                                    onChange={ (e)=>{
                                        assignValueForm("tipo", e.target.value);
                                    }}
                                >
                                    <MenuItem value=""><em>Seleccionar</em></MenuItem>
                                    <MenuItem value={"D"}>DESCUENTO</MenuItem>
                                    <MenuItem value={"A"}>ADELANTO</MenuItem>
                                </TextField>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
        </ModalRegister>
    )
};