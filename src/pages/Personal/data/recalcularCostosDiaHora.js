export const recalcularCostosDiaHora = ( salario, diasTrabajo, horasSemana) => {
    const diasEnSemana = 6;
    if (diasTrabajo == 0){
        return {
            costoDia: "0.00",
            costoHora: "0.00",
        };
    }

    const costoDia = salario / diasTrabajo;
    const sueldoSemanal = parseFloat( costoDia * diasEnSemana);

    if (horasSemana == 0){
        return {
            costoDia : parseFloat(costoDia).toFixed(2),
            costoHora: "0.00",
            horasDia : "0.00"
        };
    }

    const costoHora = parseFloat(sueldoSemanal / horasSemana).toFixed(2);
    const horasDia = parseFloat(horasSemana / diasEnSemana).toFixed(2);

    return {
        costoDia : parseFloat(costoDia).toFixed(2),
        costoHora, horasDia
    };
};