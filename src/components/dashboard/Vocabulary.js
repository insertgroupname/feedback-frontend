import { useState } from 'react';
import { useSelector } from 'react-redux';
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

const Vocabulary = () => {
  const itemDetailState = useSelector((state) => state.itemDetail);
  const { item } = itemDetailState;

  const vocabulary =
    item.report && item.report.postProcessing
      ? item.report.postProcessing.vocab.vocab
      : null;

  let words = [];
  if (vocabulary) {
    for (const [key, value] of Object.entries(vocabulary)) {
      words.push({
        id: key,
        word: value.word,
        partOfSpeech: value.pos
      });
    }
  }

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, words.length - page * rowsPerPage);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <Card>
      <CardHeader title="Vocabulary" />
      <Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Word</TableCell>
              <TableCell align="right">Part of Speech</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? words.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : words
            ).map((word) => (
              <TableRow hover key={word.id}>
                <TableCell>{word.word}</TableCell>
                <TableCell align="right">{word.partOfSpeech}</TableCell>
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
                count={words.length}
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

export default Vocabulary;
