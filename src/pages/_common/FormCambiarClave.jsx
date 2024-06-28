import { useEffect, useState } from "react";
import { useFormCambiarClave } from "./useFormCambiarClave";
import { Grid, TextField } from "@mui/material";
import { ModalRegister } from "../../components";


const titleModal = "Cambiar Clave Usuario";

const isCombinacionClavesValida = ( claveNueva, repetirClaveNueva ) => {
    return claveNueva === repetirClaveNueva && claveNueva != "";
};

export const FormCambiarClave = () => {
    const [claveNueva, setClaveNueva] = useState("");
    const [repetirClaveNueva, setRepetirClaveNueva] = useState("");
    const combinacionClaveValida =  isCombinacionClavesValida(claveNueva, repetirClaveNueva);
    const { openModal, registro, cargandoGuardar, onGuardar, onCerrarModal } = useFormCambiarClave();

    useEffect(()=>{
        setClaveNueva("");
        setRepetirClaveNueva("");
    }, [openModal]);

    return <ModalRegister
                modalTitle = {`${titleModal}: ${ Boolean(registro) ? registro?.name : ""}`}
                okButtonText = 'Guardar'
                open = { openModal }
                handleModalClose = {()=>{
                    onCerrarModal();
                }}
                onSubmit = { (e)=>{
                    e.preventDefault();
                    onGuardar(claveNueva.trim());
                }}
                submitEnabled = { combinacionClaveValida }
                submitLoading={cargandoGuardar}
            >
                {
                    Boolean(registro) &&
                        <Grid container spacing={4}>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Clave Nueva"
                                    size="small"
                                    margin="dense"
                                    type="password"
                                    autoFocus
                                    fullWidth
                                    color=  { combinacionClaveValida  ? "primary" : "error"}
                                    autoComplete="off"
                                    required
                                    value = {claveNueva}
                                    onChange = { (e)=>setClaveNueva(e.target.value)}
                                    />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Repetir Clave"
                                    size="small"
                                    margin="dense"
                                    type="password"
                                    color=  { combinacionClaveValida  ? "primary" : "error"}
                                    autoComplete="off"
                                    fullWidth
                                    required
                                    value = {repetirClaveNueva}
                                    onChange = { (e)=>setRepetirClaveNueva(e.target.value)}
                                    />
                            </Grid>
                        </Grid>
                }
                
            </ModalRegister>
}