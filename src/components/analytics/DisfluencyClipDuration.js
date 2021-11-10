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
    percent: Math.floor(Math.random() * 101)
  },
  {
    videoUUID: 2,
    percent: Math.floor(Math.random() * 101)
  },
  {
    videoUUID: 3,
    percent: Math.floor(Math.random() * 101)
  },
  {
    videoUUID: 4,
    percent: Math.floor(Math.random() * 101)
  },
  {
    videoUUID: 5,
    percent: Math.floor(Math.random() * 101)
  }
];

const DisfluencyClipDuration = (props) => {
  return (
    <Card {...props}>
      <CardHeader title="Disfluency / Total Words" />
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
            <Bar dataKey="percent" barSize={50} fill="#5664d2" />
            <Line type="monotone" dataKey="percent" stroke="#ff7300" />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default DisfluencyClipDuration;
