import { useState } from 'react';
import {
  Box,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination
} from '@material-ui/core';
import { TablePaginationActions } from './TablePaginationActions';
import shortid from 'shortid';

const RepetitionWords = (props) => {
  const repetition = props.repetition || {
    bigram: [],
    word: []
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, repetition.word.length - page * rowsPerPage);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Card>
      <CardHeader title="Repetition Words" />
      <Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Word</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? repetition.word.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : repetition.word
            ).map((word) => (
              <TableRow hover key={shortid.generate()}>
                <TableCell>{word[0]}</TableCell>
                <TableCell align="right">{word[1]}</TableCell>
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
                count={repetition.word.length}
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

export default RepetitionWords;
