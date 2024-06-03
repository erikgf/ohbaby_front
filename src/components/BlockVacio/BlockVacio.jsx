import { MdListAlt as ListAlt } from 'react-icons/md';
import { Box } from "@mui/material";

const styles = {
    boxIconoVacio : {
        display:'flex', alignItems:'center', justifyContent:'center', opacity: 0.6
    }      
};

export const BlockVacio = ( { height= 400, title = 'Sin Datos' })=>{
    return  <Box sx={styles.boxIconoVacio} height ={height - 50}>
                <ListAlt size={33}/>
                <div>{title}</div>
            </Box>
}