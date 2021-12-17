import React, { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@material-ui/core';
// import { getInitials } from '../../utils/get-initials';

export const ProductListResults = ({ product, ...rest }) => {
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedProductIds;

    if (event.target.checked) {
      newSelectedProductIds = product.map((product) => product._id);
    } else {
      newSelectedProductIds = [];
    }

    setSelectedProductIds(newSelectedProductIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedProductIds.indexOf(id);
    let newSelectedProductIds = [];

    if (selectedIndex === -1) {
      newSelectedProductIds = newSelectedProductIds.concat(
        selectedProductIds,
        id,
      );
    } else if (selectedIndex === 0) {
      newSelectedProductIds = newSelectedProductIds.concat(
        selectedProductIds.slice(1),
      );
    } else if (selectedIndex === selectedProductIds.length - 1) {
      newSelectedProductIds = newSelectedProductIds.concat(
        selectedProductIds.slice(0, -1),
      );
    } else if (selectedIndex > 0) {
      newSelectedProductIds = newSelectedProductIds.concat(
        selectedProductIds.slice(0, selectedIndex),
        selectedProductIds.slice(selectedIndex + 1),
      );
    }

    setSelectedProductIds(newSelectedProductIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding='checkbox'>
                  <Checkbox
                    checked={selectedProductIds.length === product.length}
                    color='primary'
                    indeterminate={
                      selectedProductIds.length > 0 &&
                      selectedProductIds.length < product.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Name</TableCell>
                {/* <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell> */}
                {/* <TableCell>Registration date</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {product
                .slice(page * limit, page * limit + limit)
                .map((product) => (
                  <TableRow
                    hover
                    key={product._id}
                    selected={selectedProductIds.indexOf(product._id) !== -1}
                  >
                    <TableCell padding='checkbox'>
                      <Checkbox
                        checked={
                          selectedProductIds.indexOf(product._id) !== -1
                        }
                        onChange={(event) =>
                          handleSelectOne(event, product._id)
                        }
                        value='true'
                      />
                    </TableCell>
                    <TableCell>
                      <Box alignItems='center' display='flex'>
                        {/* <Avatar src={product.avatarUrl} sx={{ mr: 2 }}>
                        {getInitials(product.name)}
                      </Avatar> */}
                        <Typography color='textPrimary' variant='body1'>
                          {`${product.name}`}
                        </Typography>
                      </Box>
                    </TableCell>
                    {/* <TableCell>{product.email}</TableCell>
                  <TableCell>{product.phone}</TableCell> */}
                    {/* <TableCell>
                    {format(product.createdAt, 'dd/MM/yyyy')}
                  </TableCell> */}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component='div'
        count={product.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

ProductListResults.propTypes = {
  product: PropTypes.array.isRequired,
};
