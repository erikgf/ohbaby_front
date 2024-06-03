import { useEffect, useState} from 'react';
import { Box, Table, TableContainer, TablePagination, Paper } from '@mui/material';

import {EnhancedTableToolbar} from './EnhancedTableToolbar';
import {EnhancedTableHead} from './EnhancedTableHead';
import {EnhancedTableBody} from './EnhancedTableBody';
import {EnhancedTableBodyLoading} from './EnhancedTableBodyLoading';
import {EnhancedTableBodyEmpty} from './EnhancedTableBodyEmpty';

export const TableManager = ({
      tableTitle = null, rows, headCells, 
      selectableOnlyOne = false,
      onSelectedOnlyOne,
      onDeselect,
      registersPerPage = 10,
      loadingData = false,
      onActions = [],
      isSearchAllowed = true,
      isSelectableRows = true,
      strechTable = false,
      children,
      orderByDefault = 'name',
      minHeight = null,
      onStyleToRow //= {style, conditional}
    }) => {

  const [filteredRows, setFilteredRows] = useState(rows);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState(orderByDefault);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(registersPerPage);

  useEffect(()=>{
    setFilteredRows(rows);
    setSelected([]);
  }, [rows]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (!filteredRows){
      setSelected([]);
      return;
    }
    if (event.target.checked) {
      const newSelected = filteredRows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const requestSearch = (searchedVal) => {
    if (searchedVal.length <= 0){
      setFilteredRows(rows);
      return;
    }

    const filteredRows = rows.filter((row) => {
      let rowSearcherString = Object.values(row).splice(1).reduce((a,b)=>{
        if (typeof a === 'string'){
          return a.concat(' ').concat(b);
        }
      }, '');
      return rowSearcherString.toLowerCase().includes(searchedVal.toLowerCase());
    });

    setFilteredRows(filteredRows);
  };

  const actionInRows = onActions.findIndex((e)=>e.inRows)  !== -1;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar
            tableTitle={tableTitle} 
            registerSelected={selected}
            isSearchAllowed = { isSearchAllowed }
            requestSearch = {requestSearch}
            onActions = { onActions }
          >
          {children}
        </EnhancedTableToolbar>
        <TableContainer
            sx={ minHeight ? {minHeight: minHeight, height: minHeight} : { width: 'calc(100% - 32px)', padding: '0px 16px'}}
            >
          <Table
            aria-labelledby={tableTitle}
            size='small'
          >
            <EnhancedTableHead
              isSelectableRows = { isSelectableRows }
              headCells= {headCells}
              strechTable = { strechTable }
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={filteredRows ? filteredRows.length : 0}
              actionInRows = { actionInRows }
            />
            {
              filteredRows &&
              (
                !loadingData
                    ? (
                      filteredRows.length > 0 
                        ?<EnhancedTableBody
                          headCells= {headCells}
                          strechTable = { strechTable }
                          isSelectableRows = { isSelectableRows }
                          selectableOnlyOne = { selectableOnlyOne }
                          onSelectedOnlyOne = { onSelectedOnlyOne }
                          onDeselect = { onDeselect }
                          order = {order}
                          orderBy = {orderBy} 
                          selected = {selected} 
                          setSelected = {setSelected}
                          page = {page} 
                          rowsPerPage = {rowsPerPage} 
                          filteredRows ={filteredRows}
                          actionInRows = { actionInRows }
                          onStyleToRow = { onStyleToRow }
                          onActions = { onActions }
                        />
                      : <EnhancedTableBodyEmpty height = {minHeight} />
                    )
                    : <EnhancedTableBodyLoading />
              )
            }
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 30, 50]}
          labelRowsPerPage = {'Registros por página:'}
          component="div"
          count={filteredRows ? filteredRows.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}