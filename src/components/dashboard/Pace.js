import { useState, useEffect } from 'react';
import { arc } from 'd3-shape';
import { scaleLinear } from 'd3-scale';
import { format } from 'd3-format';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Typography,
  Box,
  makeStyles
} from '@material-ui/core';

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
    // [theme.breakpoints.down('xl')]: {
    //   padding: '2rem 2rem 0 2rem'
    // }
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

const Pace = (props) => {
  const [coordinate, setCoordinate] = useState([]);
  const [attributes, setAttributes] = useState({
    text: '',
    color: '',
    recommend: ''
  });
  const classes = useStyles();
  const value = Math.round(props.pace);
  useEffect(() => {
    const percentScale = scaleLinear().domain([0, 250]).range([0, 1]);
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
    .startAngle(-Math.PI / 2)
    .endAngle(-Math.PI / 4)
    .padAngle(0)
    .cornerRadius(2)();

  const orangeArcLeft = arc()
    .innerRadius(1)
    .outerRadius(0.9)
    .startAngle(-Math.PI / 4.15)
    .endAngle(Math.PI / 20)
    .padAngle(0)
    .cornerRadius(2)();
  const greenArc = arc()
    .innerRadius(1)
    .outerRadius(0.9)
    .startAngle(Math.PI / 17)
    .endAngle(Math.PI / 5.75)
    .padAngle(0)
    .cornerRadius(2)();

  const orangeArcRight = arc()
    .innerRadius(1)
    .outerRadius(0.9)
    .startAngle(Math.PI / 5.5)
    .endAngle(Math.PI / 3.5)
    .padAngle(0)
    .cornerRadius(2)();

  const redArcRight = arc()
    .innerRadius(1)
    .outerRadius(0.9)
    .startAngle(Math.PI / 3.35)
    .endAngle(Math.PI / 2)
    .padAngle(0)
    .cornerRadius(2)();

  const getBlobColor = (value) => {
    if (value >= 0 && value < 60) return '#e81246';
    if (value >= 60 && value < 140) return '#ee8d41';
    if (value >= 140 && value <= 170) return '#4dff4d';
    if (value > 170 && value <= 200) return '#ee8d41';
    if (value > 200) return '#e81246';
  };

  useEffect(() => {
    const getTextAndColor = (value) => {
      if (value >= 0 && value < 60)
        setAttributes({
          text: 'Very Slow',
          color: '#e81246',
          recommend: 'Your pace is very slow, try to speed up your speech!'
        });
      if (value >= 60 && value < 140)
        setAttributes({
          text: 'Slow',
          color: '#ee8d41',
          recommend: 'Your pace is slow, try to speed up your speech a bit'
        });
      if (value >= 140 && value <= 170)
        setAttributes({
          text: 'Good',
          color: '#4dff4d',
          recommend: 'Your pace is conversational. Keep it up!'
        });
      if (value > 170 && value <= 200)
        setAttributes({
          text: 'Fast',
          color: '#ee8d41',
          recommend: 'Your pace is fast, try to speed down your speech a bit'
        });
      if (value > 200)
        setAttributes({
          text: 'Very Fast',
          color: '#e81246',
          recommend: 'Your pace is very fast, try to speed down your speech!'
        });
    };
    getTextAndColor(value);
  }, [value]);

  return (
    <Card {...props}>
      <CardHeader title="Pace" />
      <Divider />
      <CardContent className={classes.cardContent}>
        <Box className={classes.gaugeContainer}>
          <svg viewBox={[-1, -1, 2, 1].join(' ')} className={classes.gauge}>
            <path d={redArcLeft} fill="#e81246" />
            <path d={orangeArcLeft} fill="#ee8d41" />
            <path d={greenArc} fill="#4dff4d" />
            <path d={orangeArcRight} fill="#ee8d41" />
            <path d={redArcRight} fill="#e81246" />
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
