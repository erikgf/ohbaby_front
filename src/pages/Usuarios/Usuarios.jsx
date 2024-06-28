import { FormCambiarClave } from "../_common/FormCambiarClave";
import { FormRegister } from "./components/FormRegister";
import { ListaRegistros } from "./components/ListaRegistros";

export const Usuarios = ()=>{
    return  <>
                <ListaRegistros />
                <FormRegister />
                <FormCambiarClave />
            </>
}