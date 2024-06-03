import { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Menu, MenuItem, Typography } from "@mui/material";
import { MdKeyboardArrowDown as KeyboardArrowDownIcon  } from 'react-icons/md';
import { LoadingButton } from "@mui/lab";

export const ButtonsActions = ({title, options = []}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleAction = (onAction) => {
        if (onAction &&  typeof onAction === "function"){
            onAction();
        }
    };

    return <Box sx={{
                    position: 'absolute',
                    right: 16,
                    top: 16,
                }}>
                {
                    options.length === 1 
                        ?   <LoadingButton
                                    color = {options[0].color ?? "primary"}
                                    type= {options[0].type ?? "button"}
                                    variant="contained"
                                    onClick={options[0].onAction && (()=>{handleAction(options[0]?.onAction)})}
                                    disabled={options[0].disabled}>
                                    {
                                        options[0].loading 
                                        ? <><Typography variant="caption">Cargando...</Typography> <CircularProgress size={15} /></>
                                        : <Typography >{options[0].title}</Typography>
                                    }
                            </LoadingButton>
                        :   <>
                                <Button
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    variant="contained"
                                    disableElevation
                                    onClick={handleClick}
                                    endIcon={<KeyboardArrowDownIcon />}
                                >
                                    {title}
                                </Button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    {
                                        options?.map( o => {
                                        return   <MenuItem key={o.title} 
                                                            onClick={()=>{handleAction(o?.onAction)}}
                                                            disabled={o.disabled}>
                                                            {
                                                                o.loading 
                                                                ? <><Typography variant="caption">Cargando...</Typography> <CircularProgress size={15} /></>
                                                                : <Typography >{o.title}</Typography>
                                                            }
                                                    </MenuItem>
                                        })
                                    }
                                </Menu>
                            </>
                }
                
            </Box>
};