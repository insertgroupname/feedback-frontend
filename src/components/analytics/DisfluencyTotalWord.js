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
    percent: 44
  },
  {
    videoUUID: 2,
    percent: 33
  },
  {
    videoUUID: 3,
    percent: 55
  },
  {
    videoUUID: 4,
    percent: 49
  },
  {
    videoUUID: 5,
    percent: 31
  }
];

const DisfluencyTotalWord = (props) => {
  return (
    <Card {...props}>
      <CardHeader title="Total Disfluency / Total Words" />
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

export default DisfluencyTotalWord;
