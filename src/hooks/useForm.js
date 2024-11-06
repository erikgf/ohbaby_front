import { useState } from "react";

export const useForm = ({defaultValuesForm})=>{
    const [valuesForm, setValuesForm] = useState(defaultValuesForm);
    const assignValueForm = (key, value) =>{
        setValuesForm({
            ...valuesForm, 
            [key] : value
        });
    };

    const resetValueForm = (valuesFormToReset = defaultValuesForm)=>{
        setValuesForm(valuesFormToReset);
    };

    return {
        valuesForm,
        assignValueForm,
        resetValueForm
    }
};