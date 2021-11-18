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
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { getFirstUUID } from 'src/utils/getFirstUUID';
import { AnalyticTooltips } from './AnalyticTooltips';
import { AnalyticLegends } from './AnalyticLegends';

const SilenceDisfluencyDuration = (props) => {
  const formatData = props.data.map((ele) => {
    return {
      videoUUID: getFirstUUID(ele.videoUUID),
      videoName: ele.videoName,
      disfluency: parseFloat(ele.disfluencyPersilenceDuration * 100).toFixed(2),
      silence: parseFloat(100 - ele.disfluencyPersilenceDuration * 100).toFixed(
        2
      )
    };
  });

  const userBaseline = props.userBaseline
    ? parseFloat(props.userBaseline * 100).toFixed(2)
    : 0;

  return (
    <Card sx={props.sx}>
      <CardHeader title="Disfluency Duration / Silence Duration" />
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
            <XAxis dataKey="videoUUID" />
            <YAxis>
              <Label
                value="Percentage (%)"
                angle={-90}
                position="left"
                style={{ textAnchor: 'middle' }}
              />
            </YAxis>
            <Tooltip
              content={<AnalyticTooltips userBaseline={userBaseline} />}
            />
            <Legend verticalAlign="top" content={<AnalyticLegends />} />
            {formatData.length > 5 && (
              <Brush
                startIndex={formatData.length - 5}
                endIndex={formatData.length - 1}
                dataKey="videoUUID"
                height={30}
                stroke="#8884d8"
              />
            )}
            <Bar dataKey="disfluency" barSize={50} stackId="a" fill="#5664d2" />
            <Bar dataKey="silence" barSize={50} stackId="a" fill="#82ca9d" />
            <ReferenceLine
              y={userBaseline}
              stroke="black"
              strokeWidth={2}
              strokeDasharray="3 3"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SilenceDisfluencyDuration;
