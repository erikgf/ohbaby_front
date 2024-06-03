import { useEffect, useRef, useState } from "react";
import { MdUpload as UploadIcon, MdOutlineHelpOutline as QuestionIcon} from "react-icons/md";
import { Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";
import { useExcelData } from "./useExcelData";

export const ButtonExcel = ( {setData, title, color = "success", variant = "contained", size = "large", cabeceras = [], ejemplos = []})=>{
    const inputFileRef = useRef(null);
    const {tableData, tableHeaders, onHandleFileChange, cleanData} = useExcelData();
    const [open, setOpen] = useState(false);

    const handleFileChange = (event) => {
        onHandleFileChange(event);
    };

    const onClose = () => {
        setOpen(false);
    };

    const onOpen = () => {
        setOpen(true);
    };

    useEffect(()=>{
        if (tableData == null){
            return;
        }

        if (setData && tableData != null){
            setData({tableData, tableHeaders});
        }   

        inputFileRef.current.value = "";
        
        return () => {
            if (tableData != null){
                cleanData();
            }
        }
      },[tableData]);

    return  <>
            <label htmlFor="archivo-input">
                <input
                    id="archivo-input"
                    type="file"
                    name="archivo"
                    accept=".xlsx"
                    ref={inputFileRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }} 
                />
                <Button
                    sx={{height: '100%'}}
                    color={color}
                    type="button"
                    variant={variant}
                    title={title}
                    size = {size}
                    component="span"
                    endIcon={<UploadIcon />}
                    >
                    {title}
                </Button>        
            </label>
            <IconButton
                    color={color}
                    type="button"
                    variant="outlined" 
                    title="Ver ejemplo"
                    component="span"
                    onClick={onOpen}
                    >
                    <QuestionIcon />
            </IconButton>

            <Dialog
                component="form"
                fullWidth
                maxWidth = "md"
                open={open}
                onClose={onClose}
            >
                <DialogTitle>Ejemplo Archivo Excel: </DialogTitle>
                <DialogContent>
                    <Table size="small" padding="none">
                        <TableHead>
                        <TableRow>
                            {cabeceras.map((header) => (
                            <TableCell key={header}><b>{header}</b></TableCell>
                            ))}
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {ejemplos.map((fila, index) => (
                                <TableRow key={index}>
                                    {fila.map((columna, columnaIndex) => (
                                        <TableCell key={columnaIndex}>{columna}</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cerrar</Button>
                </DialogActions>
            </Dialog>  
    </>
}