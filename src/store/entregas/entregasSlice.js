import { createSlice } from "@reduxjs/toolkit";

export const defaultRegistro = {
    id: null,
    tipo_entrega: null,
    empleado_contrato: null,
    motivo: "",
    fecha_registro: null,
    monto_registrado: "",
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
                ...seleccionado,
                empleado_contrato
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
        okGuardar : ( state, { payload }) => {
            const nuevoRegistro = payload;
            if (!Boolean(state.seleccionado?.id)){
                state.registros.push(nuevoRegistro);
            } else {
                state.registros = state.registros.map(registro=>{
                    if (registro.id === state.seleccionado.id){
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