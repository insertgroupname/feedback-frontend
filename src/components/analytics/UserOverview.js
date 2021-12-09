import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Tooltip as MuiTooltip,
  Typography
} from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
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
      scoreBaseline: 3,
      score: Math.round(score.wpmScore),
      fullMark: 5
    },
    {
      label: 'Hesitation Duration',
      scoreBaseline: 3,
      score: Math.round(score.hesitationDurationScore),
      fullMark: 5
    },
    {
      label: 'Silence Time',
      scoreBaseline: 3,
      score: Math.round(score.silenceDurationScore),
      fullMark: 5
    }
  ];
  return (
    <Card {...props}>
      <Box display="flex" justifyContent="space-between">
        <CardHeader title="Overview" />
        <Box p={1}>
          <MuiTooltip
            title={
              <>
                <Typography>
                  Score the word per minute, silences time, and hesitation
                  duration by 0 to 5
                </Typography>
              </>
            }
            arrow
          >
            <IconButton>
              <HelpIcon color="primary" />
            </IconButton>
          </MuiTooltip>
        </Box>
      </Box>
      <Divider />
      <CardContent sx={{ height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <Tooltip />
            <PolarGrid />
            <PolarAngleAxis dataKey="label" />
            <PolarRadiusAxis />
            <Radar
              name="score"
              dataKey="score"
              stroke="#5664d2"
              fill="#5664d2"
              fillOpacity={0.6}
            />
            <Radar
              name="scoreBaseline"
              dataKey="scoreBaseline"
              stroke="#82ca9d"
              fill="#82ca9d"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default UserOverview;
