import { useState } from "react";
import { Box, Button,  MenuItem } from "@mui/material"
import { MdKeyboardArrowDown as  KeyboardArrowDownIcon } from 'react-icons/md'
import { AppBarMenu } from "../AppBarMenu/AppBarMenu";
import { getMenuMain } from "../../data/mainMenu";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const MenuNavbar = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const { user } = useAuth();
    const navigate = useNavigate();
    
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
  
    const handleClickNav = (event, idMenu) => {
        setAnchorElNav({anchor: event.currentTarget, idMenu});
    };

    const handleNavigateTo = (toUrl)=>{
        navigate(toUrl);
        handleCloseNavMenu();
    };

    return <Box sx={{ flexGrow: 1,  display: 'flex'}}>
            {
            getMenuMain(user.id_rol).map((menu, index)=>{
                return <Box key = {menu.name} sx={{ display: {xs: 'none', sm: 'block'}}}>
                    <Button
                        id={`menu-customized-button-${index}`}
                        aria-controls={anchorElNav?.anchor ? `menu-customized-button-${index}` : undefined}
                        aria-haspopup="true"
                        aria-expanded={anchorElNav?.anchor ? 'true' : undefined}
                        variant="contained"
                        disableElevation
                        onClick={(e)=>{
                            handleClickNav(e, menu.name)
                        }}
                        endIcon={<KeyboardArrowDownIcon />}
                    >
                        {menu.name}
                    </Button>
                    <AppBarMenu
                        id={`menu-customized-menu-${index}`}
                        MenuListProps={{
                        'aria-labelledby': `menu-customized-button-${index}`,
                        }}
                        anchorEl={anchorElNav?.anchor}
                        open={ Boolean(anchorElNav) && menu.name === anchorElNav.idMenu}
                        onClose={handleCloseNavMenu}
                        >
                        {
                        menu.children.map(menuChildren => (
                            <MenuItem key={menuChildren.name} onClick={()=>{handleNavigateTo(menuChildren.url)}} disableRipple>
                                <menuChildren.icon style={{paddingRight:12}} />
                                {menuChildren.name}
                            </MenuItem>
                        ))
                        }
                    </AppBarMenu>
                </Box>
            })
            }
        </Box>
}