import { createSlice } from "@reduxjs/toolkit";

export const horariosPersonalSlice = createSlice({
   name : 'horariosPersonal',
   initialState : {
        cargandoHorarios: false,
        horarios: [],
        horarioSeleccionado : null,
        personalGeneral : [],
        cargandoPersonalGeneral: false,
        cargarPersonalGuardar: false
   },
   reducers : {
        startListarHorarios : (state ) =>{
            state.cargandoHorarios = true;
            state.horarios = [];
        },
        okListarHorarios : ( state, { payload : horarios }) => {
            state.horarios = horarios.map( horario => {
                return {
                    ...horario,
                    seleccionado: false,
                    gestionando: false
                }
            })
        },
        finallyListaHorarios : ( state ) => {
            state.cargandoHorarios = false;
        },
        seleccionar : ( state, { payload: id }) => {
            state.horarios = state.horarios.map( horario => {
                if (horario.id === id){
                    const esSeleccionado = horario.seleccionado;
                    if (!Boolean(esSeleccionado)){
                        state.horarioSeleccionado = horario;
                        return {
                            ...horario,
                            seleccionado: true,
                            personal: horario.personal.map( empleado => {
                                return {
                                    ...empleado, seleccionado: false
                                }
                            })
                        };
                    } else {
                        state.horarioSeleccionado = null;
                    }
                }

                return {
                    ...horario,
                    seleccionado: false,
                    gestionando: false
                };
            });
        },
        gestionar : ( state ) => {
            if (!Boolean(state.horarioSeleccionado)){
                return;
            }

            const { id } = state.horarioSeleccionado;
            state.horarios = state.horarios.map( horario => {
                if (horario.id === id){
                    return {
                        ...horario,
                        gestionando: true
                    };
                }
                return horario;
            });

            state.horarioSeleccionado.gestionando = true;
        },
        cancelar: ( state ) => {
            if (!Boolean(state.horarioSeleccionado)){
                return;
            }

            const { id } = state.horarioSeleccionado;
            state.horarios = state.horarios.map( horario => {
                if (horario.id === id){
                    return {
                        ...horario,
                        seleccionado: false,
                        gestionando: false
                    };
                }
                return horario;
            });

            state.horarioSeleccionado = null;
        },
        seleccionarHorarioPersonal : ( state, { payload : idPersonal }) => {
            if (!Boolean(state.horarioSeleccionado)){
                return;
            }

            state.horarioSeleccionado.personal = state.horarioSeleccionado.personal.map ( personal => {
                if ( personal.id  === idPersonal ){
                    return {
                        ...personal,
                        seleccionado: !personal.seleccionado,
                    }
                }
                return personal;
            });
        },
        seleccionarEmpleadoGeneral : ( state, { payload : idPersonal }) => {
            if (!Boolean(state.horarioSeleccionado)){
                return;
            }

            state.personalGeneral = state.personalGeneral.map( personal => {
                if ( personal.id  === idPersonal ){
                    return {
                        ...personal,
                        seleccionado: !personal.seleccionado,
                    }
                }

                return personal;
            });
        },
        agregarHorarioPersonal : ( state ) => {
            if (!Boolean(state.horarioSeleccionado)){
                return;
            }

            state.horarioSeleccionado.personal = [
                ...state.horarioSeleccionado.personal,
                ...state.personalGeneral.filter( personal => personal.seleccionado ).map( item => {
                    return {...item, seleccionado: false}
                })
            ];

            state.personalGeneral =  state.personalGeneral.filter(personal => {
                return !personal.seleccionado;
            });

        },
        quitarHorarioPersonal : ( state ) => {
            if (!Boolean(state.horarioSeleccionado)){
                return;
            }
            
            state.personalGeneral = [
                ...state.personalGeneral,
                ...state.horarioSeleccionado.personal.filter( personal => personal.seleccionado ).map( item => {
                    return {...item, seleccionado: false}
                })
            ];

            state.horarioSeleccionado.personal =  state.horarioSeleccionado.personal.filter(personal => {
                return !personal.seleccionado;
            });
        },
        startListarPersonalLibre : (state ) =>{
            state.cargandoPersonalGeneral = true;
            state.personalGeneral = [];
        },
        okListarPersonalLibre : ( state, { payload : personalGeneral }) => {
            state.personalGeneral = personalGeneral.map( pg => {
                return {
                    ...pg,
                    seleccionado: false
                }
            })
        },
        finallyListarPersonalLibre : ( state ) => {
            state.cargandoPersonalGeneral = false;
        },
        startGuardarPersonalHorario : (state ) =>{
            state.cargarPersonalGuardar = true;
        },
        okGuardarersonalHorario : ( state ) => {
            if (!Boolean(state.horarioSeleccionado)){
                return;
            }
            
            const { id } = state.horarioSeleccionado;
            state.horarios = state.horarios.map( horario => {
                if (horario.id === id){
                    return {
                        ...horario,
                        personal: state.horarioSeleccionado.personal
                    };
                }
                return horario;
            });
        },
        finallyGuardarPersonalHorario : ( state ) => {
            state.cargarPersonalGuardar = false;
        },
   }
});

export const {
    startListarHorarios,
    okListarHorarios,
    finallyListaHorarios,
    seleccionar,
    gestionar,
    seleccionarHorarioPersonal,
    seleccionarEmpleadoGeneral,
    agregarHorarioPersonal,
    quitarHorarioPersonal,
    cancelar,
    startListarPersonalLibre,
    okListarPersonalLibre,
    finallyListarPersonalLibre,
    startGuardarPersonalHorario,
    okGuardarersonalHorario,
    finallyGuardarPersonalHorario
} = horariosPersonalSlice.actions;