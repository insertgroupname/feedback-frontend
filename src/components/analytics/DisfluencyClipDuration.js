import { Card, CardContent, CardHeader, Divider } from '@material-ui/core';
import {
  ComposedChart,
  Bar,
  Brush,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
  Line,
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
  },
  {
    videoUUID: 6,
    silence: 46,
    disfluency: 54
  },
  {
    videoUUID: 7,
    silence: 30,
    disfluency: 70
  },
  {
    videoUUID: 8,
    silence: 30,
    disfluency: 70
  },
  {
    videoUUID: 9,
    silence: 50,
    disfluency: 50
  },
  {
    videoUUID: 10,
    silence: 46,
    disfluency: 54
  }
];

const DisfluencyClipDuration = (props) => {
  return (
    <Card {...props}>
      <CardHeader title="Disfluency Duration / Clip Duration" />
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
              bottom: 0
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="videoUUID" />
            <YAxis>
              <Label
                value="Percentage (%)"
                angle={-90}
                position="left"
                style={{ textAnchor: 'middle' }}
              />
            </YAxis>
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            {data.length > 5 && (
              <Brush
                startIndex={data.length - 5}
                endIndex={data.length - 1}
                dataKey="videoUUID"
                height={30}
                stroke="#8884d8"
              />
            )}
            <Bar dataKey="silence" stackId="a" barSize={50} fill="#5664d2" />
            <Bar dataKey="disfluency" stackId="a" barSize={50} fill="#82ca9d" />
            <Line type="monotone" dataKey="percent" stroke="#ff7300" />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default DisfluencyClipDuration;
