import { Box, Card } from '@material-ui/core';
import AnalyticItems from './AnalyticItems';

const items = [
  {
    label: 'Longest Video Duration',
    value: '28.02 Minutes'
  },
  {
    label: 'Best Average Pace',
    value: '161 WPM'
  },
  {
    label: 'Less Disfluency Count',
    value: '2 Disfluency'
  },
  {
    label: 'Less Silence Times',
    value: '88 seconds'
  },
  {
    label: 'Less Stopword Detection',
    value: '9 words'
  },
  {
    label: 'Most Topics',
    value: '20 Topics'
  }
];

const AnalyticDetails = (props) => {
  return (
    <Card {...props}>
      <Box
        sx={{
          display: 'flex',
          py: 2.5,
          px: 4,
          flexDirection: 'column',
          gap: '1rem'
        }}
      >
        {items.map((item) => (
          <AnalyticItems
            key={item.label}
            label={item.label}
            value={item.value}
          />
        ))}
      </Box>
    </Card>
  );
};

export default AnalyticDetails;
