import React from "react";
import { LoadingButton } from "@mui/lab";
import { Dialog, DialogTitle, DialogContent, DialogActions,Button, Slide } from "@mui/material";
import { ButtonsActions } from "./ButtonsActions";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const ModalRegister = ({
                    children,
                    onSubmit,
                    handleModalClose, 
                    open, 
                    modalTitle,
                    okButtonText = "GUARDAR",
                    maxWidth = 'sm',
                    submitAllowed = true,
                    submitEnabled = true,
                    submitLoading = false,
                    optionLabel = "Opciones",
                    options = null,
                    fullScreen = false
                }) => {
    return (
        <Dialog
                fullScreen = { fullScreen }
                component="form"
                sx = {fullScreen ? { top: '64px'} :{}}
                fullWidth
                maxWidth = {maxWidth}
                open={open}
                onClose={handleModalClose}
                onSubmit = {onSubmit}
                TransitionComponent={Transition}
            >
            <DialogTitle color={"primary"}>{modalTitle}</DialogTitle>
            {
                (Boolean(options) && options.length > 0) &&
                    <ButtonsActions title = {optionLabel} options = {options} />
            }
            <DialogContent>
                {children}
            </DialogContent>
            <DialogActions>
                {
                    submitAllowed &&
                        <LoadingButton loading= {submitLoading} disabled = {!submitEnabled} type="submit" variant="contained">{okButtonText}</LoadingButton>
                }
                <Button onClick={handleModalClose}>Cerrar</Button>
            </DialogActions>
        </Dialog>
    )
}