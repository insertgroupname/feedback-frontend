import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography
} from '@material-ui/core';
import {
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  BarChart2 as BarChart2Icon,
  User as AdminIcon,
  LogOut as LogoutIcon
} from 'react-feather';
import NavItem from './NavItem';
import { logout } from 'src/redux/actions/authActions';

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  let items;

  const settingsState = useSelector((state) => state.settings);
  const { isLoading, type } = settingsState;

  const location = useLocation();

  if (type === 'admin') {
    items = [
      {
        href: '/app/landing',
        icon: BarChartIcon,
        title: 'Landing'
      },
      {
        href: '/app/analytics',
        icon: BarChart2Icon,
        title: 'Analytics'
      },
      {
        href: '/app/settings',
        icon: SettingsIcon,
        title: 'Settings'
      },
      {
        href: '/app/admin',
        icon: AdminIcon,
        title: 'Admin'
      },
      {
        icon: LogoutIcon,
        title: 'Logout',
        handle: handleLogout
      }
    ];
  } else {
    items = [
      {
        href: '/app/landing',
        icon: BarChartIcon,
        title: 'Landing'
      },
      {
        href: '/app/analytics',
        icon: BarChart2Icon,
        title: 'Analytics'
      },
      {
        href: '/app/settings',
        icon: SettingsIcon,
        title: 'Settings'
      },
      {
        icon: LogoutIcon,
        title: 'Logout',
        handle: handleLogout
      }
    ];
  }

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Typography align="center" variant="h3" color="primary">
          FEEDBACK
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {isLoading
            ? null
            : items.map((item) => (
                <NavItem
                  href={item.href}
                  key={item.title}
                  title={item.title}
                  icon={item.icon}
                  handle={item.handle}
                />
              ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default DashboardSidebar;
