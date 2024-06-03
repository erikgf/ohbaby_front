import React, {Fragment, useEffect, useState} from "react";
import { useSnackbar } from 'notistack';
import IconButton from "@mui/material/IconButton";
import { MdClose as CloseIcon } from 'react-icons/md';

const useNotification = () => {
    const [conf, setConf] = useState({});
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const action = key => (
        <Fragment>
            <IconButton onClick={() => { closeSnackbar(key) }}>
                <CloseIcon />
            </IconButton>
        </Fragment>
    );
    
    useEffect(()=>{
        if(conf?.text){
            let variant = 'info';
            if(conf.severity){
                variant = conf.severity;
            }
            enqueueSnackbar(conf.text, {
                variant,
                autoHideDuration: conf?.time ?? 5000,
                action
            });
        }
    },[conf]);

    return setConf;
};

export default useNotification;
