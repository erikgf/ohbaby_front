export const horarios = [
    { 
        id: 1, 
        descripcion: "HORARIO 1", 
        detalles: [
            {
                id: 1, horaInicio: "10:00", horaFin: "13:00", dias: [ { id: 1, descripcion: "Lunes"}, {id: 2, descripcion: "Martes" } ],
                id: 2, horaInicio: "10:00", horaFin: "13:00", dias: [ { id: 4, descripcion: "Jueves"}, {id: 5, descripcion: "Viernes" } ],
            }
        ],
        selected: false,
        gestionando: false,
    },
    { 
        id: 2, 
        descripcion: "HORARIO 2", 
        detalles: [
            {
                id: 1, horaInicio: "14:00", horaFin: "20:00", dias: [ { id: 1, descripcion: "Lunes"}, {id: 2, descripcion: "Martes" }, {id: 3, descripcion: "Miércoles" }],
                id: 2, horaInicio: "14:00", horaFin: "20:00", dias: [ { id: 3, descripcion: "Miércoles"} , {id: 5, descripcion: "Viernes" } ],
            }
        ],
        selected: true,
        gestionando: true,
    }
];