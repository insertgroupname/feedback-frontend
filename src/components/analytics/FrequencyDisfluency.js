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
    frequency: 11
  },
  {
    videoUUID: 2,
    frequency: 7
  },
  {
    videoUUID: 3,
    frequency: 13
  },
  {
    videoUUID: 4,
    frequency: 15
  },
  {
    videoUUID: 5,
    frequency: 20
  }
];

const FrequencyDisfluency = (props) => {
  return (
    <Card {...props}>
      <CardHeader
        title="Total Disfluency"
        subheader="Your disfluency are increasing"
      />
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
            <Bar dataKey="frequency" barSize={50} fill="#5664d2" />
            <Line type="monotone" dataKey="frequency" stroke="#ff7300" />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default FrequencyDisfluency;
