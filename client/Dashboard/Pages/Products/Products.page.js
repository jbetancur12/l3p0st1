import { Box, Container, useTheme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { listProducts } from '../../../core/api-products';
import { ProductListToolbar } from './components/product-list-toolbar';
import { ProductListResults } from './components/Product-list-results';

function Products() {
  const theme = useTheme();
  const [products, setProducts] = useState([]);
  useEffect(async () => {
    const _products = await listProducts();
    setProducts(_products);
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
          <ProductListToolbar />
          <Box marginTop={theme.spacing(1 * 0.38)}>
            <ProductListResults product={products} />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Products;
