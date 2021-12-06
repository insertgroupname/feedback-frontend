import { Box, Card, CardContent, CardHeader, Divider } from '@material-ui/core';
import { useSelector } from 'react-redux';
import GaugeForm from '../form/GaugeForm';

const AdminGauge = () => {
  const baselineState = useSelector((state) => state.baseline);
  const { baseline } = baselineState;

  const getTitle = (index) => {
    switch (index) {
      case 0:
        return 'Very Slow';
      case 1:
        return 'Slow';
      case 2:
        return 'Good';
      case 3:
        return 'Fast';
      case 4:
        return 'Very Fast';
      default:
        return;
    }
  };

  const wpmRange = baseline ? baseline.WPMrange : [];
  const arcRange = wpmRange
    ? wpmRange.map((ele, index) => {
        return {
          title: getTitle(index),
          start: ele[0],
          end: ele[1]
        };
      })
    : [];

  const acceptable = baseline ? baseline.acceptableDisfluencyPerMinut : 0;
  return (
    <Card>
      <CardHeader
        subheader="Current pace gauge standard"
        title="Adjust Pace Gauge standard"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: '100%'
          }}
        >
          <GaugeForm arcRange={arcRange} acceptable={acceptable} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default AdminGauge;
