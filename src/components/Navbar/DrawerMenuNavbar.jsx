import { useState } from "react";
import { Box, Divider, List, ListItem, ListItemButton, ListItemText, MenuItem, Typography } from "@mui/material"
import { AppBarMenu } from "../AppBarMenu/AppBarMenu";
import { getMenuMain } from "../../data/mainMenu";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import imgLogin from '../../assets/logo-main.jpeg';

export const DrawerMenuNavbar = ({setMobileOpen}) => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const navigate = useNavigate();
    const { user } = useAuth();
    
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleClickNav = (event, idMenu) => {
        setAnchorElNav({anchor: event.currentTarget, idMenu});
    };

    const handleNavigateTo = (toUrl)=>{
        navigate(toUrl);
        handleCloseNavMenu();
        setMobileOpen(false);
    };

    return <Box sx={{ textAlign: 'center'}}>
            <List>
                <img src={imgLogin} style={{width: "calc(100% - 32px)", paddingTop: 16}} alt="Logo" />
                <Typography variant="h6" sx={{ my: 2 }} color={"primary"}>MENÚ</Typography>
                <Divider />
                {getMenuMain(user.id_rol).map((menu, index) => (
                    <ListItem  key={menu.name} disablePadding sx={{backgroundColor: "#0068a1", color: "white"}}>
                        <ListItemButton
                            id={`drawer-menu-customized-button-${index}`}
                            aria-controls={anchorElNav?.anchor ? `drawer-menu-customized-button-${index}` : undefined}
                            aria-haspopup="true"
                            aria-expanded={anchorElNav?.anchor ? 'true' : undefined}
                            onClick={(e)=>{
                                handleClickNav(e, menu.name)
                            }}>
                            <ListItemText primary={menu.name} />
                        </ListItemButton>
                        <AppBarMenu
                            id={`drawer-menu-customized-menu-${index}`}
                            MenuListProps={{
                            'aria-labelledby': `drawer-menu-customized-button-${index}`,
                            }}
                            anchorEl={anchorElNav?.anchor}
                            open={ Boolean(anchorElNav) && menu.name === anchorElNav.idMenu}
                            onClose={handleCloseNavMenu}
                            >
                            {
                            menu.children.map(menuChildren => (
                                <MenuItem key={menuChildren.name}  onClick={()=>{handleNavigateTo(menuChildren.url)}} disableRipple>
                                    <menuChildren.icon style={{paddingRight:12}} />
                                    {menuChildren.name}
                                </MenuItem>
                            ))
                            }
                        </AppBarMenu>
                    </ListItem>
                ))}
            </List>
        </Box>
}