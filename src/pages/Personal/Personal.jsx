import { FormRegister } from "./components/FormRegister";
import { ListaPersonal } from "./components/ListaPersonal";
import { ModalRegistroContratos } from "./components/ModalRegistroContratos";

export const Personal = ()=>{

    return <>
            <ListaPersonal />
            <FormRegister />
            <ModalRegistroContratos />
        </>
}