import { useSelector } from 'react-redux';
import {
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

  return (
    <Card {...props}>
      <CardHeader
        title="Disfluency"
        subheader="Tips: Try to reduce your disfluency contain hesitation frequency, 
        fillers word, and frequency phrases to imporve your performance."
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
          <Typography>Frequency phrases:</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Fillers;
