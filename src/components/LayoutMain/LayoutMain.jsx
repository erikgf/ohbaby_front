import { Box } from "@mui/material"
import { Navbar } from "../Navbar/Navbar"

export const LayoutMain = ({children}) =>{
    return <>
        <Navbar />
        <Box p={2}>
            {children}
        </Box>
    </>
}