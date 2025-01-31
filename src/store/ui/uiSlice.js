import { createSlice } from "@reduxjs/toolkit";
import { processError } from "../../api/processError";

export const uiSlice = createSlice({
   name : 'ui',
   initialState : {
        message: null,
   },
   reducers : {
        setMessage : ( state , { payload : message } ) => {
            state.message = message;
        },
        setMessageOK : ( state , { payload : text } ) => {
            state.message = {
                text,
                severity: "success",
            };
        },
        setMessageError : ( state, { payload : error }) => {
            state.message = processError(error);
        },
        unsetMessage : ( state )=>{
            state.message = null;
        },
   }
});

export const {
    setMessage,
    setMessageError,
    setMessageOK,
    unsetMessage
} = uiSlice.actions;