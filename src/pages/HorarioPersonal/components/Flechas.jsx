import { Box, IconButton } from "@mui/material"
import { MdArrowRight as ArrowRightIcon, MdArrowLeft as ArrowLeftIcon } from 'react-icons/md';
import { usePersonalGeneral } from "../hooks/usePersonalGeneral";
import { usePersonalHorario } from "../hooks/usePersonalHorario";

const styles = {
    boxFlecha : {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    }
}

export const Flechas = () => {

    const { personalGeneral, onMoverPersonalGeneralAAsociado } = usePersonalGeneral();
    const { personal, onMoverAsociadoAPersonalGeneral } = usePersonalHorario();

    if (!Boolean(personal)){
        return false;
    }

    return  <Box sx={styles.boxFlecha}>
                <IconButton onClick={()=>{onMoverPersonalGeneralAAsociado()}} disabled = { !Boolean(personalGeneral?.filter( item => item.seleccionado )?.length) } color="success"><ArrowLeftIcon fontSize={48} /></IconButton>
                <IconButton onClick={()=>{onMoverAsociadoAPersonalGeneral()}} disabled = { !Boolean(personal?.filter( item => item.seleccionado )?.length) } color="error"><ArrowRightIcon fontSize={48} /></IconButton>
            </Box>
}