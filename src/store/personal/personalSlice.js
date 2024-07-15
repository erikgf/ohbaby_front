import { createSlice } from "@reduxjs/toolkit";

const defaultContrato =  {
    id: null,
    fechaInicio: "",
    salario : "0.00",
    diasTrabajo : "0",
    horasDia: "0",
    costoDia: "0.00",
    costoHora: "0.00",
};

const defaultRegistro = {
    id: null,
    idTipoDocumento: "D",
    numeroDocumento: "",
    codigoUnico: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    nombres: "",
    direccion: "",
    fechaNacimiento: "",
    distritoUbigeo: "",
    pais: "PE",
    contratos : [],
    id_empresa: "",
    numero_orden : "1"
};

export const personalSlice = createSlice({
   name : 'personal',
   initialState : {
        registros: [],
        cargandoRegistros : false,
        seleccionado : null,
        cargandoSeleccionado: false,
        openModal: false,
        openModalContrato: false,
        contrato : null
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
        okLeer : ( state, { payload }) => {
            state.seleccionado = {...payload, contratos: payload.contratos.map (c => {
                return {...c, backend: true};
            })};
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

        },
        leerContrato : ( state, { payload: id }) => {
            if ( id === null){
                state.contrato = defaultContrato;
            } else {
                state.contrato = state.seleccionado.contratos.find( c => c.id === id);
            }

            state.openModalContrato = true;
        },
        cerrarContrato : ( state ) => {
            state.openModalContrato = false;
            state.contrato = null;
        },
        agregarContrato : ( state, { payload: contrato }) => {
            if (!Boolean(state.seleccionado)) return;
            state.seleccionado.contratos.unshift(contrato);
            state.contrato = null;
            state.openModalContrato = false;
        },
        setContratos  :  ( state,  { payload: contratos }) => {
            if (!Boolean(state.seleccionado)) return;
            state.seleccionado.contratos = contratos;
        },
        editarContrato  :  ( state,  { payload: contratoEditado }) => {
            if (!Boolean(state.seleccionado)) return;
            state.seleccionado.contratos = state.seleccionado.contratos.map( contrato => {
                if ( contrato.id === contratoEditado.id){
                    return {
                        ...contrato,
                        ...contratoEditado
                    };
                }
                return contrato;
            });

            state.contrato = null;
            state.openModalContrato = false;
        },
        eliminarContrato :  ( state , { payload : id}) => {
            if (!Boolean(state.seleccionado)) return;
            state.seleccionado.contratos = state.seleccionado.contratos.filter( contrato => {
                return contrato.id != id
            });
        },
        toggleModalContrato : ( state, { payload: opening}) => {
            state.openModalContrato = opening;
        },
        startFinalizarContrato : ( state ) => {
            state.cargandoFinalizarContrato = true;
        },
        okFinalizarContrato : ( state, { payload : { id, fecha}} ) => {
            state.cargandoFinalizarContrato = true;
            if (!Boolean(state.seleccionado)) return;
            state.seleccionado.contratos = state.seleccionado.contratos.map( contrato => {
                if (contrato.id == id){
                    return {
                        ...contrato,
                        fechaFin: fecha
                    };
                }

                return contrato;
            });

        },
        finallyFinalizarContrato : ( state ) => {
            state.cargandoFinalizarContrato = false;
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
    agregarContrato,
    setContratos,
    editarContrato,
    eliminarContrato,
    toggleModalContrato,
    leerContrato,
    cerrarContrato,
    startFinalizarContrato,
    okFinalizarContrato,
    finallyFinalizarContrato
} = personalSlice.actions;