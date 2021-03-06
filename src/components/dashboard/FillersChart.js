import { useSelector } from 'react-redux';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Box,
  Typography
} from '@material-ui/core';
import {
  BarChart,
  Bar,
  Brush,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Legend,
  ResponsiveContainer,
  Label
} from 'recharts';
import { secondToFormat } from '../../utils/secondTomin';
import { DashboardTooltip } from './DashboardTooltip';

const renderLegend = (props) => {
  const { payload } = props;
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        gap: '.5rem'
      }}
    >
      <Box sx={{ height: 15, width: 15, background: '#F05311' }} />
      {payload.map((entry, index) => (
        <Typography color="#F05311" key={index}>
          {entry.value}
        </Typography>
      ))}
      <hr
        style={{
          borderTop: '2px dotted blue',
          width: '15px'
        }}
      />
      <Typography color="blue">acceptable disfluency</Typography>
    </Box>
  );
};

const FillersChart = (props) => {
  const itemDetailState = useSelector((state) => state.itemDetail);
  const { item } = itemDetailState;

  const baselineState = useSelector((state) => state.baseline);
  const { baseline } = baselineState;

  const acceptable = baseline ? baseline.acceptableDisfluencyPerMinut : 0;

  const fillerChartData =
    item.report && item.report.postProcessing
      ? item.report.postProcessing.hestiation_.marker
      : {};

  let formatData = [];
  for (const [key, value] of Object.entries(fillerChartData)) {
    formatData.push({
      timestamp: secondToFormat(key.split('-')[1], 'mm:ss'),
      disfluency: value.hes_count
    });
  }

  return (
    <Card {...props}>
      <CardHeader
        title="Disfluency Chart"
        subheader="Tips: Take a couple of seconds to think about what you want to say. 
        These short pauses of complete silence can serve two purposes: they will help you begin powerfully, 
        and it will help you avoid using a filler word."
      />
      <Divider />
      <CardContent sx={{ height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={formatData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 40
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp">
              <Label
                value="Time (min:sec)"
                offset={-20}
                position="insideBottom"
              />
            </XAxis>
            <YAxis>
              <Label
                value="Frequency"
                angle={-90}
                position="left"
                style={{ textAnchor: 'middle' }}
              />
            </YAxis>
            <Tooltip content={<DashboardTooltip acceptable={acceptable} />} />
            <Legend verticalAlign="top" height={36} content={renderLegend} />
            {formatData.length > 10 && (
              <Brush
                startIndex={formatData.length - 10}
                endIndex={formatData.length - 1}
                dataKey="videoUUID"
                height={30}
                stroke="#8884d8"
              />
            )}
            <Bar dataKey="disfluency" fill="#F05311" />
            <ReferenceLine
              y={acceptable}
              stroke="blue"
              strokeWidth={2}
              strokeDasharray="3 3"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default FillersChart;
