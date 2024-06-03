import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { personalSlice } from "./personal/personalSlice";
import { uiSlice } from "./ui/uiSlice";
import { horariosSlice } from "./horarios/horariosSlice";
import { horariosPersonalSlice } from "./horariosPersonal/horariosPersonalSlice";

export const store = configureStore({
    reducer : {
        auth: authSlice.reducer,
        ui: uiSlice.reducer,
        personal : personalSlice.reducer,
        horarios: horariosSlice.reducer,
        horariosPersonal: horariosPersonalSlice.reducer,
    }
});