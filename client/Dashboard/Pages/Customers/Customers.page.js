import { Box, Container, useTheme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { list } from '../../../user/api-user';
import { CustomerListToolbar } from './components/Customer-toolbar';
import { CustomerListResults } from './components/Customers-list';

function Customers() {
  const theme = useTheme();
  const [customers, setCustomers] = useState([]);
  useEffect(async () => {
    const _users = await list();
    console.log(_users);
    setCustomers(_users);
  }, []);
  return (
    <>
      <Box
        component='main'
        flexGrow={1}
        paddingBottom={theme.spacing(1)}
        paddingTop={theme.spacing(1)}
      >
        <Container maxWidth={false}>
          <CustomerListToolbar />
          <Box marginTop={theme.spacing(1 * 0.38)}>
            <CustomerListResults customers={customers} />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Customers;
