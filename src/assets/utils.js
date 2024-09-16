export const getHoy = ()=>{
    return getDateFromJSDate(new Date());
};

export const getHora = (d = new Date())=>{
    let hora = d.getHours(),
        min = d.getMinutes(),
        seg = d.getSeconds();

    hora = (hora >= 10)  ? hora : (`0${hora}`);
    min = (min >= 10)  ? min : (`0${min}`);
    seg = (seg >= 10)  ? seg : (`0${seg}`);

    return  `${hora}:${min}:${seg}`;
};

export const getDateFromJSDate = (date) => {
    let anio = date.getFullYear(),
        mes = date.getMonth()+1,
        dia = date.getDate();

    mes = (mes >= 10)  ? mes : (`0${mes}`);
    dia = (dia >= 10)  ? dia : (`0${dia}`);

    return `${anio}-${mes}-${dia}`;
};

export const getDateObjectFromJSDate = (date) => {
    let anio = date.getFullYear(),
        mes = date.getMonth()+1,
        dia = date.getDate();

    mes = (mes >= 10)  ? mes : (`0${mes}`);
    dia = (dia >= 10)  ? dia : (`0${dia}`);

    return {
        anio, mes, dia
    };
};


export const getDiasSemana = ()=>{
    return ['Domingo',"Lunes", "Martes", "Miércoles", "Jueves","Viernes","Sábado"];
}

export const getMeses = ()=>{
    return ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"];
}

export const getDiasFromNumDias = (cadenaNumDias)=>{
    if (!Boolean(cadenaNumDias)){
        return "";
    }
    const arregloNumDias = cadenaNumDias.split(",");
    const diasSemana = getDiasSemana();
    return arregloNumDias.map(numDia => {
        return diasSemana[parseInt(numDia)];
    }).join(", ");
};

export const getFormalDate = () =>{
    const ahora = new Date();
    const { anio, dia } = getDateObjectFromJSDate(ahora);
    const diaSemana = ahora.getDay();
    const mes = ahora.getMonth();
    //Obtener día, obtener mes, obtener
    return `${getDiasSemana()[diaSemana]}, ${dia} de ${getMeses()[mes]} del ${anio}`;
};

export const getSimpleRound = (number, float = 1) => {
    if (isNaN(number) || number == null){
        console.error("Número no válido.");
        return null;
    }

    if (float <= 0){
        console.error("Flotante menor que 0.")
        return null;
    }

    const multiplicadorDecimal = Math.pow(10, float);
    return Math.round(number * multiplicadorDecimal) / multiplicadorDecimal;
};