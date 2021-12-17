import React from 'react';
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
  makeStyles,
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

const useStyles = makeStyles((theme) => ({
  toolbar: {
    minHeight: 64,
    left: 0,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  iconButton: {
    [theme.breakpoints.up('xs')]: {
      display: 'inline-flex',
    },
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  iconButtonRoot: {
    marginLeft: theme.spacing(1),
  },
  meniIcons: {
    ml: theme.spacing(1),
  },
  dashboardNavbarRoot: {
    [theme.breakpoints.up('lg')]: {
      left: 280,
      width: 'calc(100% - 280px)',
    },
  },
}));

export default function DashboardNavbar(props) {
  const classes = useStyles();
  const { onSidebarOpen, ...other } = props;

  return (
    <>
      <DashboardNavbarRoot className={classes.dashboardNavbarRoot} {...other}>
        <Toolbar disableGutters className={classes.toolbar}>
          <IconButton
            onClick={onSidebarOpen}
            classes={{
              root: classes.iconButton,
            }}
          >
            <MenuIcon fontSize='small' />
          </IconButton>
          <Tooltip title='Search'>
            <IconButton
              classes={{
                root: classes.iconButtonRoot,
              }}
            >
              <SearchIcon fontSize='small' />
            </IconButton>
          </Tooltip>
          <Box flexGrow={1} />
          <Tooltip title='Contacts'>
            <IconButton
              classes={{
                root: classes.iconButtonRoot,
              }}
            >
              <UsersIcon fontSize='small' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Notifications'>
            <IconButton
              classes={{
                root: classes.iconButtonRoot,
              }}
            >
              <Badge badgeContent={4} color='primary' variant='dot'>
                <BellIcon fontSize='small' />
              </Badge>
            </IconButton>
          </Tooltip>
          <Avatar src='../assets/images/avatar_1.png'></Avatar>
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
}

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};
