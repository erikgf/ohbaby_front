import { useDispatch, useSelector } from "react-redux";
import { cancelar, gestionar, quitarHorarioPersonal, seleccionarHorarioPersonal } from "../../../store/horariosPersonal/horariosPersonalSlice";
import { startingGuardarPersonalHorario, startingListarPersonalLibre } from "../../../store/horariosPersonal/horariosPersonalThunks";

export const usePersonalHorario = () => {
    const dispatch = useDispatch();
    const { horarioSeleccionado, cargarPersonalGuardar } = useSelector( state => state.horariosPersonal);

    const onGestionar = () => {
        dispatch( gestionar() );
        dispatch(startingListarPersonalLibre());
    };

    const onCancelar = () => {
        dispatch( cancelar() );
    };

    const onSeleccionarHorarioPersonal = (idPersonal) => {
        dispatch( seleccionarHorarioPersonal(idPersonal));
    };

    const onMoverAsociadoAPersonalGeneral = () => {
        dispatch( quitarHorarioPersonal() )
    };

    const onGuardarHorarioPersonal = () =>{
        if (!Boolean(horarioSeleccionado)){
            return;
        }

        dispatch( startingGuardarPersonalHorario({
            idHorario: horarioSeleccionado.id, 
            arregloIdEmpleadoContratos : horarioSeleccionado.personal.map( personal => personal.id )
        }) );
    }

    return {
        horarioSeleccionado,
        personal: horarioSeleccionado?.personal,
        cargarPersonalGuardar,
        onGestionar,
        onCancelar,
        onSeleccionarHorarioPersonal,
        onMoverAsociadoAPersonalGeneral,
        onGuardarHorarioPersonal
    }
};