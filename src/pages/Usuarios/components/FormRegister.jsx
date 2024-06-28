import { useEffect, useMemo } from "react";
import { Divider, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { defaultValuesForm } from "../data/defaultValuesForm";
import { useForm } from "../../../hooks/useForm";
import { ModalRegister } from "../../../components";
import { useUsuario } from "../hooks/useUsuario";

export const FormRegister = () => {
    const { openModal, seleccionado, cargandoGuardar, onGuardarRegistro, onCloseModal} = useUsuario();
    const { valuesForm, assignValueForm, resetValueForm } = useForm({defaultValuesForm});
    const editandoRegistro = Boolean(seleccionado);

    useEffect(()=>{
        if (editandoRegistro){
            const { name, username, id_rol, estado_acceso } = seleccionado;
            resetValueForm({
                name, username, id_rol, estado_acceso
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
        return `${ !editandoRegistro  ? 'Nuevo' : 'Editando'} Usuario`;
    }, [seleccionado]);

    return (
            <ModalRegister 
                    modalTitle = {titleModal}
                    okButtonText = 'Guardar'
                    open = { openModal }
                    handleModalClose = {()=>{
                        onCloseModal();
                    }}
                    onSubmit = { (e)=>{
                        e.preventDefault();
                        onGuardarRegistro(
                            valuesForm
                        );
                    }}
                    submitLoading={cargandoGuardar}
                >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            label="Nombres y Apellidos"
                            size="small"
                            margin="dense"
                            type="text"
                            autoComplete="off"
                            fullWidth
                            required
                            value = {valuesForm?.name ?? ""}
                            onChange={ (e)=>{
                                assignValueForm("name", e.target.value);
                            }}
                            />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Rol"
                            size="small"
                            select
                            margin="dense"
                            fullWidth
                            required
                            value = {valuesForm?.id_rol ?? ""}
                            onChange={ (e)=>{
                                assignValueForm("id_rol", e.target.value);
                            }}
                        >
                            <MenuItem value=""><em>Seleccionar</em></MenuItem>
                            <MenuItem value="1">ADMINISTRADOR</MenuItem>
                        </TextField>
                    </Grid>
                </Grid>
                <>
                    <Divider sx={{marginTop: 2, marginBottom: 2}}/>
                    <Typography variant="body2">Datos del sistema</Typography>
                    <Grid container spacing={2} >
                        <Grid item  xs={12} sm={4}>
                            <TextField
                                label=" Usuario"
                                size="small"
                                margin="dense"
                                type="text"
                                fullWidth
                                InputProps= {
                                    { readOnly : editandoRegistro, sx: { backgroundColor: editandoRegistro ? '#080e5842' : 'inherit'}}
                                }
                                required
                                value = {valuesForm?.username}
                                onChange={ (e)=>{
                                    assignValueForm("username", e.target.value);
                                }}
                                />
                        </Grid>
                        {
                            !(editandoRegistro) &&
                                <Grid item  xs={12} sm={4}>
                                    <TextField
                                        label="Contraseña"
                                        size="small"
                                        margin="dense"
                                        type="password"
                                        fullWidth
                                        required
                                        value = {valuesForm?.password ?? ""}
                                        onChange={ (e)=>{
                                            assignValueForm("password", e.target.value);
                                        }}
                                        />
                                </Grid>
                        }
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Estado Acceso"
                                size="small"
                                margin="dense"
                                fullWidth
                                required
                                select
                                value = {valuesForm?.estado_acceso}
                                onChange={ (e)=>{
                                    assignValueForm("estado_acceso", e.target.value);
                                }}
                            >
                                <MenuItem value="A">ACTIVO</MenuItem>
                                <MenuItem value="I">INACTIVO</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                </>
            </ModalRegister>
    )
}