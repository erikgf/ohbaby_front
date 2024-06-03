export const recalcularCostosDiaHora = ( salario, diasTrabajo, horasDia) => {
    if (diasTrabajo == 0){
        return {
            costoDia: "0.00",
            costoHora: "0.00"
        }
    }

    const costoDia = parseFloat((salario / diasTrabajo) ?? 1).toFixed(2);

    if (horasDia == 0){
        return {
            costoDia,
            costoHora: "0.00"
        }
    }
    const costoHora = parseFloat((costoDia / horasDia) ?? 1).toFixed(2);

    return {
        costoDia, costoHora
    };
};