import { TableHead, TableRow, TableCell, Checkbox, TableSortLabel, Box } from "@mui/material";
import { visuallyHidden } from '@mui/utils';

export const EnhancedTableHead = ({ isSelectableRows, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headCells, 
                          strechTable = false,
                          actionInRows  = false }) => {
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          { isSelectableRows &&
            (
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  indeterminate={numSelected > 0 && numSelected < rowCount}
                  checked={rowCount > 0 && numSelected === rowCount}
                  onChange={onSelectAllClick}
                  inputProps={{
                    'aria-label': 'seleccionar todos',
                  }}
                />
              </TableCell>
            )
          }

          {
            actionInRows &&
              ( 
                <TableCell sx={Boolean(strechTable) ? {fontSize: '12px', padding:'2px 4px'} : {}} padding='normal' align='center'>OPC</TableCell>
              )
          }
          
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.align}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
              sx={Boolean(strechTable) ? {fontSize: '12px', padding:'2px 4px'} : {}} 
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
                sx={{fontSize: '9.5px', fontWeight:'bold', lineHeight:1.5}}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'ordenar descendiente' : 'ordenar ascendente'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }