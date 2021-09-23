import { useState, useContext } from 'react';
import { UserContext } from 'src/contexts/UserContext';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import Logo from './Logo';
import Cookies from 'js-cookie';
import axios from 'axios';

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  const { setIsLoggedIn } = useContext(UserContext);
  const [notifications] = useState([]);
  const handleLogout = () => {
    axios
      .get('http://10.4.56.44:81/api/v1/logout')
      .then(() => {
        Cookies.remove('jwt');
        setIsLoggedIn(false);
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
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
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
