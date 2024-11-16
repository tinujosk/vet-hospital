import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import Search from '../components/Search';

const dateFields = ['createdAt', 'updatedAt', 'appointmentDate'];

// Generic Table which is configurable to render all tables in the applications.
export default function GenericTable({
  columns,
  data,
  actions,
  onEdit,
  onDelete,
  onOpen,
  onRowClick,
  width,
  maxHeight,
}) {
  // const [paginatedRows, setPaginatedRows] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Styled component to highlight matched text
  const HighlightedTableCell = styled(TableCell)(
    ({ theme, isHighlighted }) => ({
      backgroundColor: isHighlighted ? '#e6e4b7' : 'inherit',
      fontWeight: isHighlighted ? 'bold' : 'normal',
    })
  );

  const highlightText = text => {
    return (
      text?.toString().toLowerCase().includes(searchQuery.toLowerCase()) &&
      searchQuery.toLowerCase() !== ''
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  let paginatedRows = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  paginatedRows = paginatedRows.length === 0 ? filteredData : paginatedRows;

  const getNestedValue = (obj, path) =>
    path.split('.').reduce((o, key) => (o ? o[key] : null), obj);

  const renderCellContent = (row, column) => {
    const value = column.field.includes('.')
      ? getNestedValue(row, column.field)
      : row[column.field];

    if (value && dateFields.includes(column.field)) {
      return new Date(value).toLocaleString();
    }

    return value;
  };

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    const filteredData = data.filter(row => {
      const searchable = columns.map((column, index) => {
        return renderCellContent(row, column);
      });
      return searchable.some(item => {
        return String(item).toLowerCase().includes(searchQuery);
      });
    });
    if (filteredData.length) {
      setFilteredData(filteredData);
    } else {
      setFilteredData(data);
    }
  }, [searchQuery]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width,
        maxHeight,
      }}
    >
      {paginatedRows.length ? (
        <>
          <Search
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <TableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map(column => (
                    <TableCell key={column.field}>
                      {column.headerName}
                    </TableCell>
                  ))}
                  {actions && <TableCell>Actions</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedRows.map((row, rowIndex) => (
                  <TableRow key={rowIndex} onClick={() => onRowClick(row)}>
                    {columns.map(column => (
                      <HighlightedTableCell
                        key={column.field}
                        isHighlighted={highlightText(
                          renderCellContent(row, column)
                        )}
                      >
                        {renderCellContent(row, column)}
                      </HighlightedTableCell>
                    ))}
                    {actions && (
                      <TableCell>
                        {actions.includes('edit') && (
                          <IconButton
                            color='secondary'
                            onClick={e => onEdit(row, e)}
                          >
                            <EditIcon />
                          </IconButton>
                        )}
                        {actions.includes('delete') && (
                          <IconButton
                            color='secondary'
                            onClick={e => onDelete(row, e)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        )}
                        {actions.includes('open') && (
                          <IconButton
                            color='secondary'
                            onClick={e => onOpen(row, e)}
                          >
                            <FileOpenIcon />
                          </IconButton>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            sx={{ alignSelf: 'center' }}
            rowsPerPageOptions={[5, 10]}
            component='div'
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      ) : (
        <Typography variant='h4' color='gray' align='center'>
          There is nothing to display as of now
        </Typography>
      )}
    </Box>
  );
}

// Assign default props
GenericTable.defaultProps = {
  width: { lg: '100%', md: '100%', sm: '100%' },
  maxHeight: 500,
};
