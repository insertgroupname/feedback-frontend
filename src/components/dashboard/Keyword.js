import { useState } from 'react';
import {
  Box,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableFooter,
  TablePagination
} from '@material-ui/core';
import { TablePaginationActions } from './TablePaginationActions';
import shortid from 'shortid';

const Keyword = (props) => {
  const keyword = props.keyword || [];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, keyword.length - page * rowsPerPage);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader title="Keyword" />
      <Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Your rehearsal is match with those topics.</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? keyword.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : keyword
            ).map((word) => (
              <TableRow hover key={shortid.generate()}>
                <TableCell>{word}</TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[]}
                colSpan={3}
                count={keyword.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Box>
    </Card>
  );
};

export default Keyword;
