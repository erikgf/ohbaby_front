import { FormRegister } from "./components/FormRegister"
import { ListaHorarios } from "./components/ListaHorarios"
import { ModalRegistroDetalles } from "./components/ModalRegistroDetalles"

export const Horario = ()=>{
    return <>
            <ListaHorarios />
            <FormRegister/>
            <ModalRegistroDetalles/>
        </>
}