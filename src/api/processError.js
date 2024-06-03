import { saveStorage } from "../assets/localStorager";
import { Response } from "./constants";

export const processError = (e)=>{
    console.log({e});

    const response = e?.response;

    if (!Boolean(response)){
        const {code} = e;
        if (code === Response.HTTP_ERROR_NETWORK){
            return { text : "No puedo conectarme con el servidor.", severity: "error"}
        }
    }

    const status = response?.status;

    if (status === Response.HTTP_ERROR){
        return { text : response.data.message, severity: "error"}
    }

    if (status === Response.HTTP_NOVALIDO){
        return { text : response.data.message, severity: "error"}
    }

    if (status === Response.HTTP_NOAUTORIZADO){
        saveStorage(null);
        window.location.reload();
        return { text : "Sin acceso. Error 401", severity: "error"}
    }

    return {text : JSON.stringify(e), severity: "error"};
};