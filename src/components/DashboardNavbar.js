import { useContext } from 'react';
import { UserContext } from 'src/contexts/UserContext';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppBar, Box, Hidden, IconButton, Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';
import Logo from './Logo';
import Cookies from 'js-cookie';
import axios from 'axios';
import { url } from 'src/utils/globalVariable';

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  const { setUser } = useContext(UserContext);
  const handleLogout = () => {
    axios
      .get(`${url}/logout`)
      .then(() => {
        Cookies.remove('jwt');
        setUser((prevUser) => {
          return { ...prevUser, userId: '', isAuthentication: false };
        });
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response);
        } else if (err.request) {
          console.log(err.request);
        } else if (err.message) {
          console.log(err.message);
        }
      });
  };
  return (
    <AppBar elevation={0} {...rest}>
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        <Hidden lgDown>
          <IconButton color="inherit" onClick={handleLogout}>
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;
