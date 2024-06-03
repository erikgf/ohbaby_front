import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(item, itemsSelected = [], theme) {
  return {
    fontWeight:
        itemsSelected.includes( _item => _item.id === item.id)
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const MultiSelect = ({items = [], itemLabel = "name", label = "", value = [], onChange = null}) => {
    const theme = useTheme();
  
    const handleChange = (event) => {
      const {
        target: { value : eventValue },
      } = event;

      onChange &&
        onChange(  typeof eventValue === 'string' ? eventValue.split(',') : eventValue,);

    };
  
    return  <FormControl sx={{ mt: 1, width: '100%'}}>
                <InputLabel id="demo-multiple-chip-label">{label}</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={value}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label={label} />}
                    renderValue={(selected) => {
                    return <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map(item => (
                                    <Chip color="primary" key={item.id} label={item[itemLabel]} />
                                ))}
                            </Box>
                    }}
                    MenuProps={MenuProps}
                >
                    {
                        items.map((item) => {
                            const name = item[itemLabel];
                            return  <MenuItem key={item.id} value={item} style={getStyles(item, value, theme)}>
                                        {name}
                                    </MenuItem>
                        })
                    }
                </Select>
            </FormControl>
};






export default MultiSelect;