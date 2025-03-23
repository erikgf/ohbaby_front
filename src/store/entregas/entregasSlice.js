import { createSlice } from "@reduxjs/toolkit";

export const defaultRegistro = {
    isEditando : false,
    tipo_entrega: null,
    empleado_contrato: null,
    cuotas: []
};

export const entregaSlice = createSlice({
   name : 'entrega',
   initialState : {
        registros: [],
        cargandoRegistros : false,
        seleccionado : null,
        cargandoSeleccionado: false,
        openModal: false,
   },
   reducers : {
        startListar : (state) =>{
            state.cargandoRegistros = true;
            state.registros = [];
        },
        okListar : (state, {payload})=>{
            state.registros = payload;
        },
        finallyListar: (state) => {
            state.cargandoRegistros = false;
        },
        startNuevoRegistro : (state) => {
            state.seleccionado = defaultRegistro;
            state.cargandoSeleccionado = false;
            state.openModal = true;
        },
        startLeer : (state) => {
            state.seleccionado = null ;
            state.cargandoSeleccionado = true;
        },
        okLeer : ( state, { payload : seleccionado}) => {
            const empleado = seleccionado?.empleado_contrato?.empleado;
            const empleado_contrato = {
                id: empleado?.id,
                descripcion: Boolean(empleado) ? `${empleado.apellido_paterno} ${empleado.apellido_materno}, ${empleado.nombres}`: '',
                contrato: {
                    id: seleccionado.empleado_contrato?.id,
                    id_empleado: empleado?.id
                }
            };

            state.seleccionado = {
                isEditando : true,
                tipo_entrega: seleccionado.tipo_entrega,
                empleado_contrato,
                cuotas: [{
                    id : seleccionado.id,
                    fecha_cuota : seleccionado.fecha_registro,
                    motivo_registro : seleccionado.motivo,
                    monto_cuota : seleccionado.monto_registrado
                }]
            };
            state.openModal = true;
        },
        finallyLeer : (state) => {
            state.cargandoSeleccionado = false;
            state.cargandoGuardar = false;
            state.cargandoEliminar = false;
        },
        cancelarSeleccionado: ( state ) => {
            state.seleccionado = null;
            state.cargandoSeleccionado = false;
            state.openModal = false;
        },
        startGuardar: (state) => {
            state.cargandoGuardar = true;
        },
        okGuardar : ( state, { payload : nuevosRegistros  }) => {
            if (!Boolean(state.seleccionado.isEditando)){
                state.registros = [...state.registros, ...nuevosRegistros];
            } else {
                const nuevoRegistro = {...nuevosRegistros};
                state.registros = state.registros.map(registro=>{
                    if (registro.id === nuevoRegistro.id){
                        return nuevoRegistro;
                    }
                    return registro;
                })
            }

            state.openModal = false;
        },
        startEliminar: ( state) => {
            state.cargandoEliminar = true;
        },
        okEliminar : ( state, { payload : id }) => {
            state.registros = state.registros.filter(reg=>{
                return reg.id != id
            });
        }
   }
});

export const {
    startListar,
    okListar,
    finallyListar,
    nuevoRegistro,
    startLeer,
    okLeer,
    finallyLeer,
    startGuardar,
    okGuardar,
    cancelarSeleccionado,
    startNuevoRegistro,
    startEliminar,
    okEliminar,
} = entregaSlice.actions;