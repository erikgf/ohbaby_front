import { useEffect, useState } from "react";
import { AppBar, Box, Drawer, IconButton, Toolbar, Typography } from "@mui/material"
import { MenuNavbar } from "./MenuNavbar";
import { UsuarioNavbar } from "./UsuarioNavbar";
import { DrawerMenuNavbar } from "./DrawerMenuNavbar";
import { MdMenu as MenuIcon } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { navigationNames} from "../../data/mainMenu";
import { useAuth } from "../../hooks/useAuth";
import imgLogin from '../../assets/logo-main-appbar.png';

const styles = {
    appLogo : {
      maxWidth: 185,
      mr: 2,
      display: { xs: 'none', sm: 'flex' } 
    },
    titlePage : {
      mr: 6,
      fontWeight: 500,
      fontSize: '18px',
    }
};

const drawerWidth = 240;

export const Navbar = () =>{
    const container = window !== undefined ? () => window.document.body : undefined
    const [mobileOpen, setMobileOpen] = useState(false);
    const [navbarName, setNavbarName] = useState("")
    const location = useLocation();
    const { user } = useAuth();
    const [isShowNavbar, setIsShowNavbar] = useState(true);

    const handleDrawerToggle = () => {
      setMobileOpen((prevState) => !prevState);
    };

    useEffect(()=>{
          const pathname = location.pathname.split("/")[1];
          const navigator = navigationNames(user?.id_rol).find((e)=> e.key === pathname);
          if (navigator && Boolean(navigator?.name)){
            setNavbarName(navigator?.name);
            setIsShowNavbar(Boolean(navigator?.showNavbar));
          } else {
            setIsShowNavbar(true);
            setNavbarName('Principal');
          }

    }, [location]);

    if ( !isShowNavbar) {
      return false;
    }

    return  <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                  <Toolbar>
                    <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      edge="start"
                      onClick={handleDrawerToggle}
                      sx={{ mr: 2, display: { xs: 'block', sm: 'none' } }}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Box sx={styles.appLogo}>
                      <img src={imgLogin} alt="App Dival" style={{width: '100%', borderRadius: '1em'}} />
                    </Box>
                    <Typography 
                      variant="h8" 
                      sx={styles.titlePage}>
                      {navbarName}
                    </Typography>
                    <MenuNavbar />
                    <UsuarioNavbar/>
                  </Toolbar>
                </AppBar>

                <Box component="nav" >
                  <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                      keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                      display: { xs: 'block', sm: 'none' },
                      '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                  >
                    <DrawerMenuNavbar setMobileOpen = {setMobileOpen}/>
                  </Drawer>
                </Box>
            </Box>
}