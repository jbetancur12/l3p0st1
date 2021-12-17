import { Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import React, { useState } from 'react';
import Menu from './core/Menu';
import MenuDashboard from './Dashboard/Menu.js';
import DashboardSidebar from './Dashboard/Sidebar';

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280,
  },
}));

const LayoutOne = ({ children }) => (
  <div>
    <Menu />
    {children}
  </div>
);

const LayoutTwo = (props) => {
  const { children } = props;
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <DashboardLayoutRoot>
        <Box
          display='flex'
          flex='1 1 auto'
          flexDirection='column'
          width='100%'
        >
          {children}
        </Box>
      </DashboardLayoutRoot>
      <MenuDashboard onSidebarOpen={() => setSidebarOpen(true)} />
      <DashboardSidebar
        onClose={() => setSidebarOpen(false)}
        open={isSidebarOpen}
      />
    </>
  );
};

// const LayoutTwo = ({ children }) => (
//   <div>
//     <MenuDashboard />
//     {children}
//   </div>
// );

export { LayoutOne, LayoutTwo };
