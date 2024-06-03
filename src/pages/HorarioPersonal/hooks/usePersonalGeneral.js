import { useDispatch, useSelector } from "react-redux";
import { startingListarPersonalLibre } from "../../../store/horariosPersonal/horariosPersonalThunks";
import { agregarHorarioPersonal, seleccionarEmpleadoGeneral } from "../../../store/horariosPersonal/horariosPersonalSlice";

export const usePersonalGeneral = () => {
    const dispatch = useDispatch();
    const { horarioSeleccionado, personalGeneral, cargandoPersonalGeneral } = useSelector( state => state.horariosPersonal);

    const onListarPersonalLibre = () => {
        dispatch(startingListarPersonalLibre());
    };

    const onSeleccionarEmpleadoGeneral = (idPersonal) => {
        dispatch( seleccionarEmpleadoGeneral(idPersonal));
    }

    const onMoverPersonalGeneralAAsociado = () => {
        dispatch( agregarHorarioPersonal() )
    };

    return {
        horarioSeleccionado,
        personalGeneral,
        cargandoPersonalGeneral,
        onListarPersonalLibre,
        onSeleccionarEmpleadoGeneral,
        onMoverPersonalGeneralAAsociado
    }
};