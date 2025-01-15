import { Box, Grid, MenuItem, TextField, } from "@mui/material";
import useConfirm from "../../../hooks/useConfirm";
import { styles } from "../../../assets/styles";
import { MdAddCircle as AddCircleIcon, MdEdit as EditIcon, MdDelete as DeleteIcon, MdRefresh as RefreshIcon} from "react-icons/md";
import { TableManager } from "../../../components";
import { usePersonal } from "../hooks/usePersonal";
import { useEffect, useState } from "react";
import { headCells } from "../data/headCells";
import { useEmpresasBean } from "../../../hooks";

const tableTitle = "Gestionar Personal";

export const ListaPersonal = () => {
    const { registros, cargandoRegistros, cargandoEliminar, cargandoSeleccionado, 
        onListar, onEliminarRegistro, onNuevoRegistro, onLeerRegistro} = usePersonal();
    const { data : listaEmpresas } = useEmpresasBean();
    const [empresaFiltro, setEmpresaFiltro] = useState("X");
    const { confirm } = useConfirm();

    const handleNuevoRegistro = () =>{
        onNuevoRegistro();
    };

    const handleEditarRegistro = (a)=>{
        onLeerRegistro({id: a.id});
    };

    const handleEliminarRegistro = async ({id}) =>{
        const isConfirmed = await confirm({
                    title: 'Eliminar Registro', 
                    description: '¿Desea eliminar el registro seleccionado? Esta acción es irreversible.'
                });
        if (isConfirmed){
            onEliminarRegistro({id});
            return;
        }
    };

    useEffect(()=>{
        onListar(empresaFiltro);
    }, [empresaFiltro]);

    return  <Grid container spacing={2}>
                <Grid item xs = {12}>
                    <TableManager
                        tableTitle={tableTitle}
                        rows =  {registros} 
                        loadingData = { cargandoRegistros }
                        headCells = { headCells }
                        isSearchAllowed = {true}
                        isSelectableRows = { false }
                        registersPerPage= {30}
                        tableWidth = "1400px"
                        strechTable = { true }
                        onActions = {[
                            {
                                inRows: false, inToolbar: true, noSelection: true, onOnlySelection: false,
                                onClick : () => {onListar(empresaFiltro)},
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
                        <Box ml={3} mb={3}>
                            <Grid container spacing={2}>
                                <Grid item md={3}>
                                    <TextField 
                                        label="Filtrar por Empresa"
                                        margin="dense"
                                        fullWidth
                                        size="small"
                                        select
                                        value={empresaFiltro}
                                        onChange={(e)=>{
                                            setEmpresaFiltro(e.target.value)
                                        }}
                                    >
                                        <MenuItem value="X">Todas</MenuItem>
                                        {
                                            listaEmpresas?.map( item => <MenuItem key={item.id} value={item.id}>{item.descripcion}</MenuItem>)
                                        }
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Box>
                    </TableManager>
                </Grid>
            </Grid>
}