import { TableBody, TableRow, TableCell, Checkbox, Tooltip, IconButton, CircularProgress } from "@mui/material";
import { useState } from "react";

export const EnhancedTableBody = ({ isSelectableRows, 
                                            selectableOnlyOne = false,
                                            onSelectedOnlyOne = null,
                                            onDeselect = null,
                                            order, orderBy, headCells, selected, setSelected, page, rowsPerPage, filteredRows, 
                                            strechTable  = false,
                                            actionInRows  = false,
                                            onStyleToRow = null,
                                            onActions}) => {


    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }
    
    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    // This method is created for cross-browser compatibility, if you don't
    // need to support IE11, you can use Array.prototype.sort() directly
    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) {
            return order;
            }
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    const handleClick = (event, id) => {
        if (!isSelectableRows){
            return;
        }
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            if (selectableOnlyOne === true){
                newSelected = newSelected.concat(id); /* only one selection */
                if (onSelectedOnlyOne){
                    onSelectedOnlyOne(filteredRows.find(i=>i.id===id));
                }
            } else {
                newSelected = newSelected.concat(selected, id); //multiples seleccion */
            }
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
            if (selectableOnlyOne === true && onDeselect){
                onDeselect();
            }
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;

    const [rowOperating, setRowOperating] = useState(null);

    return (
        <TableBody>
            {
                Boolean(filteredRows) &&
                    stableSort(filteredRows, getComparator(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                        const isItemSelected = isSelected(row.id);
                        const labelId = `enhanced-table-checkbox-${row.id}`;

                        return (
                            <TableRow
                                hover
                                onClick={(event) => handleClick(event, row.id)}
                                role="checkbox"
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={row.id}
                                selected={isItemSelected}
                                sx={
                                    onStyleToRow  === null
                                    ? { whiteSpace: "nowrap" } 
                                    : (onStyleToRow.conditional(row) 
                                            ? {...onStyleToRow.style, whiteSpace: "nowrap"}
                                            : { whiteSpace: "nowrap"} )
                                }
                            >
                                {   isSelectableRows &&
                                    (
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                            color="primary"
                                            checked={isItemSelected}
                                            inputProps={{
                                                'aria-labelledby': labelId,
                                            }}
                                            />
                                        </TableCell>
                                    )
                                }
                                {
                                    (actionInRows) && 
                                    (
                                        <TableCell align='center'>
                                            {
                                                onActions.map(onAction=>{
                                                    let show = true;
                                                    if (onAction.onHide){
                                                        show = onAction.onHide(row);
                                                    }
                                                    
                                                    if (onAction.inRows && show){
                                                        return (
                                                            <Tooltip key={onAction.title} title={onAction.title}>
                                                                {
                                                                    ! (rowOperating && rowOperating.id === row.id && onAction.onLoading)
                                                                    ? (
                                                                        <IconButton 
                                                                            sx={ (row?._anulado != null && row._anulado  == true) 
                                                                                        ? {color: 'red', fontSize: 16, padding: .5} 
                                                                                        : {color : 'rgba(0, 0, 0, 0.87)', fontSize: 16, padding: .5}}
                                                                            onClick={(e)=>{
                                                                                e.preventDefault();
                                                                                setRowOperating(row);
                                                                                onAction.onClick(row);
                                                                            }}>
                                                                            {onAction.icon}
                                                                        </IconButton>
                                                                    )
                                                                    : (
                                                                        <IconButton>
                                                                            <CircularProgress size={28} />
                                                                        </IconButton>
                                                                    )
                                                                }
                                                            </Tooltip>
                                                        )
                                                    }
                                                })
                                            }                                        
                                        </TableCell>
                                    )
                                }

                                {
                                    headCells.map((headCol, headColIndex)=>{
                                        if (headColIndex === 0 && isSelectableRows){
                                            return (
                                                <TableCell
                                                    key = {`${headCol.id}_${row.id}`}
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    padding="none"
                                                    sx={ Boolean(strechTable) ? {fontSize: '12px'} : {}} 
                                                >
                                                    {row[headCol.id]}
                                                </TableCell>
                                            )
                                        }

                                        const colorStyle = ( (row?._anulado != null && row._anulado == true) ? 'red' : 'rgba(0, 0, 0, 0.87)');
                                        const styleCell =   {   fontSize: '12px', 
                                                                padding:'4px 6px', 
                                                                color :  colorStyle
                                                            }

                                        return <TableCell 
                                                    sx={ Boolean(strechTable) ? styleCell : { color: colorStyle} } 
                                                    key={`${headCol.id}_${row.id}`} 
                                                    align={headCol.align}
                                                >
                                                    {row[headCol.id]}
                                                </TableCell>
                                    })
                                }
                            </TableRow>
                        );
                        })
            }
            {emptyRows > 0 && (
                <TableRow
                    style={{
                    height: 33 * emptyRows,
                    }}
                >
                    <TableCell colSpan={(headCells.length + 1)} />
                </TableRow>
            )}
        </TableBody>
    )
}