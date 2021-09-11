import { Helmet } from 'react-helmet';
import { Container } from '@material-ui/core';
import HeroSection from '../components/home/HeroSection';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Container maxWidth="xl" style={{ padding: 0 }}>
        <HeroSection />
      </Container>
    </>
  );
};

export default Home;
