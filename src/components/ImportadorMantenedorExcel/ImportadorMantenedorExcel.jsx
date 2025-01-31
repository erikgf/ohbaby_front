import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import { Alert, AlertTitle, Box, Button, Dialog, DialogActions, DialogContent,  Divider,  Grid, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { MdDownload, MdSave, MdUploadFile } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import CONSTANTES from "./constantesLocales";
import { useImportadorMantenedorExcel } from "./useImportadorMantenedorExcel";

const {TABS, EXTENSIONES_PERMITIDAS} = CONSTANTES;

export const ImportadorMantenedorExcel = ({ 
                        isOpen, onClose, cabeceraAlta = [], cabeceraBaja = [], registrosEjemploAlta = [], registrosEjemploBaja = [], 
                        resultado = null,  onClearResultado = null, erroresMasivo = null, isCargandoImportacion = false, fnImportacion = null, 
                        nombreTabla = "Nombre Tabla"}) => {
    const { 
        isMostrarEjemplo,
        valueTabIndex,
        dataProcesada,
        isMantenerVentanaGrande,
        toggleMostrarEjemplo,
        handleChangeTab,
        onProcesarLecturaFileExcel,
        onDescartarData,
        onImportar,
        onDescargarErrores,
        onDescargarEstructura
    } = useImportadorMantenedorExcel({isOpen, nombreTabla, cabeceraAlta, resultado, onClearResultado, cabeceraBaja, fnImportacion, TABS});

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.name.endsWith(EXTENSIONES_PERMITIDAS)) {
                readFile(file);
            } else {
                alert(`Por favor seleccionar un archivo con la extensión (${EXTENSIONES_PERMITIDAS}) correcta.`);
            }

            event.target.value = "";
        }
    };

    const readFile = (file) => {
        onClearResultado();
        try{
            onProcesarLecturaFileExcel(file);
        } catch (error) {
            console.error("Error al cargar y procesar el archivo:", error);
        }
    };

    return  <Dialog
                fullWidth
                maxWidth = {isMantenerVentanaGrande ? "lg" : "xs"}
                open={isOpen}
                onClose={onClose}
                disableEscapeKeyDown={true} // Prevent escape key closing if cannot close
            >
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item sm={isMantenerVentanaGrande ? 4 : 12}>
                        <Typography variant="h6"  mb={2}>Registro Masivo de {nombreTabla}</Typography>
                        <Typography mb={2} variant="subtitle2">A continuación proceda a subir un archivo de Excel ({EXTENSIONES_PERMITIDAS}) con la estructura adecuada para poder ser procesado.</Typography>
                        {
                            !Boolean(dataProcesada)
                                    ? (
                                        isMostrarEjemplo
                                        ? <Button type="button" sx={{mb: 2}} variant="outlined" size="small" startIcon={<IoMdEyeOff/>} onClick={toggleMostrarEjemplo}>Esconder Ejemplo</Button>
                                        : <Button type="button" sx={{mb: 2}} variant="outlined" size="small" startIcon={<IoMdEye/>} onClick={toggleMostrarEjemplo}>Ver Ejemplo</Button>
                                    )
                                    :  <Button type="button" sx={{mb: 2}} variant="outlined" size="small" startIcon={<IoClose/>} onClick={onDescartarData}>Descartar Datos</Button>
                        }
                        <Divider sx={{mb: 2}}/>
                        {
                            !isCargandoImportacion &&
                                <Box >
                                    <input
                                        accept={EXTENSIONES_PERMITIDAS}
                                        type="file"
                                        style={{ display: 'none' }}
                                        id="xlsx-file-input"
                                        onChange={handleFileChange}
                                    />
                                    <label htmlFor="xlsx-file-input">
                                        <Button size="small" component="span" variant="contained" color="primary" startIcon={<MdUploadFile />}>
                                            Cargar archivo (*.xlsx)
                                        </Button>
                                    </label>
                                    <Divider sx={{mt: 2, mb: 2}}/>
                                </Box>
                        }
                        {
                            Boolean(resultado) &&
                                    <Box>
                                        <Typography variant="h6">Resultados Proceso: </Typography>
                                        <Typography variant="subtitle2" color={"var(--success-color)"}>Registros Correctos: {resultado?.correctos_records_count}</Typography>
                                        <Typography variant="body2">* Registros Alta: {resultado?.upsertados_records_count} (Insertados:  {resultado?.insertados_records_count}, Editados:  {resultado?.editados_records_count})</Typography>
                                        <Typography variant="body2">* Registros Baja: {resultado?.eliminados_records_count}</Typography>
                                        <Typography variant="subtitle2" color={"var(--error-color)"}>Registros con Errores: {resultado?.invalid_records_count}</Typography>
                                        <Typography variant="body2">* Errores Alta: {resultado?.alta_invalid_records?.length}</Typography>
                                        <Typography variant="body2">* Errores Baja: {resultado?.baja_invalid_records?.length}</Typography>
                                        <Button onClick={onDescargarErrores} type="button" sx={{mt: 1}} size="small" component="span" variant="contained" color="success" startIcon={<MdDownload />}>
                                            Descargar Detalle Errores
                                        </Button>
                                    </Box>
                        }
                        {
                            Boolean(erroresMasivo) &&
                                <Alert variant="filled" severity="error">
                                    <AlertTitle>¡Error con la Carga Masiva!</AlertTitle>
                                    {
                                        erroresMasivo?.map( (item) => <Typography key={item} variant="body2">* {item}</Typography>)
                                    }
                                </Alert>

                        }
                    </Grid>
                    {
                        (isMostrarEjemplo || Boolean(dataProcesada)) &&
                            <Grid item sm={8}>
                                <TabContext value={valueTabIndex}>
                                    <Box sx={{ borderBottom: 1, position: "relative", borderColor: 'divider' }}>
                                        <TabList onChange={handleChangeTab} aria-label="Tabs Data">
                                            <Tab label={`${TABS[0].label} ${ Boolean(dataProcesada) ? `(${dataProcesada?.dataAlta?.length})` : ""}`} value={TABS[0].id} title={TABS[0].title}/>
                                            <Tab label={`${TABS[1].label} ${ Boolean(dataProcesada) ? `(${dataProcesada?.dataBaja?.length})`  : "" }`} value={TABS[1].id} title={TABS[1].title}/>
                                        </TabList>
                                        <Button sx={{position: "absolute", right: 0, top: 10}} color="success" type="button" onClick={onDescargarEstructura} size="small">Descargar Estructura</Button>
                                    </Box>
                                    <TabPanel value={TABS[0].id} sx={{pb: 1}}>
                                        <TableContainer
                                            component={Paper}
                                            sx={{
                                                maxHeight: 500,
                                                overflowX: 'auto', // Enable horizontal scroll
                                            }}>
                                            <Table size="small" sx={{ minWidth: 1200, minHeight: 135}}>
                                                <TableHead>
                                                    <TableRow>
                                                    {
                                                    cabeceraAlta?.map( item  => <TableCell sx={{fontWeight: "bold", textWrap: "nowrap"}}  title={item.title} key={item.id}>{item.label} {item?.isRequired && <span style={{color: "var(--secondary-color)"}}>*</span>}</TableCell>)
                                                    }
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {
                                                        !Boolean(dataProcesada) 
                                                        ?   registrosEjemploAlta?.map ( (item, i)=> (
                                                                <TableRow key={i}>
                                                                    {
                                                                        item?.map( (_item, j) => <TableCell key={`${i}_${j}_${_item}`} sx={{color: "gray"}}>{_item}</TableCell>)
                                                                    }
                                                                </TableRow>  
                                                                ))
                                                        : dataProcesada?.dataAlta?.map( (item)=> (
                                                            <TableRow key={item.id}>
                                                                {Object.values(item).map((value, cellIndex) => (
                                                                     cellIndex != 0 && <TableCell key={cellIndex}>{value}</TableCell>
                                                                ))}
                                                            </TableRow>  
                                                        ))
                                                    }
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </TabPanel>
                                    <TabPanel value={TABS[1].id} sx={{pb: 1}}>
                                        <TableContainer
                                            component={Paper}
                                            sx={{
                                                maxHeight: 500,
                                                maxWidth: '100%',  // or set a fixed width if desired (e.g. '600px')
                                                overflowX: 'auto', // Enable horizontal scroll
                                            }}>
                                            <Table size="small" sx={{ minHeight: 135}}>
                                                <TableHead>
                                                    <TableRow>
                                                    {cabeceraBaja?.map( item  => <TableCell sx={{fontWeight: "bold"}} key={item.id}>{item.label} {item?.isRequired && <span style={{color: "var(--secondary-color)"}}>*</span>}</TableCell>)}
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {
                                                        !Boolean(dataProcesada)  
                                                        ?   registrosEjemploBaja?.map( (item, i)=> (
                                                                <TableRow key={i}>
                                                                    {
                                                                        item?.map( _item => <TableCell sx={{color: "gray"}} key={_item}>{_item}</TableCell>)
                                                                    }
                                                                </TableRow>  
                                                            ))
                                                        : dataProcesada?.dataBaja?.map( (item)=> (
                                                            <TableRow key={item.id}>
                                                                {Object.values(item).map((value, cellIndex) => {
                                                                    return cellIndex != 0 && <TableCell key={cellIndex}>{value}</TableCell>
                                                                })}
                                                            </TableRow>  
                                                        ))
                                                    }
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </TabPanel>
                                </TabContext>
                                <Typography variant="body2"><span style={{color: "var(--secondary-color)"}}>* </span> Columna con datos obligatorios</Typography>
                                <Typography variant="body2">** Basándose en el campo único, si son registros existen serán agregados, y si ya existe, el registro se actualizará.</Typography>
                            </Grid>
                    }
                </Grid>
            </DialogContent>
            <DialogActions>
                <LoadingButton loading={isCargandoImportacion} type="submit" variant="contained" onClick={onImportar} disabled= {!Boolean(dataProcesada) || Boolean(resultado)} startIcon={<MdSave />}>IMPORTAR</LoadingButton>
                {
                    !isCargandoImportacion &&
                        <Button type="button" onClick={onClose}>Cerrar</Button>
                }
            </DialogActions>
            </Dialog>
}