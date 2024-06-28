import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { personalSlice } from "./personal/personalSlice";
import { uiSlice } from "./ui/uiSlice";
import { horariosSlice } from "./horarios/horariosSlice";
import { horariosPersonalSlice } from "./horariosPersonal/horariosPersonalSlice";
import { usuarioSlice } from "./usuarios/usuarioSlice";
import { cambiarClaveSlice } from "./cambiarClave/cambiarClaveSlice";

export const store = configureStore({
    reducer : {
        auth: authSlice.reducer,
        cambiarClave: cambiarClaveSlice.reducer,
        ui: uiSlice.reducer,
        personal : personalSlice.reducer,
        horarios: horariosSlice.reducer,
        horariosPersonal: horariosPersonalSlice.reducer,
        usuario: usuarioSlice.reducer
    }
});