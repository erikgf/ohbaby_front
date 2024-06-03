import { useDispatch, useSelector } from "react-redux";
import { clearErrorLogin } from "../store/auth/authSlice";
import { useEffect } from "react";
import { cerrandoSesion, iniciandoSesion } from "../store/auth/authThunks";

export const useAuth = () => {
    const dispatch = useDispatch();
    const { user, token, cargandoLogin, messageLogin } = useSelector(state=>state.auth);

    const onIniciarSesion = async ({username, password}) => {
        dispatch(iniciandoSesion({username, password}));
    };

    const onCerrarSesion = ()=>{
        dispatch( cerrandoSesion() );
    };

    useEffect(()=>{
        let timer = setTimeout(()=>{
            dispatch(clearErrorLogin());
        }, 4000);
        return ()=>{
            if (timer)
                clearTimeout(timer);
        }
    }, [messageLogin]);

    return {
        //* Propiedades
        user,
        token,
        isLoggedIn  : Boolean(user),
        cargandoLogin,
        messageLogin,
        //* Métodos
        onIniciarSesion, onCerrarSesion
    }
}