import { Card, CardContent, CardHeader, Divider } from '@material-ui/core';
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const data = [
  {
    videoUUID: 1,
    silence: 30,
    disfluency: 70
  },
  {
    videoUUID: 2,
    silence: 30,
    disfluency: 70
  },
  {
    videoUUID: 3,
    silence: 50,
    disfluency: 50
  },
  {
    videoUUID: 4,
    silence: 46,
    disfluency: 54
  },
  {
    videoUUID: 5,
    silence: 33,
    disfluency: 66
  }
];

const SilenceDisfluencyDuration = (props) => {
  return (
    <Card {...props}>
      <CardHeader title="Silence Duration / Disfluency Duration" />
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
            <Bar dataKey="silence" barSize={50} stackId="a" fill="#5664d2" />
            <Bar dataKey="disfluency" barSize={50} stackId="a" fill="#82ca9d" />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SilenceDisfluencyDuration;
