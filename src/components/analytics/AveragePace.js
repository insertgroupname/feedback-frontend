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
  ResponsiveContainer
} from 'recharts';

const data = [
  {
    videoUUID: 1,
    pace: 150
  },
  {
    videoUUID: 2,
    pace: 135
  },
  {
    videoUUID: 3,
    pace: 144
  },
  {
    videoUUID: 4,
    pace: 161
  },
  {
    videoUUID: 5,
    pace: 155
  },
  {
    videoUUID: 6,
    pace: 134
  },
  {
    videoUUID: 7,
    pace: 153
  },
  {
    videoUUID: 8,
    pace: 161
  },
  {
    videoUUID: 9,
    pace: 155
  },
  {
    videoUUID: 10,
    pace: 134
  }
];

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
  return (
    <Card {...props}>
      <CardHeader title="Average Pace" />
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
            <YAxis domain={[124, 171]}>
              <Label
                value="Word Per Minute (WPM)"
                angle={-90}
                position="left"
                style={{ textAnchor: 'middle' }}
              />
            </YAxis>
            <Tooltip />
            <Legend verticalAlign="top" content={renderLegend} />
            {data.length > 5 && (
              <Brush
                startIndex={data.length - 5}
                endIndex={data.length - 1}
                dataKey="videoUUID"
                height={30}
                stroke="#8884d8"
              />
            )}
            <Bar barSize={50} dataKey="pace" fill="#5664d2" />
            <Line type="monotone" dataKey="pace" stroke="#ff7300" />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AveragePace;
