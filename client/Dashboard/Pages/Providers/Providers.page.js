import { Box, CircularProgress, Container, makeStyles, Typography, useTheme } from '@material-ui/core';
import React, { useEffect, useState, useContext } from 'react';
import { listProviders, remove } from '../../../core/api-providers';
import { CustomerListToolbar } from '../SharedComponents/ListToolbar';
import { ListResults } from '../SharedComponents/ListTable';
import { GlobalContext } from '../../../context/ProviderContext';
import ProviderForm from './components/ProviderForm';
// import ProviderFormList from './components/ProviderFormList';

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
    display: 'flex',
    padding: '100px',
  },
  skeleton: {
    width: 300,
  },
}));

function Providers() {
  const theme = useTheme();
  const classes = useStyles();
  const { providers, loadProviders, deleteProvider } = useContext(GlobalContext);
  const [providersCopy, setProvidersCopy] = useState([]);
  const [selectedValue, setSelectedValue] = React.useState('name');
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [data2, setData2] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const _providers = await listProviders();
    loadProviders(_providers);
    setProvidersCopy(_providers);
    if (_providers) setLoading(false);
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
    deleteProvider(provider._id);
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

  const loadingState = () => {
    if (loading) {
      return (
        <div className={classes.root}>
          <CircularProgress />
        </div>
      );
    }
    return (
      <div className={classes.root}>
        <Typography variant='body1' component='h2'>
          No hay Resultados 😅
        </Typography>
      </div>
    );
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
                edit={handleOpen}
                remove={handleRemove}
                open={open}
                data={data}
                form={<ProviderForm data={data} handleClose={handleClose} />}
                // form2={<CategoryFormList data={data2} />}
                clickcell={onClickCell}
              />
            ) : loadingState()}
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Providers;
