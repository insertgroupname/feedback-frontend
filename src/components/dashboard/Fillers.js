import { useSelector } from 'react-redux';
import {
  Chip,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Typography,
  Box
} from '@material-ui/core';

const Fillers = (props) => {
  const itemDetailState = useSelector((state) => state.itemDetail);
  const { item } = itemDetailState;

  const fillerCount =
    item.report && item.report.postProcessing
      ? item.report.postProcessing.hestiation_.total_count
      : 0;

  const repeat_list =
    item.report && item.report.postProcessing
      ? item.report.postProcessing.repeat_list
      : {};

  let custom_stopwords =
    item.report && item.report.postProcessing
      ? item.report.postProcessing.custom_stopwords
      : [];

  if (!custom_stopwords) {
    custom_stopwords = [];
  }

  const mapStopword = custom_stopwords.map((stopword) => {
    return {
      label: stopword[0].split(' ').join(''),
      count: stopword[1]
    };
  });

  const formatStopword = mapStopword.filter(
    (stopword) => stopword.label.length !== 0
  );

  let repeatWords = [];

  if (repeat_list) {
    for (const [key, value] of Object.entries(repeat_list)) {
      repeatWords.push({
        id: key,
        word: key,
        count: value
      });
    }
  }

  return (
    <Card {...props}>
      <CardHeader
        title="Disfluency"
        subheader="Tips: Try to reduce your disfluency contain hesitation frequency and frequency phrases to imporve your performance."
      />
      <Divider />
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            pt: '1rem',
            pb: '2rem'
          }}
        >
          <Typography>Hesitation frequency: {fillerCount} times</Typography>
        </Box>
        <Divider />
        <Box sx={{ py: '2rem' }}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '.5rem',
              alignItems: 'center'
            }}
          >
            <Typography>Frequency phrases:</Typography>
            {repeatWords.map((repeatWord) => (
              <Chip
                key={repeatWord.id}
                label={`${repeatWord.word} x ${repeatWord.count}`}
                color="primary"
                variant="outlined"
              />
            ))}
          </Box>
        </Box>
        <Divider />
        <Box sx={{ py: '2rem' }}>
          <Box sx={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
            <Typography>Custom Stopword Detection:</Typography>
            {formatStopword.map((stopword, index) => (
              <Chip
                key={index}
                label={`${stopword.label} x ${stopword.count}`}
                color="secondary"
                variant="outlined"
              />
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Fillers;
