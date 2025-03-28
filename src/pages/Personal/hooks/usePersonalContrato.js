import { useDispatch, useSelector } from "react-redux";
import { agregarContrato, cerrarContrato, editarContrato, eliminarContrato, leerContrato, setContratos } from "../../../store/personal/personalSlice";
import { startingFinalizarContrato } from "../../../store/personal/personalThunks";
import mensajes from "@/data/mensajes";

export const usePersonalContrato = () => {
    const dispatch = useDispatch();
    const { openModalContrato, seleccionado, contrato } = useSelector(state=>state.personal);

    const onAgregarContrato = ( { fechaInicio, salario, descuentoPlanilla, idHorario, diasTrabajo, horasDia, costoDia, costoHora, horasSemana }) => {
        if ( seleccionado?.contratos?.length > 0){
            const [ contrato ] = seleccionado?.contratos;
            if (contrato?.fechaFin > fechaInicio){
                alert(mensajes.PERSONA_FECHA_CONTRATO_INICIO_DEBE_SER_MAYOR_QUE_ULTIMO_CONTRATO);
                return;
            }
        }

        dispatch ( agregarContrato({
            id: new Date().getTime(), 
            backend: false,
            fechaInicio, 
            salario : parseFloat(salario).toFixed(3), 
            descuentoPlanilla : descuentoPlanilla === "" ? "0.000" : parseFloat(descuentoPlanilla).toFixed(3),
            idHorario,
            diasTrabajo, horasDia,
            costoDia, costoHora,
            horasSemana,
        }) );
    };

    const onSetContratos = ( contratos ) => {
        dispatch ( setContratos( contratos ) )
    };

    const onModificarContrato = ( contrato ) => {
        console.log({contrato});
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

    const onFinalizarContrato = ({id, fechaCese, razonCese}) => {
        dispatch ( startingFinalizarContrato ({id, fechaCese, razonCese}) );
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