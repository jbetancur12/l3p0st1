import { Box, Container, useTheme } from '@material-ui/core';
import React, { useEffect, useState, useContext } from 'react';
import { list } from '../../../user/api-user';
import { CustomerListToolbar } from '../SharedComponents/ListToolbar';
import { ListResults } from '../SharedComponents/ListTable';
import { remove } from '../../../user/api-user';
import { GlobalContext } from '../../../context/GlobalContext';
import CustomerForm from './components/CustomerForm';

function Customers() {
  const theme = useTheme();
  const [customers, setCustomers] = useState([]);
  const [customersCopy, setCustomersCopy] = useState([]);
  const [selectedValue, setSelectedValue] = React.useState('name');
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const { deleteCategory } = useContext(GlobalContext);

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

  const cells = [
    {
      name: 'Nombre',
      value: 'name',
    },
    {
      name: 'Email',
      value: 'email',
    },
    {
      name: 'Telefono',
      value: 'phone',
    },
  ];

  const handleRemove = (customer) => async () => {
    await remove(id);
    deleteCategory(customer._id);
  };

  const handleOpen = (customer) => () => {
    setOpen(true);
    setData(customer);
  };

  const handleClose = (action) => () => {
    if (action === 'accept') {
      setOpen(false);
    }
    if (action === 'cancel') {
      setOpen(false);
    }
  };

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
            title='Usuario'
          />
          <Box marginTop={theme.spacing(1 * 0.38)}>
            {customers.length > 0 ? (
              <ListResults
                list={customers}
                cells={cells}
                onEdit={handleOpen}
                onRemove={handleRemove}
                open={open}
                data={data}
                form={<CustomerForm data={data} handleClose={handleClose} />}
              />
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
