import React from 'react'
import PropTypes from 'prop-types';
import { styled } from '@material-ui/core/styles';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import BellIcon from '@material-ui/icons/Notifications';
import UserCircleIcon from '@material-ui/icons/RadioButtonUnchecked';
import UsersIcon from '@material-ui/icons/Group';

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

export default function DashboardNavbar(props) {
  const { onSidebarOpen, ...other } = props;

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: 'calc(100% - 280px)',
          },
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none',
              },
            }}
          >
            <MenuIcon fontSize='small' />
          </IconButton>
          <Tooltip title='Search'>
            <IconButton sx={{ ml: 1 }}>
              <SearchIcon fontSize='small' />
            </IconButton>
          </Tooltip>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title='Contacts'>
            <IconButton sx={{ ml: 1 }}>
              <UsersIcon fontSize='small' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Notifications'>
            <IconButton sx={{ ml: 1 }}>
              <Badge badgeContent={4} color='primary' variant='dot'>
                <BellIcon fontSize='small' />
              </Badge>
            </IconButton>
          </Tooltip>
          <Avatar
            sx={{
              height: 40,
              width: 40,
              ml: 1,
            }}
            src='../assets/images/avatar_1.png'
          >
            <UserCircleIcon fontSize='small' />
          </Avatar>
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
}

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};