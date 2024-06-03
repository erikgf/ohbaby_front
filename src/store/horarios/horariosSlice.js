import { createSlice } from "@reduxjs/toolkit";

const defaultDetalle =  {
    id: null,
    horaInicio: "",
    horaFin: "",
    dias : [
        { id: 1, descripcion: "Lunes", checked: false},
        { id: 2, descripcion: "Martes", checked: false},
        { id: 3, descripcion: "Miércoles", checked: false},
        { id: 4, descripcion: "Jueves", checked: false},
        { id: 5, descripcion: "Viernes", checked: false},
        { id: 6, descripcion: "Sábado", checked: false},
    ] //disponible 1,2,3,4,5,6 Días Semana
};

const defaultRegistro = {
    descripcion: "",
    detalles : []
};

export const horariosSlice = createSlice({
   name : 'horarios',
   initialState : {
        registros: [],
        cargandoRegistros : false,
        seleccionado : null,
        cargandoSeleccionado: false,
        openModal: false,
        openModalDetalle: false,
        detalle : null
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
            console.log({...payload})
            state.seleccionado = {...payload, 
                detalles: payload.detalles.map ( detalle => {
                    return {
                        ...detalle, 
                        backend: true,
                        dias: defaultDetalle.dias.map ( dia => {
                            const checked = Boolean(detalle.dias.find( _dia => _dia.id == dia.id));
                            return {
                                ...dia,
                                checked
                            };
                        })
                    };
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
        leerDetalle : ( state, { payload: id }) => {
            if ( id === null){
                state.detalle = defaultDetalle;
            } else {
                state.detalle = state.seleccionado.detalles.find( c => c.id === id);
            }

            state.openModalDetalle = true;
        },
        cerrarDetalle : ( state ) => {
            state.openModalDetalle = false;
            state.detalle = null;
        },
        agregarDetalle : ( state, { payload: detalle }) => {
            if (!Boolean(state.seleccionado)) return;
            state.seleccionado.detalles.push(detalle);
            state.detalle = null;
            state.openModalDetalle = false;
        },
        setDetalles  :  ( state,  { payload: detalles }) => {
            if (!Boolean(state.seleccionado)) return;
            state.seleccionado.detalles = detalles;
        },
        editarDetalle  :  ( state,  { payload: detalleEditado }) => {
            if (!Boolean(state.seleccionado)) return;
            state.seleccionado.detalles = state.seleccionado.detalles.map( detalle => {
                if ( detalle.id === detalleEditado.id){
                    return {
                        ...detalle,
                        ...detalleEditado
                    };
                }
                return detalle;
            });

            state.detalle = null;
            state.openModalDetalle = false;
        },
        eliminarDetalle :  ( state , { payload : id}) => {
            if (!Boolean(state.seleccionado)) return;
            state.seleccionado.detalles = state.seleccionado.detalles.filter( detalle => {
                return detalle.id != id
            });
        },
        toggleModalDetalle : ( state, { payload: opening}) => {
            state.openModalDetalle = opening;
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
    agregarDetalle,
    setDetalles,
    editarDetalle,
    eliminarDetalle,
    toggleModalDetalle,
    leerDetalle,
    cerrarDetalle,
} = horariosSlice.actions;