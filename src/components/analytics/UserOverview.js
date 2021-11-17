import { Card, CardHeader, Divider, CardContent } from '@material-ui/core';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts';

const UserOverview = (props) => {
  const score = props.score
    ? props.score
    : {
        wpmScore: 0,
        hesitationDurationScore: 0,
        silenceDurationScore: 0
      };
  const data = [
    {
      label: 'WPM',
      score: score.wpmScore,
      fullMark: 5
    },
    {
      label: 'Hesitation Duration',
      score: score.hesitationDurationScore,
      fullMark: 5
    },
    {
      label: 'Silence Time',
      score: score.silenceDurationScore,
      fullMark: 5
    }
  ];
  return (
    <Card {...props}>
      <CardHeader title="Overview" />
      <Divider />
      <CardContent sx={{ height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="label" />
            <PolarRadiusAxis />
            <Radar
              name="score"
              dataKey="score"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default UserOverview;
