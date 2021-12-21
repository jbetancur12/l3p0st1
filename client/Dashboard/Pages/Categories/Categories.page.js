import {
  Box,
  CircularProgress,
  Container,
  makeStyles,
  Typography,
  useTheme,
} from '@material-ui/core';
import React, { useEffect, useState, useContext } from 'react';
import { list as listCategories, remove } from '../../../core/api-categories';
import { CustomerListToolbar } from '../SharedComponents/ListToolbar';
import { ListResults } from '../SharedComponents/ListTable';

import { GlobalContext } from '../../../context/GlobalContext';
import CategoryForm from './components/CategoryForm';
import CategoryFormList from './components/CategoryFormList';

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

function Categories() {
  const classes = useStyles();
  const theme = useTheme();
  const { categories, loadCategories } = useContext(GlobalContext);
  const [categoriesCopy, setCategoriesCopy] = useState([]);
  const [selectedValue, setSelectedValue] = React.useState('name');
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [data2, setData2] = useState({});
  const [loading, setLoading] = useState(true);
  const { deleteCategory } = useContext(GlobalContext);

  useEffect(async () => {
    const _categories = await listCategories();
    loadCategories(_categories);
    setCategoriesCopy(_categories);
    if (_categories) setLoading(false);
  }, []);

  const requestSearch = (searchedVal) => {
    const filteredRows = categoriesCopy.filter((row) => {
      return row[selectedValue]
        .toLowerCase()
        .includes(searchedVal.target.value.toLowerCase());
    });
    loadCategories(filteredRows);
  };

  const filterOptions = [{ value: 'name', label: 'Nombre' }];

  const cells = [
    {
      name: 'Nombre',
      value: 'name',
    },
  ];

  const handleRemove = (category) => async () => {
    await remove(category._id);
    deleteCategory(category._id);
  };

  const handleOpen = (category) => () => {
    setOpen(true);
    setData(category);
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
            title='Categoria'
            id='xxx'
            form={<CategoryForm />}
          />
          <Box marginTop={theme.spacing(1 * 0.38)}>
            {categories.length > 0 ? (
              <ListResults
                list={categories}
                cells={cells}
                edit={handleOpen}
                remove={handleRemove}
                open={open}
                data={data}
                form={<CategoryForm data={data} handleClose={handleClose} />}
                // form2={<CategoryFormList data={data2} />}
                clickcell={onClickCell}
                cellLink='/category/'
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

export default Categories;
