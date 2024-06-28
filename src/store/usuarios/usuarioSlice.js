import { createSlice } from "@reduxjs/toolkit";

export const usuarioSlice = createSlice({
   name : 'usuario',
   initialState : {
        registros: [],
        cargandoRegistros : false,
        cargandoSeleccionado: false,
        cargandoGuardar: false,
        cargandoEliminar: false,
        seleccionado : null,
        openModal: false,
   },
   reducers : {
        startListar : (state) =>{
            state.cargandoRegistros = true;
            state.registros = [];
        },
        okListar : (state, {payload : lista})=>{
            state.registros = lista.map( item => {
                const estado_acceso = item?.estado_acceso == 'A' ? 'ACTIVO' : 'INACTIVO';
                return {
                    ...item,
                    estado_acceso,
                    rol: "ADMINISTRADOR"
                }
            });
        },
        finallyListar: (state) => {
            state.cargandoRegistros = false;
        },
        startNuevoRegistro : (state) => {
            state.seleccionado = null;
            state.cargandoSeleccionado = false;
            state.openModal = true;
        },
        startLeer : (state) => {
            state.seleccionado = null ;
            state.cargandoSeleccionado = true;
        },
        okLeer : ( state, { payload : registro }) => {
            const usuario = registro;
            state.seleccionado =  {
                ...registro, 
                username: usuario?.username,
                estado_acceso: usuario?.estado_acceso
            };
            state.openModal = true;
        },
        finallyLeer : (state) => {
            state.cargandoSeleccionado = false;
        },
        cancelarSeleccionado: ( state ) => {
            state.seleccionado = null;
            state.cargandoSeleccionado = false;
            state.openModal = false;
        },
        startGuardar: ( state) => {
            state.cargandoGuardar = true;
        },
        okGuardar : ( state, { payload : nuevoRegistro }) => {
            const estado_acceso =  nuevoRegistro?.estado_acceso == 'A' ? 'ACTIVO' : 'INACTIVO';

            const nuevoRegistroMod =  {
                ...nuevoRegistro, 
                rol : "ADMINISTRADOR",
                estado_acceso
            };

            if (!Boolean(state.seleccionado)){
                state.registros.push(nuevoRegistroMod);
            } else {
                state.registros = state.registros.map(registro=>{
                    if (registro.id === state.seleccionado.id){
                        return nuevoRegistroMod;
                    }
                    return registro;
                })
            }

            state.openModal = false;
        },
        finallyGuardar: ( state ) => {
            state.cargandoGuardar = false;
        },
        startEliminar: ( state) => {
            state.cargandoEliminar = true;
        },
        okEliminar : ( state, { payload : id }) => {
            state.registros = state.registros.filter(reg=>{
                return reg.id != id
            });
        },
        finallyEliminar : ( state ) => {
            state.cargandoEliminar = false;
        }
   }
});

export const {
    startListar,
    okListar,
    finallyListar,
    startNuevoRegistro,
    startLeer,
    okLeer,
    finallyLeer,
    cancelarSeleccionado,
    startGuardar,
    okGuardar,
    finallyGuardar,
    startEliminar,
    okEliminar,
    finallyEliminar,
} = usuarioSlice.actions;