import { useSelector } from 'react-redux';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Box,
  Typography
} from '@material-ui/core';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label,
  ResponsiveContainer
} from 'recharts';
import { secondToFormat } from '../../utils/secondTomin';

const AveragePace = (props) => {
  const itemDetailState = useSelector((state) => state.itemDetail);
  const { item } = itemDetailState;

  const averagePace = (item.postProcessing && item.postProcessing.wpm) || {};
  let formatData = [];
  for (const [key, value] of Object.entries(averagePace)) {
    formatData.push({
      timestamp: secondToFormat(key.split('-')[1], 'mm:ss'),
      pace: value.wpm,
      range: [140, 170]
    });
  }
  return (
    <Card {...props}>
      <CardHeader
        title="Average Pace"
        subheader="Average pace for good speaking is around 140 to 170 WPM"
      />
      <Divider />
      <CardContent sx={{ height: '420px' }}>
        <Box display="flex" justifyContent="center" alignItems="center" p={1}>
          <Box
            sx={{
              height: '15px',
              width: '15px',
              background: '#EDFFB9',
              border: '1px solid',
              borderColor: '#8884d8'
            }}
          />
          <Typography px={1}>good average pace</Typography>
        </Box>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={formatData}
            margin={{
              top: 25,
              right: 40,
              left: 40,
              bottom: 60
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp">
              <Label value="Time (min)" position="bottom" />
            </XAxis>
            <YAxis>
              <Label
                value="Word per Minute"
                angle={-90}
                position="left"
                style={{ textAnchor: 'middle' }}
              />
            </YAxis>
            <Tooltip />
            <Area
              type="monotone"
              dataKey="pace"
              stroke="#8884d8"
              fill="#38E559"
            />
            <Area dataKey="range" stroke="#8884d8" fill="#EDFFB9" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AveragePace;
