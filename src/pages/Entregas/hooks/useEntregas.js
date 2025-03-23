import { useDispatch, useSelector } from "react-redux";
import { startingEliminar, startingGuardar, startingLeer, startingListar } from "../../../store/entregas/entregasThunks";
import { cancelarSeleccionado,  defaultRegistro,  startNuevoRegistro } from "../../../store/entregas/entregasSlice";

export const useEntregas = ()=>{
    const dispatch = useDispatch();
    const { openModal, registros, cargandoRegistros, seleccionado, cargandoSeleccionado, cargandoGuardar } = useSelector(state=>state.entregas);

    const onNuevoRegistro = ()=>{
        dispatch(startNuevoRegistro());
    };

    const onListar = async (fecha_inicio, fecha_fin)=>{
        dispatch(startingListar({
            fromDate: fecha_inicio,
            toDate: fecha_fin
        }));
    };

    const onGuardarRegistro = async (dataForm)=>{
        if (seleccionado?.isEditando){
            const [registroEditar] = dataForm.cuotas;
            dispatch(startingGuardar({
                dataForm: {
                    id_tipo_entrega: dataForm.tipo_entrega.id,
                    id_empleado_contrato: dataForm.empleado_contrato?.contrato?.id,
                    ...registroEditar
                },
                id: registroEditar.id
            }));
            return;
        }
        dispatch(startingGuardar({
            dataForm: {
                id_tipo_entrega: dataForm.tipo_entrega.id,
                id_empleado_contrato: dataForm.empleado_contrato.id,
                cuotas: dataForm.cuotas
            }
        }));
    };

    const onLeerRegistro = async ({id})=>{
        dispatch(startingLeer({id}));
    };

    const onEliminarRegistro = async ({id})=>{
        dispatch(startingEliminar({id}));
    };

    const onCloseModal = () => {
        dispatch(cancelarSeleccionado());
    };

    return {
        openModal, registros, cargandoRegistros, seleccionado, cargandoSeleccionado, cargandoGuardar, defaultValuesForm : defaultRegistro,
        onNuevoRegistro, onGuardarRegistro, onListar, onLeerRegistro, onEliminarRegistro, onCloseModal,
    }
}