import { useState } from 'react';
import { useSelector } from 'react-redux';
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

const KeywordRake = () => {
  const itemDetailState = useSelector((state) => state.itemDetail);
  const { item } = itemDetailState;

  const keyword =
    item.report && item.report.postProcessing
      ? item.report.postProcessing.keyword_gen
      : [];

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
      <CardHeader title="Keyword (Rake)" />
      <Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Word</TableCell>
              <TableCell align="right">Score</TableCell>
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
                <TableCell>{word[1]}</TableCell>
                <TableCell align="right">{parseInt(word[0])}</TableCell>
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

export default KeywordRake;
