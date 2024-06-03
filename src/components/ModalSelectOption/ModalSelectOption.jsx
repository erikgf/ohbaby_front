import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

const styles = {
    rowElement : {
        '&:focus': {
            backgroundColor: '#1976d2 !important'
        },
        '&:focus > td': {
            color: 'white'
        }
    }
};

export const ModalSelectOption = ( { onSelectItem, setAbrirModalSelectOption, abrirModalSelectOption, options, size = "sm" } )=>{
    const tbodyRef = useRef(null);
    const inputRef = useRef(null);
    const [cadenaBuscar, setCadenaBuscar] = useState("")

    const handleClose = (itemSelected = null)=>{
        onSelectItem(itemSelected);
        setAbrirModalSelectOption(false);
    };

    const handleKeyDown = ( event, itemRow ) => {
        event.stopPropagation();
        const currentRow = tbodyRef.current?.children.namedItem(itemRow.id);

        switch (event.key) {
          case "ArrowUp": 
            currentRow?.previousElementSibling?.focus();
            break;      
          case "ArrowDown": 
            currentRow?.nextElementSibling?.focus();
            break; 
          case " ":
            handleClose(itemRow);
            break;
          default: break;
        }
    };

    useEffect(() => {
      if (abrirModalSelectOption){
        setTimeout(()=>{
            inputRef?.current?.focus();
        }, 100)
      }
    }, [abrirModalSelectOption]);

    return  <Dialog component="form" size={size} fullWidth onClose={()=>{handleClose()}} open = {abrirModalSelectOption}>
                <DialogTitle>Seleccionar...</DialogTitle>
                <DialogContent>
                    <TextField
                            inputRef={inputRef} 
                            label="Buscar"  
                            size="small" 
                            fullWidth 
                            margin="dense"
                            value = {cadenaBuscar}
                            onChange={(e)=>{
                                setCadenaBuscar(e.target.value);
                            }}  
                            />
                    <TableContainer sx={{marginTop: "10px"}}>
                        <Table padding="none" size="small">
                            <TableHead>
                                <TableRow>
                                    {
                                        options?.headers.map(head=>{
                                            return <TableCell key={head.label}><Typography variant="subtitle" fontWeight={'bold'}>{head.label}</Typography> </TableCell>
                                        })
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody ref={tbodyRef}>
                                {
                                    options?.data.filter(opt=>{
                                            return opt.cadenaBuscar.indexOf(cadenaBuscar) != -1
                                        })
                                        .map(opt=>{
                                        return <TableRow  sx={styles.rowElement} key={opt.id} id={opt.id} tabIndex={0} 
                                                            onDoubleClick = {(e)=>handleClose(opt)}
                                                            onKeyDown={(e) => handleKeyDown(e, opt)}>
                                                    {
                                                        options?.headers?.map(head=>{
                                                            return <TableCell key={head.key}><Typography variant="caption">{opt[head.key]}</Typography></TableCell>
                                                        })
                                                    }
                                                </TableRow>
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button size="small" onClick={handleClose}>CERRAR</Button>
                </DialogActions>
            </Dialog>
};