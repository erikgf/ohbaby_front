import { Autocomplete, TextField } from "@mui/material";

export const AutocompleteOnline = ({
    value = null, setValue,
    setBuscarItemTerm,
    loadingItems = false,
    items = [],
    disabled = false,
    required = false,
    label,
    autoFocus
}) => {
   return <Autocomplete
                    value={ value }
                    onChange={(event, newValue) => {
                        newValue != null
                            ? setValue(newValue)
                            : setValue(null)
                    }}
                    onInputChange = {(event, newValue, reason) =>{
                        if (reason != "reset"){
                            setBuscarItemTerm(newValue);
                        }
                    }}
                    isOptionEqualToValue={(option, value) => {
                        return option?.id === value?.id
                    }}
                    loading = { loadingItems }
                    loadingText = {"Cargando..."}
                    noOptionsText = {"Sin resultados"}
                    disablePortal
                    disabled={ disabled }
                    size='small'
                    getOptionLabel = {(option) => (option ? `${option.descripcion}` : "")}
                    options={ items||[]}
                    fullWidth
                    renderInput={(params) => <TextField {...params} required={required} autoFocus = { Boolean(autoFocus) } label={label} />}
                    />
}