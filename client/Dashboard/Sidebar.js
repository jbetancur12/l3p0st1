import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Divider,
  Drawer,
  makeStyles,
  SvgIcon,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';
import { Logo } from './logo';
import { NavItem } from './nav-item';
import DashboardIcon from '@material-ui/icons/Dashboard';
import GroupIcon from '@material-ui/icons/Group';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import { useTheme } from '@material-ui/core/styles';
import NoteIcon from '@material-ui/icons/Note';
import CategoryIcon from '@material-ui/icons/Category';

const useStyles = makeStyles((theme) => ({
  drawerPape: {
    backgroundColor: '#111827',
    color: '#FFFFFF',
    width: 280,
  },
  divider: {
    background: '#2D3748',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

const items = [
  {
    href: '/dashboard',
    icon: <DashboardIcon fontSize='small' />,
    title: 'Dashboard',
  },
  // {
  //   href: '/providers',
  //   icon: <GroupIcon fontSize='small' />,
  //   title: 'Customers',
  // },
  {
    href: '/products',
    icon: <ShoppingCartIcon fontSize='small' />,
    title: 'Products',
  },
  {
    href: '/customers',
    icon: <PersonIcon fontSize='small' />,
    title: 'Customers',
  },
  {
    href: '/providers',
    icon: <NoteIcon />,
    title: 'Medios',
  },
  {
    href: '/categories',
    icon: <CategoryIcon fontSize='small' />,
    title: 'Categorias',
  },
];

export default function Sidebar() {
  const classes = useStyles();
  const theme = useTheme();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false,
  });

  const content = (
    <>
      <Box display='flex' flexDirection='column' height='100%'>
        <div>
          <Box padding={theme.spacing(3, 3)}>
            <Link to='/'>
              <Logo
                style={{
                  height: 42,
                  width: 42,
                }}
              />
            </Link>
          </Box>
        </div>
        <Divider
          classes={{
            root: classes.divider, // class name, e.g. `classes-nesting-root-x`
            // class name, e.g. `classes-nesting-label-x`
          }}
          variant='middle'
        />
        <Box flexGrow={1}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
        <Divider style={{ borderColor: '#2D3748' }} />
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor='left'
        open
        PaperProps={{
          className: classes.drawerPape,
        }}
        variant='permanent'
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor='left'
      onClose={onClose}
      open={open}
      PaperProps={{
        className: classes.drawerPape,
      }}
      style={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant='temporary'
    >
      {content}
    </Drawer>
  );
}
