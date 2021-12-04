import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { arc } from 'd3-shape';
import { scaleLinear } from 'd3-scale';
import { format } from 'd3-format';
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Divider,
  Typography,
  Tooltip,
  Box,
  makeStyles
} from '@material-ui/core';

import HelpIcon from '@material-ui/icons/Help';

const useStyles = makeStyles((theme) => ({
  cardContent: {
    height: '100%',
    padding: '2rem',
    position: 'relative'
  },

  gaugeContainer: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    top: 0,
    left: 0,
    width: '100%',
    [theme.breakpoints.down('lg')]: {
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  gauge: {
    overflow: 'visible',
    padding: '2rem 4rem 0 4rem'
  },
  paceContainer: {
    paddingTop: '3rem'
  },
  tooltipContainer: {
    position: 'relative',
    padding: '1rem 2rem',
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'center'
  }
}));

const paceInformation = [
  {
    id: 1,
    color: '#e81246',
    label: '0 - 59 is very slow'
  },
  {
    id: 2,
    color: '#ee8d41',
    label: '60 - 139 is slow'
  },
  {
    id: 3,
    color: '#4dff4d',
    label: '140 - 170 is good'
  },
  {
    id: 4,
    color: '#ee8d41',
    label: '171 - 200 is fast'
  },
  {
    id: 5,
    color: '#e81246',
    label: '> 200 is very fast'
  }
];

const Pace = (props) => {
  const itemDetailState = useSelector((state) => state.itemDetail);
  const { item, baseline } = itemDetailState;

  const [coordinate, setCoordinate] = useState([]);
  const [attributes, setAttributes] = useState({
    text: '',
    color: '',
    recommend: ''
  });

  const classes = useStyles();
  const value = Math.round(
    item.report && item.report.postProcessing
      ? item.report.postProcessing.avg_wpm
      : 0
  );

  const wpmRange = baseline ? baseline.WPMrange : [];
  const arcRange = wpmRange
    ? wpmRange.map((ele) => {
        return {
          min: ele[0],
          max: ele[1]
        };
      })
    : [];

  const getArcLength = (prev, max, min) => {
    return prev + ((max - min) * 180) / 250;
  };

  const minDomain = 0;
  const maxDomain = 250;

  const maxVSlow = arcRange[0] && arcRange[0].max;
  const minSlow = arcRange[1] && arcRange[1].min;
  const maxSlow = arcRange[1] && arcRange[1].max;
  const minGood = arcRange[2] && arcRange[2].min;
  const maxGood = arcRange[2] && arcRange[2].max;
  const minFast = arcRange[3] && arcRange[3].min;
  const maxFast = arcRange[3] && arcRange[3].max;

  const b = getArcLength(minDomain, maxVSlow, minDomain);
  const c = getArcLength(b, maxSlow, minSlow);
  const d = getArcLength(c, maxGood, minGood);
  const e = getArcLength(d, maxFast, minFast);

  useEffect(() => {
    const percentScale = scaleLinear()
      .domain([minDomain, maxDomain])
      .range([0, 1]);
    const percent = percentScale(value);
    const angleScale = scaleLinear()
      .domain([0, 1])
      .range([-Math.PI / 2, Math.PI / 2])
      .clamp(true);
    const angle = angleScale(percent);
    const getCoordsOnArc = (angle, offset = 10) => [
      Math.cos(angle - Math.PI / 2) * offset,
      Math.sin(angle - Math.PI / 2) * offset
    ];
    setCoordinate(getCoordsOnArc(angle, 1 - (1 - 0.65) / 7.5));
  }, [value]);

  const redArcLeft = arc()
    .innerRadius(1)
    .outerRadius(0.9)
    .startAngle(0)
    .endAngle(b * (Math.PI / 180))
    .padAngle(0)
    .cornerRadius(2)();

  const orangeArcLeft = arc()
    .innerRadius(1)
    .outerRadius(0.9)
    .startAngle(b * (Math.PI / 180))
    .endAngle(c * (Math.PI / 180))
    .padAngle(0)
    .cornerRadius(2)();
  const greenArc = arc()
    .innerRadius(1)
    .outerRadius(0.9)
    .startAngle(c * (Math.PI / 180))
    .endAngle(d * (Math.PI / 180))
    .padAngle(0)
    .cornerRadius(2)();

  const orangeArcRight = arc()
    .innerRadius(1)
    .outerRadius(0.9)
    .startAngle(d * (Math.PI / 180))
    .endAngle(e * (Math.PI / 180))
    .padAngle(0)
    .cornerRadius(2)();

  const redArcRight = arc()
    .innerRadius(1)
    .outerRadius(0.9)
    .startAngle(e * (Math.PI / 180))
    .endAngle(180 * (Math.PI / 180))
    .padAngle(0)
    .cornerRadius(2)();

  const getBlobColor = (value) => {
    if (value >= minDomain && value <= maxVSlow) return '#e81246';
    if (value >= minSlow && value <= maxSlow) return '#ee8d41';
    if (value >= minGood && value <= maxGood) return '#4dff4d';
    if (value >= minFast && value <= maxFast) return '#ee8d41';
    if (value > maxFast) return '#e81246';
  };

  useEffect(() => {
    const getTextAndColor = (value) => {
      if (value >= minDomain && value <= maxVSlow)
        setAttributes({
          text: 'Very Slow',
          color: '#e81246',
          recommend: 'Your pace is very slow, try to speed up your speech!'
        });
      if (value >= minSlow && value <= maxSlow)
        setAttributes({
          text: 'Slow',
          color: '#ee8d41',
          recommend: 'Your pace is slow, try to speed up your speech a bit'
        });
      if (value >= minGood && value <= maxGood)
        setAttributes({
          text: 'Good',
          color: '#4dff4d',
          recommend: 'Your pace is conversational. Keep it up!'
        });
      if (value >= minFast && value <= maxFast)
        setAttributes({
          text: 'Fast',
          color: '#ee8d41',
          recommend: 'Your pace is fast, try to speed down your speech a bit'
        });
      if (value >= maxFast)
        setAttributes({
          text: 'Very Fast',
          color: '#e81246',
          recommend: 'Your pace is very fast, try to speed down your speech!'
        });
    };
    getTextAndColor(value);
  }, [value, maxFast, maxGood, maxSlow, maxVSlow, minFast, minGood, minSlow]);

  return (
    <Card {...props}>
      <Box display="flex" justifyContent="space-between">
        <CardHeader title="Pace" />
        <Box p={1}>
          <Tooltip
            title={
              <>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '.5rem'
                  }}
                >
                  <Typography variant="h5">Pace</Typography>
                  <Box>
                    {paceInformation.map((pace) => (
                      <Box
                        key={pace.id}
                        sx={{
                          display: 'flex',
                          gap: '.5rem',
                          alignItems: 'center'
                        }}
                      >
                        <Box
                          sx={{
                            height: '15px',
                            width: '15px',
                            background: pace.color,
                            border: '1px solid',
                            borderColor: 'white'
                          }}
                        />
                        <Typography variant="body1">{pace.label}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </>
            }
            placement="left"
            arrow
          >
            <IconButton>
              <HelpIcon color="primary" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Divider />
      <CardContent className={classes.cardContent}>
        <Box className={classes.gaugeContainer}>
          <svg viewBox={[-1, -1, 2, 1].join(' ')} className={classes.gauge}>
            <path
              style={{ transform: 'rotate(-90deg)' }}
              d={redArcLeft}
              fill="#e81246"
            />
            <path
              style={{ transform: 'rotate(-90deg)' }}
              d={orangeArcLeft}
              fill="#ee8d41"
            />
            <path
              style={{ transform: 'rotate(-90deg)' }}
              d={greenArc}
              fill="#4dff4d"
            />
            <path
              style={{ transform: 'rotate(-90deg)' }}
              d={orangeArcRight}
              fill="#ee8d41"
            />
            <path
              style={{ transform: 'rotate(-90deg)' }}
              d={redArcRight}
              fill="#e81246"
            />
            <circle
              cx={coordinate[0]}
              cy={coordinate[1]}
              r="0.07"
              strokeWidth="0.04"
              fill="white"
              stroke={getBlobColor(value)}
            />
          </svg>
        </Box>
        <Box className={classes.paceContainer}>
          <Typography fontSize="3rem" fontWeight="bold" align="center">
            {format(',')(value)}
          </Typography>
          <Typography align="center">words/min</Typography>
          <Typography
            fontSize="2rem"
            fontWeight="bold"
            align="center"
            color={attributes.color}
          >
            {attributes.text}
          </Typography>
        </Box>

        <Box className={classes.tooltipContainer}>
          <Typography variant="body1" align="center" padding="1rem">
            {attributes.recommend}
          </Typography>
          <Divider />
          <Typography variant="body1" padding="1rem">
            Tips: Make sure you’re practicing diaphragmatic or “belly”
            breathing, including breathing more deeply and slowly.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Pace;
