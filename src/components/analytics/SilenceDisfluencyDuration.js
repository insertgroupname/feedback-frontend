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
  ResponsiveContainer
} from 'recharts';

const SilenceDisfluencyDuration = (props) => {
  const formatData = props.data.map((ele, index) => {
    return {
      index: index + 1,
      disfluency: parseFloat(ele.disfluencyPersilenceDuration * 100).toFixed(2),
      silence: parseFloat(100 - ele.disfluencyPersilenceDuration * 100).toFixed(
        2
      )
    };
  });
  return (
    <Card {...props}>
      <CardHeader title="Silence Duration / Disfluency Duration" />
      <Divider />
      <CardContent sx={{ height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            width={500}
            height={300}
            data={formatData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 0
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="index" />
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
            {formatData.length > 5 && (
              <Brush
                startIndex={formatData.length - 5}
                endIndex={formatData.length - 1}
                dataKey="index"
                height={30}
                stroke="#8884d8"
              />
            )}
            <Bar dataKey="disfluency" barSize={50} stackId="a" fill="#5664d2" />
            <Bar dataKey="silence" barSize={50} stackId="a" fill="#82ca9d" />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SilenceDisfluencyDuration;
