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
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { getFirstUUID } from 'src/utils/getFirstUUID';
import { AnalyticLegends } from './AnalyticLegends';
import { AnalyticTooltips } from './AnalyticTooltips';

const AveragePace = (props) => {
  const formatData = props.wpm.map((ele) => {
    return {
      videoUUID: getFirstUUID(ele.videoUUID),
      videoName: ele.videoName,
      wpm: parseInt(ele.avgWPM)
    };
  });

  const userBaseline = props.userBaseline ? parseInt(props.userBaseline) : 0;

  return (
    <Card sx={props.sx}>
      <CardHeader title="Average Pace" />
      <Divider />
      <CardContent sx={{ height: '350px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            width={500}
            height={350}
            data={formatData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 0
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="videoUUID" height={55}>
              <Label value="Hashtag (#)" dy={5} />
            </XAxis>
            <YAxis>
              <Label
                value="Word Per Minute (WPM)"
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
            <Bar barSize={50} dataKey="wpm" fill="#5664d2" />
            <Line type="monotone" dataKey="wpm" stroke="#ff7300" />
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

export default AveragePace;
