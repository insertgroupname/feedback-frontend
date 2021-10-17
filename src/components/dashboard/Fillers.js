import { useSelector } from 'react-redux';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Typography,
  Box
} from '@material-ui/core';

// const phrasesData = [
//   {
//     id: 1,
//     phrase: 'I think that'
//   },
//   {
//     id: 2,
//     phrase: 'you know'
//   },
//   {
//     id: 3,
//     phrase: 'or something'
//   },
//   {
//     id: 4,
//     phrase: 'stuff like that'
//   },
//   {
//     id: 5,
//     phrase: 'kind of'
//   }
// ];

const Fillers = (props) => {
  const itemDetailState = useSelector((state) => state.itemDetail);
  const { item } = itemDetailState;

  const fillerCount =
    (item.postProcessing && item.postProcessing.hestiation_.total_count) || 0;
  return (
    <Card {...props}>
      <CardHeader
        title="Disfluency"
        subheader="Tips: Try to reduce your disfluency contain hesitation frequency, 
        fillers word, and frequency phrases to imporve your performance."
      />
      <Divider />
      <CardContent>
        <Box sx={{ padding: '1.25rem 0 2.25rem 0' }}>
          <Typography>Hesitation frequency: {fillerCount} times</Typography>
        </Box>
        <Divider />
        <Box sx={{ padding: '2.25rem 0' }}>
          <Typography>Filler words: </Typography>
        </Box>
        <Divider />
        <Box sx={{ padding: '2.25rem 0' }}>
          <Typography>
            Frequency phrases:
            {/* {phrasesData.map((phrase) => {
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
            })} */}
          </Typography>
        </Box>
        <Divider />
      </CardContent>
    </Card>
  );
};

export default Fillers;
