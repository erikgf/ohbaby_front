import { Box, CircularProgress } from "@mui/material"

export const CircularLoader = ({height = 250})=>{
    return <Box sx={{height, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <CircularProgress />
    </Box>
}