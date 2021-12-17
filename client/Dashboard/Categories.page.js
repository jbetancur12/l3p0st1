import { Box, Container, useTheme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { list as listCategories } from '../core/api-categories';
import { CategoryListToolbar } from './Categories/category-list-toolbar';
import { CategoryListResults } from './Categories/Categories-list-results';

function Categories() {
  const theme = useTheme();
  const [categories, setCategories] = useState([]);
  useEffect(async () => {
    const _categories = await listCategories();
    console.log(_categories);
    setCategories(_categories);
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
          <CategoryListToolbar />
          <Box marginTop={theme.spacing(1 * 0.38)}>
            <CategoryListResults categories={categories} />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Categories;
