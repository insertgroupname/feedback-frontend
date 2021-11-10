import { Card, CardContent, CardHeader, Divider } from '@material-ui/core';
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer
} from 'recharts';

const data = [
  {
    videoUUID: 1,
    pace: 150
  },
  {
    videoUUID: 2,
    pace: 135
  },
  {
    videoUUID: 3,
    pace: 144
  },
  {
    videoUUID: 4,
    pace: 161
  },
  {
    videoUUID: 5,
    pace: 155
  }
];

const AveragePace = (props) => {
  return (
    <Card {...props}>
      <CardHeader title="Average Pace" />
      <Divider />
      <CardContent sx={{ height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 40
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="videoUUID" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar barSize={50} dataKey="pace" fill="#5664d2" />
            <Line type="monotone" dataKey="pace" stroke="#ff7300" />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AveragePace;
