import { useDispatch, useSelector } from "react-redux";
import { startingListarHorarios } from "../../../store/horariosPersonal/horariosPersonalThunks";
import { seleccionar } from "../../../store/horariosPersonal/horariosPersonalSlice";

export const useHorario = () => {
    const dispatch  = useDispatch();
    const { horarios, cargandoHorarios } = useSelector( state => state.horariosPersonal);

    const onListarHorarios = () => {
        dispatch ( startingListarHorarios() );
    };

    const onSeleccionarHorario = ({id}) => {
        dispatch ( seleccionar(id) );
    };

    return {
        horarios,
        cargandoHorarios,
        onListarHorarios,
        onSeleccionarHorario
    }
};