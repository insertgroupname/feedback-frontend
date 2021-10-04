import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import Logo from './Logo';
import LoginIcon from '@material-ui/icons/Login';

const MainNavbar = (props) => (
  <AppBar elevation={0} {...props}>
    <Toolbar
      sx={{ display: 'flex', justifyContent: 'space-between', height: 64 }}
    >
      <RouterLink to="/">
        <Logo />
      </RouterLink>
      <RouterLink to="/login">
        <Button variant="contained" endIcon={<LoginIcon size="large" />}>
          Login
        </Button>
      </RouterLink>
    </Toolbar>
  </AppBar>
);

export default MainNavbar;
