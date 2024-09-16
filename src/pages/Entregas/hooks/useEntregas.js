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
        dispatch(startingGuardar({ dataForm: {
            fecha_registro: dataForm.fecha_registro,
            monto_registrado: dataForm.monto_registrado,
            motivo: dataForm.motivo,
            id_tipo_entrega: dataForm.tipo_entrega.id,
            id_empleado_contrato: dataForm.empleado_contrato.id,
            cuotas: dataForm.cuotas
        }, id: seleccionado?.id}));
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