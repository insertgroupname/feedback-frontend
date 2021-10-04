import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import reactStringReplace from 'react-string-replace';
import moment from 'moment';
import { TablePaginationActions } from './TablePaginationActions';
import {
  Box,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableFooter,
  TableHead,
  TableRow
} from '@material-ui/core';

import shortid from 'shortid';

const Transcript = (props) => {
  const transcript = props.transcript || [];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, transcript.length - page * rowsPerPage);

  const formatted = (secs) => {
    let secondToFormat = moment.utc(secs * 1000).format('mm:ss.SS');
    return secondToFormat;
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <Card {...props}>
      <CardHeader title="Transcript" />
      <PerfectScrollbar>
        <Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sentences</TableCell>
                  <TableCell>From</TableCell>
                  <TableCell>To</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? transcript.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : transcript
                ).map((sentence) => (
                  <TableRow hover key={shortid.generate()}>
                    <TableCell component="th" scope="row">
                      {reactStringReplace(
                        sentence.transcript,
                        '%HESITATION',
                        (match, i) => (
                          <span key={i} style={{ color: 'red' }}>
                            {match}
                          </span>
                        )
                      )}
                    </TableCell>
                    <TableCell style={{ width: 160 }}>
                      {formatted(sentence.timestamps[0][1])}
                    </TableCell>
                    <TableCell style={{ width: 160 }}>
                      {formatted(sentence.timestamps[0][2])}
                    </TableCell>
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
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: 'All', value: -1 }
                    ]}
                    colSpan={3}
                    count={transcript.length}
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
          </TableContainer>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

export default Transcript;
