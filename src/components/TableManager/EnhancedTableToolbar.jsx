import { useState, useEffect, useRef } from "react";
import { alpha } from '@mui/material/styles';
import { Toolbar, Tooltip, Typography, IconButton, Box, FormControl, Input, InputAdornment } from "@mui/material";
import { MdSearch as SearchIcon, MdSearchOff as SearchOffIcon } from 'react-icons/md';

export const  EnhancedTableToolbar = ({ onActions,
                                                isSearchAllowed,
                                                requestSearch = null, 
                                                registerSelected, 
                                                tableTitle  = null,
                                                children
    })  => {

    const numSelected = registerSelected.length;

    const inputRef = useRef(null);
    const [isSearching, setIsSearching] = useState(false);

    const setSearchingMode = () => {
        if (isSearching && requestSearch){
            requestSearch("");
        }
    
        setIsSearching((prevIsSearching)=>{
            return !prevIsSearching;
        });
    };

    useEffect(() => {
        if (isSearching){
            const inputs = inputRef.current.getElementsByTagName("input");
            if (inputs.length){
                inputs[0].focus();
            }
        }
        
    }, [isSearching, inputRef]);

    return (
            <>   
                {             
                (tableTitle || onActions.filter(i=>i.inToolbar).length > 0) &&
                    <Toolbar
                        sx={{
                            pl: { sm: 2 },
                            pr: { xs: 1, sm: 1 },
                            ...(numSelected > 0 && {
                            bgcolor: (theme) =>
                                alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                            }),
                            }}
                        >
                        {numSelected > 0 ? (
                            <Typography
                                sx={{ flex: '1 1 100%' }}
                                color="inherit"
                                variant="subtitle1"
                                component="div"
                                >
                                {numSelected} seleccionado(s)
                            </Typography>
                            ) : 
                            <Typography
                                sx={{ flex: '1 1 100%' }}
                                variant="h6"
                                id="tableTitle"
                                component="div"
                                >
                                {Boolean(tableTitle) && tableTitle}
                            </Typography>
                        }

                        {
                            isSearchAllowed &&
                            <Tooltip title="Buscar">
                                <IconButton onClick={setSearchingMode}>
                                { isSearching 
                                    ? <SearchOffIcon /> 
                                    : <SearchIcon />
                                }
                                </IconButton>
                            </Tooltip>
                        }
                        
                        {
                            /* {inToolbar, hidden, onOnlySelection, noSelection, title, icon, onClick, inRows, onLoading } */
                            onActions.map((onAction)=>{
                                if (!onAction.inToolbar) return;
                                if (onAction?.hidden ? onAction.hidden : false) return;
                                if ((onAction.onOnlySelection && numSelected === 1) ||
                                        (!onAction.onOnlySelection && numSelected > 0 && !onAction.noSelection )){
                                    return (
                                        <Tooltip key={onAction.title} title={onAction.title}>
                                            <IconButton onClick={(e)=>{
                                                e.preventDefault();
                                                onAction.onClick(onAction.onOnlySelection ? registerSelected[0]  : registerSelected);
                                            }}>
                                                {onAction.icon}
                                            </IconButton>
                                        </Tooltip>
                                    );
                                }

                                if (onAction.noSelection && numSelected <= 0){
                                    return (
                                        <Tooltip key={onAction.title} title={onAction.title}>
                                            <IconButton onClick={(e)=>{
                                                e.preventDefault();
                                                onAction.onClick();
                                            }}>
                                                {onAction.icon}
                                            </IconButton>
                                        </Tooltip>
                                    );
                                }
                            })
                        }
                    </Toolbar>
                }                
                {isSearching &&
                    <Box sx={{ ml: 2, mr: 2, mb: 2}}  >
                        <FormControl fullWidth variant="standard">
                        <Input
                            ref= {inputRef}
                            type="search"
                            size="small"
                            onChange={(e)=>{requestSearch(e.target.value)}}
                            placeholder="Buscar..."
                            startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                            }
                        />
                        </FormControl>  
                    </Box>
                } 
                {children}
            </>
    );
}