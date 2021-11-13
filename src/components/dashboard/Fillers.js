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
          height: 'calc(100% - 101px)'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            height: '25%',
            alignItems: 'center',
            pb: '1rem'
          }}
        >
          <Typography>Hesitation frequency: {fillerCount} times</Typography>
        </Box>
        <Divider />
        <Box sx={{ height: '75%', py: '2rem' }}>
          <Box sx={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
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
      </CardContent>
    </Card>
  );
};

export default Fillers;
