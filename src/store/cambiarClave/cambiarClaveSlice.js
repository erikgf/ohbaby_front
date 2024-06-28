import { createSlice } from "@reduxjs/toolkit";

export const cambiarClaveSlice = createSlice({
   name : 'cambiarClave',
   initialState : {
        registro: null,
        openModal: false,
        cargandoGuardar : false,
   },
   reducers : {
        startGuardar: (state) => {
            state.cargandoGuardar = true;
        },
        finallyGuardar : (state) => {
            state.cargandoGuardar = false;
        },
        openModalCambiarClave: ( state, { payload: registro}) => {
            state.openModal = true;
            state.registro = registro;
        },
        closeModalCambiarClave: ( state) => {
            state.openModal = false;
            state.registro = null;
        }
   }
});

export const {
    startGuardar,
    finallyGuardar,
    openModalCambiarClave,
    closeModalCambiarClave
} = cambiarClaveSlice.actions;