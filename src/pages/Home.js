import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import HeroSection from '../components/home/HeroSection';

const Home = () => {
  const navigate = useNavigate();

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
