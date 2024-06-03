import { useRef } from "react";
import { createPortal } from "react-dom";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Paper } from "@mui/material";
import Draggable from 'react-draggable';
import useConfirm from "../../hooks/useConfirm";

function PaperComponent(props) {
    const nodeRef = useRef(null);
    return (
        <Draggable
            nodeRef={nodeRef}
            handle="#alert-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper ref={nodeRef} {...props} />
        </Draggable>
    );
}

export const ConfirmDialog = () => {
    const { onConfirm, onCancel, showing} = useConfirm();
    const portalElement = document.getElementById('portal');
    const component = showing.show 
        ? (
            <Dialog
                open={showing.show}
                maxWidth={'xs'}
                onClose={onCancel}
                PaperComponent={PaperComponent}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle style={{ cursor: 'move' }} id="alert-dialog-title">
                    {showing?.title}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {showing?.description}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={onCancel}>CANCELAR</Button>
                <Button color="secondary" onClick={onConfirm} autoFocus>SÍ</Button>
                </DialogActions>
            </Dialog>
        )
        : null;
    
    return createPortal(component, portalElement);
}