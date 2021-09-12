import { Helmet } from 'react-helmet';
import { Container, Typography, Box } from '@material-ui/core';
import HeroSection from '../components/home/HeroSection';
import GoalCard from 'src/components/home/GoalCard';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Container maxWidth="xl" style={{ padding: 0 }}>
        <HeroSection />
      </Container>
      <Container
        maxWidth="xl"
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '3.5rem 0'
        }}
      >
        <Typography
          align="center"
          variant="h1"
          style={{ paddingBottom: '2rem' }}
        >
          Our Goals
        </Typography>
        <Box
          sx={{
            margin: '0 auto'
          }}
        >
          <GoalCard sx={{ height: '100%' }} />
        </Box>
      </Container>
    </>
  );
};

export default Home;
