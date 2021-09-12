import {
  Grid,
  Card,
  CardContent,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    padding: '2rem 2rem 0 2rem',
    [theme.breakpoints.down('lg')]: {
      margin: '0 15em'
    },
    [theme.breakpoints.down('md')]: {
      margin: '0 5em',
      height: '15em'
    },
    [theme.breakpoints.down('sm')]: {
      margin: '0 1em',
      height: '13em'
    }
  },
  cardImg: {
    height: '20em',
    width: '100%',
    [theme.breakpoints.down('lg')]: {
      height: '18em'
    },
    [theme.breakpoints.down('md')]: {
      height: '15em'
    },
    [theme.breakpoints.down('sm')]: {
      height: '13em'
    }
  }
}));

const goals = [
  {
    image: 'static/images/undraw_Recording_re_5xyq.svg',
    detail: 'To transform your presentation video into the sound'
  },
  {
    image: 'static/images/undraw_Analytics_re_dkf8.svg',
    detail: 'To analyst your rehearsal into the dashboard'
  },
  {
    image: 'static/images/undraw_Growth_curve_re_t5s7.svg',
    detail: 'To guilde your to achieve a good presentation performance'
  }
];

const GoalCard = (props) => {
  const classes = useStyles();
  return (
    <Grid container spacing={3}>
      {goals.map((item, index) => {
        return (
          <Grid item lg={4} md={12} xl={4} xs={12} key={index}>
            <Card {...props} className={classes.card}>
              <img
                src={item.image}
                alt="hero-section"
                className={classes.cardImg}
              />

              <CardContent>
                <Typography align="center" variant="h5" component="h2">
                  {item.detail}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default GoalCard;
