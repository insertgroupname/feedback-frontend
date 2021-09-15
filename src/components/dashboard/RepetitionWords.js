import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';

import shortid from 'shortid';

const RepetitionWords = (props) => {
  const repetition = props.repetition || {
    bigram: [],
    word: []
  };

  return (
    <Card>
      <CardHeader
        title="Repetition Words"
        action={
          <Button color="primary" size="small" variant="text">
            Show more
          </Button>
        }
      />
      <Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Word</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {repetition.word
              .map((word) => (
                <TableRow hover key={shortid.generate()}>
                  <TableCell>{word[0]}</TableCell>
                  <TableCell align="right">{word[1]}</TableCell>
                </TableRow>
              ))
              .slice(0, 4)}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
};

export default RepetitionWords;
