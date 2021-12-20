import { Box, Container, useTheme } from '@material-ui/core';
import React, { useEffect, useState, useContext } from 'react';
import { listProviders } from '../../../core/api-providers';
import { CustomerListToolbar } from '../SharedComponents/ListToolbar';
import { ListResults } from '../SharedComponents/ListTable';
import { GlobalContext } from '../../../context/ProviderContext';
import ProviderForm from './components/ProviderForm';
// import ProviderFormList from './components/ProviderFormList';

function Providers() {
  const theme = useTheme();
  const { providers, loadProviders } = useContext(GlobalContext);
  const [providersCopy, setProvidersCopy] = useState([]);
  const [selectedValue, setSelectedValue] = React.useState('name');
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [data2, setData2] = useState({});

  useEffect(async () => {
    const _providers = await listProviders();
    loadProviders(_providers);
    setProvidersCopy(_providers);
  }, []);

  const requestSearch = (searchedVal) => {
    const filteredRows = providersCopy.filter((row) => {
      return row[selectedValue]
        .toLowerCase()
        .includes(searchedVal.target.value.toLowerCase());
    });
    loadProviders(filteredRows);
  };

  const filterOptions = [
    { value: 'name', label: 'Nombre' },
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone' },
  ];

  const cells = [
    { value: 'name', name: 'Nombre' },
    { value: 'email', name: 'Email' },
    { value: 'phone', name: 'Phone' },
  ];

  const handleRemove = (provider) => async () => {
    await remove(provider._id);
    deletProvider(provider._id);
  };

  const handleOpen = (provider) => () => {
    setOpen(true);
    setData(provider);
  };

  const handleClose = (action) => () => {
    if (action === 'accept') {
      setOpen(false);
    }
    if (action === 'cancel') {
      setOpen(false);
    }
  };
  const onClickCell = (list) => {
    setData2(list);
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
            title='Medio'
            form={<ProviderForm />}
          />
          <Box marginTop={theme.spacing(1 * 0.38)}>
            {providers.length > 0 ? (
              <ListResults
                list={providers}
                cells={cells}
                onEdit={handleOpen}
                onRemove={handleRemove}
                open={open}
                data={data}
                form={<ProviderForm data={data} handleClose={handleClose} />}
                // form2={<CategoryFormList data={data2} />}
                onClickCell={onClickCell}
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

export default Providers;
