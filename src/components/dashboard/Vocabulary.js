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

const Vocabulary = (props) => {
  const vocabulary = props.vocabulary || {};
  let words = [];
  for (const [key] of Object.entries(vocabulary)) {
    words.push({
      id: key,
      word: key,
      partOfSpeech: 'Noun'
    });
  }
  return (
    <Card>
      <CardHeader
        title="Vocabulary"
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
              <TableCell align="right">Part of Speech</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {words
              .map((word) => (
                <TableRow hover key={word.id}>
                  <TableCell>{word.word}</TableCell>
                  <TableCell align="right">{word.partOfSpeech}</TableCell>
                </TableRow>
              ))
              .slice(0, 4)}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
};

export default Vocabulary;
