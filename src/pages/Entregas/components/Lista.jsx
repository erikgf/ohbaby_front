import { Box, Grid, TextField } from "@mui/material";
import useConfirm from "../../../hooks/useConfirm";
import { TableManager } from "../../../components";
import { MdRefresh as RefreshIcon, MdAddCircleOutline as AddCircleIcon, MdEdit as EditIcon, MdDelete as DeleteIcon } from 'react-icons/md';
import { useEntregas } from "../hooks/useEntregas";
import { useEffect, useState } from "react";
import { headCells } from "../data/headCells";
import { styles } from "../../../assets/styles";
import mensajes from "../../../data/mensajes";
import { getHoy } from "../../../assets/utils";

const tableTitle = "Registrar Descuentos y Adelantos";
const hoy = getHoy();

export const Lista = () => {
    const { registros, cargandoRegistros, cargandoEliminar, cargandoSeleccionado,
            onListar, onEliminarRegistro, onNuevoRegistro, onLeerRegistro} = useEntregas();
    const [fechaInicio, setFechaInicio] = useState(hoy);
    const [fechaFin, setFechaFin] = useState(hoy);
    const { confirm } = useConfirm();

    const handleNuevoRegistro = () =>{
        onNuevoRegistro();
    };

    const handleEditarRegistro = (a)=>{
        onLeerRegistro({id: a.id});
    };

    const handleEliminarRegistro = async ({id}) =>{
        const isConfirmed = await confirm({
                        title: mensajes.ROTULO_ELIMINAR_REGISTRO, 
                        description: mensajes.DESEA_ELIMINAR_REGISTRO
                    });
        if (isConfirmed){
            onEliminarRegistro({id});
            return;
        }
    };

    const handleListar = () => {
        onListar(fechaInicio, fechaFin);
    }

    useEffect(()=>{
        handleListar();
    }, []);

    return  <Grid container spacing={2}>
                <Grid item xs = {12} md={8}>
                    <TableManager
                        tableTitle={tableTitle}
                        rows =  {registros} 
                        loadingData = { cargandoRegistros }
                        headCells = { headCells }
                        isSearchAllowed = {true}
                        isSelectableRows = { false }
                        registersPerPage= {30}
                        strechTable = { true }
                        onActions = {[
                            {
                                inRows: false, inToolbar: true, noSelection: true, onOnlySelection: false,
                                onClick : handleListar,
                                title : 'Actualizar',
                                icon : <RefreshIcon  style={{color: styles.colorButtons.green}}/>
                            },
                            {
                                inRows: false, inToolbar: true, noSelection: true, onOnlySelection: false,
                                onClick : handleNuevoRegistro,
                                title : 'Nuevo',
                                icon : <AddCircleIcon  style={{color: styles.colorButtons.blue}}/>
                            },
                            {
                                inRows: true, inToolbar: false, onOnlySelection: false,
                                onLoading: cargandoSeleccionado,
                                onClick : handleEditarRegistro,
                                title : 'Editar',
                                icon : <EditIcon color="orange"/>
                            },
                            {
                                inRows: true, inToolbar: false, onOnlySelection: false,
                                onLoading: cargandoEliminar,
                                onClick : handleEliminarRegistro,
                                title : 'Eliminar',
                                icon : <DeleteIcon style={{color: styles.colorButtons.red}}/>
                            }
                        ]}
                    >
                        <Box ml={2}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6} md={3}>
                                        <TextField margin="dense" type="date" InputLabelProps={{shrink: true}}
                                            value={fechaInicio}
                                            onChange={(e)=>{
                                                setFechaInicio(e.target.value);
                                            }} name="fecha_desde" fullWidth size="small" label="Desde"/>
                                    </Grid>
                                    <Grid item xs={6} md={3}>
                                        <TextField margin="dense" type="date" InputLabelProps={{shrink: true}} 
                                            value={fechaFin}
                                            onChange={(e)=>{
                                                setFechaFin(e.target.value);
                                            }} name="fecha_hasta" fullWidth size="small" label="Hasta"/>
                                    </Grid>
                                </Grid>
                        </Box>
                    </TableManager>
                </Grid>
            </Grid>
}