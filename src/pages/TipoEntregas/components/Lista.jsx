import { Grid } from "@mui/material";
import useConfirm from "../../../hooks/useConfirm";
import { TableManager } from "../../../components";
import { MdRefresh as RefreshIcon, MdAddCircleOutline as AddCircleIcon, MdEdit as EditIcon, MdDelete as DeleteIcon } from 'react-icons/md';
import { useTipoEntregas } from "../hooks/useTipoEntregas";
import { useEffect } from "react";
import { headCells } from "../data/headCells";
import { styles } from "../../../assets/styles";

const tableTitle = "Gestionar Tipo de Entregas";

export const Lista = () => {
    const { registros, cargandoRegistros, cargandoEliminar, cargandoSeleccionado, 
        onListar, onEliminarRegistro, onNuevoRegistro, onLeerRegistro} = useTipoEntregas();
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
                <Grid item xs = {12} md={7}>
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