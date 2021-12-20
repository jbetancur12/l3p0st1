import { Box, Container, useTheme } from '@material-ui/core';
import React, { useEffect, useState, useContext } from 'react';
import { list as listCategories } from '../../../core/api-categories';
import { CustomerListToolbar } from '../SharedComponents/ListToolbar';
import { ListResults } from '../SharedComponents/ListTable';
import { remove } from '../../../user/api-user';
import { GlobalContext } from '../../../context/GlobalContext';
import CategoryForm from './components/CategoryForm';
import CategoryFormList from './components/CategoryForm';

function Categories() {
  const theme = useTheme();
  const { categories, loadCategories } = useContext(GlobalContext);
  const [categoriesCopy, setCategoriesCopy] = useState([]);
  const [selectedValue, setSelectedValue] = React.useState('name');
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const { deleteCategory } = useContext(GlobalContext);

  useEffect(async () => {
    const _categories = await listCategories();
    loadCategories(_categories);
    setCategoriesCopy(_categories);
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
            form={<CategoryForm />}
          />
          <Box marginTop={theme.spacing(1 * 0.38)}>
            {categories.length > 0 ? (
              <ListResults
                list={categories}
                cells={cells}
                onEdit={handleOpen}
                onRemove={handleRemove}
                open={open}
                data={data}
                form={<CategoryForm data={data} handleClose={handleClose} />}
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

export default Categories;
