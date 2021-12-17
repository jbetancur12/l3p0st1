import { Box, Container, useTheme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { list } from '../../../user/api-user';
import { CustomerListToolbar } from './components/Customer-toolbar';
import { CustomerListResults } from './components/Customers-list';

function Customers() {
  const theme = useTheme();
  const [customers, setCustomers] = useState([]);
  const [customersCopy, setCustomersCopy] = useState([]);
  const [selectedValue, setSelectedValue] = React.useState('name');

  useEffect(async () => {
    const _users = await list();
    setCustomers(_users);
    setCustomersCopy(_users);
  }, []);

  const requestSearch = (searchedVal) => {
    const filteredRows = customersCopy.filter((row) => {
      return row[selectedValue]
        .toLowerCase()
        .includes(searchedVal.target.value.toLowerCase());
    });
    setCustomers(filteredRows);
  };

  const filterOptions = [
    { value: 'name', label: 'Nombre' },
    { value: 'lname', label: 'Apellido' },
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Telefono' },
  ];

  return (
    <>
      <Box
        component='main'
        flexGrow={1}
        paddingBottom={theme.spacing(1)}
        paddingTop={theme.spacing(1)}
      >
        <Container maxWidth={false}>
          <CustomerListToolbar
            search={requestSearch}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            filterOptions={filterOptions}
          />
          <Box marginTop={theme.spacing(1 * 0.38)}>
            {customers.length > 0 ? (
              <CustomerListResults customers={customers} />
            ) : (
              <div>Loading</div>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Customers;
