import { useDispatch, useSelector } from "react-redux";
import { agregarDetalle, cerrarDetalle, editarDetalle, eliminarDetalle, leerDetalle, setDetalles } from "../../../store/horarios/horariosSlice";

export const useHorarioDetalle = () => {
    const dispatch = useDispatch();
    const { openModalDetalle, detalle } = useSelector(state=>state.horarios);

    const onAgregarDetalle = ( { horaInicio,  horaFin, dias }) => {
        dispatch ( agregarDetalle({
            id: new Date().getTime(), 
            backend: false,
            horaInicio,  horaFin, dias 
        }) );
    };

    const onSetDetalles = ( detalles ) => {
        dispatch ( setDetalles( detalles ) )
    };

    const onModificarDetalle = ( detalle ) => {
        dispatch ( editarDetalle( detalle )  );
    };

    const onEliminarDetalle = ({id}) => {
        dispatch ( eliminarDetalle(id) );
    };

    const onCerrarDetalle = ( ) => {
        dispatch ( cerrarDetalle() );
    };

    const onLeerModalDetalle = ({id}) => {
        dispatch ( leerDetalle (id) );
    };

    return {
        openModalDetalle,
        detalle,
        onAgregarDetalle,
        onSetDetalles,
        onModificarDetalle,
        onEliminarDetalle,
        onCerrarDetalle,
        onLeerModalDetalle,
    }
};