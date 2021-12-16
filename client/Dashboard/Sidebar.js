import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Divider,
  Drawer,
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
import { useTheme } from '@material-ui/styles';


const items = [
  {
    href: '/dashboard',
    icon: <DashboardIcon fontSize='small' />,
    title: 'Dashboard',
  },
  {
    href: '/providers',
    icon: <GroupIcon fontSize='small' />,
    title: 'Customers',
  },
  {
    href: '/products',
    icon: <ShoppingCartIcon fontSize='small' />,
    title: 'Products',
  },
  {
    href: '/categories',
    icon: <PersonIcon fontSize='small' />,
    title: 'Account',
  },

];

export default function Sidebar() {
  const theme = useTheme()
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false,
  });

  const content = (
    <>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <div>
          <Box style={{ p: 3 }}>
            <Link to='/' >
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
          style={{
            borderColor: '#2D3748',
            my: 3,
          }}
        />
        <Box style={{ flexGrow: 1 }}>
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
          style: {

            color: '#FFFFFF',
            width: 280,
          },
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
        style: {
          color: '#FFFFFF',
          width: 280,
        },
      }}
      style={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant='temporary'
    >
      {content}
    </Drawer>
  );
}
