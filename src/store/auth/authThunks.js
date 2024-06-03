import { logIn, logOut } from "../../services";
import { errorLogin, okLogin, startLogOut, startLogin } from "./authSlice";

export const iniciandoSesion = ({username, password})=>{
    return async ( dispatch )=>{
        dispatch( startLogin() );
        try {
            const data = await logIn({username: username.trim(), password});
            dispatch( okLogin(data) );
        } catch (error) {
            console.error({error});
            const { response } = error;
            dispatch(errorLogin(response?.data?.message));
        }
    }
};


export const cerrandoSesion = ()=>{
    return async ( dispatch )=>{
        try {
            await logOut();
        } catch (error) {
            console.error({error});
        } finally {
            dispatch( startLogOut() );
        }
    }
};