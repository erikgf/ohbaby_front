import { getMeses, getSimpleRound } from "../../../assets/utils";

const listaMeses = getMeses();

export const useHandleCuotas = () => {
    const onAgregarCuotas = (cantidadCuotas, cuotas) => {
        let cuotasNuevas = [];
        const time = new Date().getTime();

        for (let index = 0; index < cantidadCuotas; index++) {
            cuotasNuevas.push({
                id: time + index,
                backend: false,
                fecha_cuota: "",
                motivo_registro :"",
                monto_cuota: "0.00",
            })
        }

        return [
            ...cuotas,
            ...cuotasNuevas
        ]
    };

    const onRefrescarFechaCuotas = (fecha_registro, cuotas) => {
        const objFecha = new Date(fecha_registro);
        let numeroMesFecha = objFecha.getMonth() + 1;
        const anioFecha = objFecha.getFullYear();

        return cuotas?.map( (item, index) => {
            let numeroMesFechaFor = numeroMesFecha + index;
            const mesFechaCuota = listaMeses[numeroMesFechaFor >= 12 ? numeroMesFechaFor % 12 : numeroMesFechaFor];
            const anioFechaCuota = anioFecha + (numeroMesFechaFor >= 12 ? parseInt(numeroMesFechaFor / 12) : 0);
            return {
                ...item, 
                fecha_cuota:`${mesFechaCuota} ${anioFechaCuota}`,
                monto_cuota: parseFloat(item.monto_cuota).toFixed(2)
            }
        });
    };

    const onQuitarCuota = (cuota, fecha_registro, cuotas ) => {
        const objFecha = new Date(fecha_registro);
        let numeroMesFecha = objFecha.getMonth() + 1;
        const anioFecha = objFecha.getFullYear();

        return cuotas.filter( item => cuota.id != item.id).map( (item, index) => {
            let numeroMesFechaFor = numeroMesFecha + index;
            const mesFechaCuota = listaMeses[numeroMesFechaFor >= 12 ? numeroMesFechaFor % 12 : numeroMesFechaFor];
            const anioFechaCuota = anioFecha + (numeroMesFechaFor >= 12 ? parseInt(numeroMesFechaFor / 12) : 0);
            return {
                ...item, fecha_cuota:`${mesFechaCuota} ${anioFechaCuota}`
            }
        })
    };

    const onActualizarCuota = (newCuota, cuotas ) => {
        return cuotas.map( item => {
            if (newCuota.id == item.id){
                return newCuota;
            }
            return item;
        })
    };

    const onDistribuirEquitativamente = (monto_cuota, cuotas) => {
        const totalMontos = monto_cuota ?? 0.00;
        const cantidadCuotas = cuotas.length;
        const montoIndividual = getSimpleRound(totalMontos / cantidadCuotas, 2);
        const montoSobrante = getSimpleRound(totalMontos - getSimpleRound(montoIndividual * cantidadCuotas, 2), 2);

        return cuotas.map( (item, index) => {
            if (cantidadCuotas - 1 === index){
                return {
                    ...item,
                    monto_cuota: (montoIndividual + montoSobrante).toFixed(2)
                };
            }
            return {
                ...item,
                monto_cuota : montoIndividual.toFixed(2)
            }
        });
    };

    const onActualizarMontoTotal = (cuotas) => {
        let totalCuotas = 0.00;

        cuotas?.forEach( item => {
            let montoRegistrado = parseFloat(item.monto_cuota);
            totalCuotas += isNaN(montoRegistrado) ? 0 : montoRegistrado;
        })

        if (isNaN(totalCuotas)) 
            return 0;

        return totalCuotas;
    };

    return {
        onAgregarCuotas,
        onQuitarCuota,
        onActualizarCuota,
        onDistribuirEquitativamente,
        onActualizarMontoTotal,
        onRefrescarFechaCuotas
    }
};