import { Grid, } from "@mui/material";
import useConfirm from "../../../hooks/useConfirm";
import { styles } from "../../../assets/styles";
import { MdAddCircle as AddCircleIcon, MdEdit as EditIcon, MdDelete as DeleteIcon, MdRefresh as RefreshIcon} from "react-icons/md";
import { TableManager } from "../../../components";
import { useHorarios } from "../hooks/useHorarios";
import { useEffect } from "react";
import { headCells } from "../data/headCells";

const tableTitle = "Gestionar Horarios";

export const ListaHorarios = () => {
    const { registros, cargandoRegistros, cargandoEliminar, cargandoSeleccionado, 
            onListar, onEliminarRegistro, onNuevoRegistro, onLeerRegistro} = useHorarios();
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
        onListar();
    }, []);

    return  <Grid container spacing={2}>
                <Grid item xs = {12} sm={5}>
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
                                onClick : () => {onListar()},
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
                        />
                </Grid>
            </Grid>
}