import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Divider
} from '@material-ui/core';
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

const renderLegend = (props) => {
  const { payload } = props;
  const payloadValue = payload.map((entry) => {
    return entry.value;
  });
  let cleaningPayload = [...new Set(payloadValue)];
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        pb: 1,
        gap: '.5rem'
      }}
    >
      <Box sx={{ height: 15, width: 15, background: '#5664d2' }} />
      {cleaningPayload.map((value, index) => (
        <Typography color="#5664d2" key={index}>
          {value}
        </Typography>
      ))}
    </Box>
  );
};

const AveragePace = (props) => {
  const formatData = props.wpm.map((ele, index) => {
    return {
      index: index + 1,
      average: ele.avgWPM
    };
  });

  const averagePaceBaseline = props.baseline ? props.baseline : 0;

  return (
    <Card {...props}>
      <CardHeader title="Average Pace" />
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
                value="Word Per Minute (WPM)"
                angle={-90}
                position="left"
                style={{ textAnchor: 'middle' }}
              />
            </YAxis>
            <Tooltip />
            <Legend verticalAlign="top" content={renderLegend} />
            {formatData.length > 5 && (
              <Brush
                startIndex={formatData.length - 5}
                endIndex={formatData.length - 1}
                dataKey="index"
                height={30}
                stroke="#8884d8"
              />
            )}
            <Bar barSize={50} dataKey="average" fill="#5664d2" />
            <Line type="monotone" dataKey="average" stroke="#ff7300" />
            <ReferenceLine
              y={averagePaceBaseline}
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
