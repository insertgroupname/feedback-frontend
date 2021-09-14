import { Card, CardHeader, CardContent, Divider } from '@material-ui/core';
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
  const averagePace = props.average || {};
  let formatData = [];
  for (const [key, value] of Object.entries(averagePace)) {
    formatData.push({
      timestamp: secondToFormat(key.split('-')[1], 'mm:ss'),
      pace: value.wpm,
      range: [130, 160]
    });
  }
  return (
    <Card {...props}>
      <CardHeader
        title="Average Pace"
        subheader="Average pace for good speaking is around 130 to 160 WPM"
      />
      <Divider />
      <CardContent sx={{ height: '420px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={formatData}
            margin={{
              top: 25,
              right: 40,
              left: 40,
              bottom: 40
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
