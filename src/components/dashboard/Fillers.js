import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Typography,
  Box
} from '@material-ui/core';

const phrasesData = [
  {
    id: 1,
    phrase: 'I think that'
  },
  {
    id: 2,
    phrase: 'you know'
  },
  {
    id: 3,
    phrase: 'or something'
  },
  {
    id: 4,
    phrase: 'stuff like that'
  },
  {
    id: 5,
    phrase: 'kind of'
  }
];

const Fillers = (props) => {
  const fillerCount = props.filler || 0;
  return (
    <Card {...props}>
      <CardHeader
        title="Fillers"
        subheader="Try to reduce your fillers contain hesitation frequency, 
        fillers word, and frequency phrases to imporve your performance."
      />
      <Divider />
      <CardContent>
        <Box sx={{ padding: '1.25rem 0 2.25rem 0' }}>
          <Typography>Hesitation Count: {fillerCount} times</Typography>
        </Box>
        <Divider />
        <Box sx={{ padding: '2.25rem 0' }}>
          <Typography>Filler Words: </Typography>
        </Box>
        <Divider />
        <Box sx={{ padding: '2.25rem 0' }}>
          <Typography>
            Frequency:
            {phrasesData.map((phrase) => {
              return (
                <span
                  key={phrase.id}
                  style={{
                    backgroundColor: '#FDFD96',
                    padding: '.55rem',
                    margin: '.35rem',
                    borderRadius: '50px'
                  }}
                >
                  {phrase.phrase}
                </span>
              );
            })}
          </Typography>
        </Box>
        <Divider />
      </CardContent>
    </Card>
  );
};

export default Fillers;
