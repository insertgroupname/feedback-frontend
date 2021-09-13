import {
  Box,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Button
} from '@material-ui/core';

const Keyword = (props) => {
  const keyword = props.keyword || [];
  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        title="Keyword"
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
              <TableCell>Your rehearsal is match with those topics.</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {keyword
              .map((word, index) => (
                <TableRow hover key={index}>
                  <TableCell>{word}</TableCell>
                </TableRow>
              ))
              .slice(0, 4)}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
};

export default Keyword;
