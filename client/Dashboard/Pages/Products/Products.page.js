import {
  Box,
  CircularProgress,
  Container,
  makeStyles,
  Typography,
  useTheme,
} from '@material-ui/core';
import React, { useEffect, useState, useContext } from 'react';
import { listProducts, remove } from '../../../core/api-products';
import { CustomerListToolbar } from '../SharedComponents/ListToolbar';
import { ListResults } from '../SharedComponents/ListTable';
import { GlobalContext } from '../../../context/ProductContext';
import ProductForm from './components/ProductForm';
// import ProductFormList from './components/ProductFormList';

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

function Products() {
  const theme = useTheme();
  const classes = useStyles();
  const { products, loadProducts, deleteProduct } = useContext(GlobalContext);
  const [productsCopy, setProductsCopy] = useState([]);
  const [selectedValue, setSelectedValue] = React.useState('name');
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [data2, setData2] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const _products = await listProducts();
    loadProducts(_products);
    setProductsCopy(_products);
    if (_products) setLoading(false);
  }, []);

  const requestSearch = (searchedVal) => {
    const filteredRows = productsCopy.filter((row) => {
      return row[selectedValue]
        .toLowerCase()
        .includes(searchedVal.target.value.toLowerCase());
    });
    loadProducts(filteredRows);
  };

  const filterOptions = [
    { value: 'name', label: 'Nombre' },
    { value: 'price', label: 'Precio' },
  ];

  const cells = [
    { value: 'name', name: 'Nombre' },
    { value: 'price', name: 'Precio' },
  ];

  const handleRemove = (provider) => async () => {
    await remove(provider._id);
    deleteProduct(provider._id);
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
            title='Producto'
            form={<ProductForm />}
          />
          <Box marginTop={theme.spacing(1 * 0.38)}>
            {products.length > 0 ? (
              <ListResults
                list={products}
                cells={cells}
                edit={handleOpen}
                remove={handleRemove}
                open={open}
                data={data}
                form={<ProductForm data={data} handleClose={handleClose} />}
                // form2={<CategoryFormList data={data2} />}
                clickcell={onClickCell}
                cellLink='/product/'
              />
            ) : (
              loadingState()
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Products;
