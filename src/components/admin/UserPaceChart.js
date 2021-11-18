import { Box } from '@material-ui/core';
import {
  Brush,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label,
  Legend,
  ResponsiveContainer
} from 'recharts';
import moment from 'moment';
import { AdminLegends } from './AdminLegends';
import { AdminTooltips } from './AdminTooltips';

const UserPaceChart = (props) => {
  const data = props.allUserBaseline ? props.allUserBaseline : [];
  const formatData = data.map((ele) => {
    return {
      wpm: parseInt(ele.avgWPM),
      createDate: moment(ele.createDate).format('DD/MM/YYYY'),
      datetime: moment(ele.createDate).format('DD/MM/YYYY HH:mm')
    };
  });
  return (
    <Box
      sx={{
        height: '300px'
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
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
          <XAxis dataKey="createDate" height={55}>
            <Label value="Datetime" dy={5} />
          </XAxis>
          <YAxis>
            <Label
              value="Word Per Minute (WPM)"
              angle={-90}
              position="left"
              style={{ textAnchor: 'middle' }}
            />
          </YAxis>
          <Tooltip content={<AdminTooltips />} />
          <Legend verticalAlign="top" content={<AdminLegends />} />
          {formatData.length > 5 && (
            <Brush
              startIndex={formatData.length - 5}
              endIndex={formatData.length - 1}
              dataKey="videoUUID"
              height={30}
              stroke="#8884d8"
            />
          )}
          <Line type="monotone" dataKey="wpm" stroke="#5664d2" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default UserPaceChart;
