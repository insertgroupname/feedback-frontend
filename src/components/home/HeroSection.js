import { Box, Typography, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  wrapperContainer: {
    background: 'linear-gradient(180deg, #5664D2 0%, #7685FF 100%)',
    display: 'flex',
    height: '100%',
    padding: '6rem 2rem',
    gap: '7rem',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      gap: '3rem',
      flexDirection: 'column'
    }
  },
  leftContainer: {
    display: 'flex',
    flexBasis: '30%',
    flexDirection: 'column',
    gap: '1.8rem',
    [theme.breakpoints.down('md')]: {
      alignItems: 'center'
    }
  },
  createButton: {
    [theme.breakpoints.down('md')]: {
      width: '75%'
    }
  },
  heroImage: {
    height: '22.5em',
    backgroundSize: 'cover',
    [theme.breakpoints.down('md')]: {
      height: '18em'
    }
  }
}));

const HeroSection = () => {
  const classes = useStyles();
  return (
    <Box className={classes.wrapperContainer}>
      <Box className={classes.leftContainer}>
        <Typography variant="h1" color="#fff">
          Improve your presentation by yourself
        </Typography>
        <Typography variant="body1" color="#fff">
          If you have any trouble in presentation or public speaking, lets we
          guide you to improve your presentation from your own rehearsal
        </Typography>
        <Button
          variant="outlined"
          size="large"
          style={{ borderColor: '#fff', color: '#fff' }}
          className={classes.createButton}
        >
          CREATE AN ACCOUNT
        </Button>
      </Box>
      <Box>
        <img
          src="static/images/undraw_Pitching_re_fpgk.svg"
          alt="hero-section"
          className={classes.heroImage}
        />
      </Box>
    </Box>
  );
};
export default HeroSection;
