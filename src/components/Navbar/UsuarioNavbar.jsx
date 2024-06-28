import { useState } from "react";
import { Box, IconButton, Menu, MenuItem,  } from "@mui/material";
import { MdMoreVert as MoreIcon } from 'react-icons/md'
import { useAuth } from "../../hooks/useAuth";
import { useFormCambiarClave } from "../../pages/_common/useFormCambiarClave";

export const UsuarioNavbar = ()=>{
    const { user, onCerrarSesion } = useAuth();
    const [anchorMenuEl, setAnchorMenuEl] = useState(null);
    const { onAbrirModal } = useFormCambiarClave();

    const handleMenu = (event) => {
        setAnchorMenuEl(event.currentTarget);
    };
     
    const handleMenuClose = () => {
        setAnchorMenuEl(null);
    };

    const handleCerrarSesion = ()=>{
        onCerrarSesion();
    };

    const handleCambiarClave = ()=>{
        onAbrirModal({ name: user.name, id: user.id });
    };

    return  <Box>
                {/*
                <Tooltip title="Notificaciones" placement="top-start">
                    <IconButton
                        size="large"
                        aria-label="Notificaciones"
                        color="inherit"
                        onClick={handleIrAtrasados}
                    >
                        <Badge badgeContent={cantidadAtrasados} color="error">
                            <NotificationIcon />
                        </Badge>
                    </IconButton>
                </Tooltip>
                */}
                <IconButton
                    size="large"
                    aria-label="Menú"
                    edge="end"
                    color="inherit"
                    onClick={handleMenu}
                >
                    <MoreIcon />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorMenuEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorMenuEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem dense divider>{user?.name}</MenuItem>
                    <MenuItem dense divider onClick={handleCambiarClave}>Cambiar Clave</MenuItem>
                    <MenuItem dense onClick={handleCerrarSesion}>Cerrar Sesión</MenuItem>
                </Menu>
            </Box>
}