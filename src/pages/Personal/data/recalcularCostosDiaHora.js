const DECIMALES = 3;
const CERO = "0.000";

export const recalcularCostosDiaHora = ( salario, diasTrabajo, horasSemana) => {
    const diasEnSemana = 6;
    if (diasTrabajo == 0){
        return {
            costoDia: CERO,
            costoHora: CERO,
        };
    }

    const costoDia = salario / diasTrabajo;
    const sueldoSemanal = parseFloat( costoDia * diasEnSemana);

    if (horasSemana == 0){
        return {
            costoDia : parseFloat(costoDia).toFixed(DECIMALES),
            costoHora: CERO,
            horasDia : CERO
        };
    }

    const costoHora = parseFloat(sueldoSemanal / horasSemana).toFixed(DECIMALES);
    const horasDia = parseFloat(horasSemana / diasEnSemana).toFixed(DECIMALES);

    return {
        costoDia : parseFloat(costoDia).toFixed(DECIMALES),
        costoHora, horasDia
    };
};