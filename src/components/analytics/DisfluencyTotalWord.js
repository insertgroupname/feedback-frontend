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
    disfluency: 48,
    word: 197,
    average: 122.5
  },
  {
    videoUUID: 2,
    disfluency: 43,
    word: 350,
    average: 196.5
  },
  {
    videoUUID: 3,
    disfluency: 55,
    word: 225,
    average: 140
  },
  {
    videoUUID: 4,
    disfluency: 66,
    word: 423,
    average: 244.5
  },
  {
    videoUUID: 5,
    disfluency: 33,
    word: 330,
    average: 181.5
  },
  {
    videoUUID: 6,
    disfluency: 48,
    word: 197,
    average: 122.5
  },
  {
    videoUUID: 7,
    disfluency: 43,
    word: 350,
    average: 196.5
  },
  {
    videoUUID: 8,
    disfluency: 55,
    word: 225,
    average: 140
  },
  {
    videoUUID: 9,
    disfluency: 66,
    word: 423,
    average: 244.5
  },
  {
    videoUUID: 10,
    disfluency: 33,
    word: 330,
    average: 181.5
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
              bottom: 0
            }}
            maxBarSize
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="videoUUID" />
            <YAxis domain={[0, 450]}>
              <Label
                value="Total frequency"
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
            <Bar dataKey="disfluency" barSize={50} fill="#5664d2" />
            <Bar dataKey="word" barSize={50} fill="#82ca9d" />
            <Line type="monotone" dataKey="average" stroke="#ff7300" />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default DisfluencyTotalWord;
