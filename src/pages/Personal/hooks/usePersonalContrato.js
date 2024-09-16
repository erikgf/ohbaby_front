import { useDispatch, useSelector } from "react-redux";
import { agregarContrato, cerrarContrato, editarContrato, eliminarContrato, leerContrato, setContratos } from "../../../store/personal/personalSlice";
import { startingFinalizarContrato } from "../../../store/personal/personalThunks";

export const usePersonalContrato = () => {
    const dispatch = useDispatch();
    const { openModalContrato, contrato } = useSelector(state=>state.personal);

    const onAgregarContrato = ( { fechaInicio, salario, diasTrabajo, horasDia, costoDia, costoHora }) => {
        dispatch ( agregarContrato({
            id: new Date().getTime(), 
            backend: false,
            fechaInicio, salario : parseFloat(salario).toFixed(2), 
            diasTrabajo, horasDia,
            costoDia, costoHora
        }) );
    };

    const onSetContratos = ( contratos ) => {
        dispatch ( setContratos( contratos ) )
    };

    const onModificarContrato = ( contrato ) => {
        dispatch ( editarContrato( contrato )  );
    };

    const onEliminarContrato = ({id}) => {
        dispatch ( eliminarContrato(id) );
    };

    const onCerrarContrato = ( ) => {
        dispatch ( cerrarContrato() );
    };

    const onLeerModalContrato = ({id}) => {
        dispatch ( leerContrato (id) );
    };

    const onFinalizarContrato = ({id, fechaCese}) => {
        dispatch ( startingFinalizarContrato ({id, fechaCese}) );
    };

    return {
        openModalContrato,
        contrato,
        onAgregarContrato,
        onSetContratos,
        onModificarContrato,
        onEliminarContrato,
        onCerrarContrato,
        onLeerModalContrato,
        onFinalizarContrato
    }
};