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

export const CategoryListResults = ({ categories, ...rest }) => {
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedCategoryIds;

    if (event.target.checked) {
      newSelectedCategoryIds = categories.map((provider) => provider.id);
    } else {
      newSelectedCategoryIds = [];
    }

    setSelectedCategoryIds(newSelectedCategoryIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCategoryIds.indexOf(id);
    let newSelectedCategoryIds = [];

    if (selectedIndex === -1) {
      newSelectedCategoryIds = newSelectedCategoryIds.concat(
        selectedCategoryIds,
        id,
      );
    } else if (selectedIndex === 0) {
      newSelectedCategoryIds = newSelectedCategoryIds.concat(
        selectedCategoryIds.slice(1),
      );
    } else if (selectedIndex === selectedCategoryIds.length - 1) {
      newSelectedCategoryIds = newSelectedCategoryIds.concat(
        selectedCategoryIds.slice(0, -1),
      );
    } else if (selectedIndex > 0) {
      newSelectedCategoryIds = newSelectedCategoryIds.concat(
        selectedCategoryIds.slice(0, selectedIndex),
        selectedCategoryIds.slice(selectedIndex + 1),
      );
    }

    setSelectedCategoryIds(newSelectedCategoryIds);
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
                    checked={selectedCategoryIds.length === categories.length}
                    color='primary'
                    indeterminate={
                      selectedCategoryIds.length > 0 &&
                      selectedCategoryIds.length < categories.length
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
              {categories
                .slice(page * limit, page * limit + limit)
                .map((provider) => (
                  <TableRow
                    hover
                    key={provider._id}
                    selected={selectedCategoryIds.indexOf(provider._id) !== -1}
                  >
                    <TableCell padding='checkbox'>
                      <Checkbox
                        checked={
                          selectedCategoryIds.indexOf(provider._id) !== -1
                        }
                        onChange={(event) =>
                          handleSelectOne(event, provider._id)
                        }
                        value='true'
                      />
                    </TableCell>
                    <TableCell>
                      <Box alignItems='center' display='flex'>
                        {/* <Avatar src={provider.avatarUrl} sx={{ mr: 2 }}>
                        {getInitials(provider.name)}
                      </Avatar> */}
                        <Typography color='textPrimary' variant='body1'>
                          {`${provider.name}`}
                        </Typography>
                      </Box>
                    </TableCell>
                    {/* <TableCell>{provider.email}</TableCell>
                  <TableCell>{provider.phone}</TableCell> */}
                    {/* <TableCell>
                    {format(provider.createdAt, 'dd/MM/yyyy')}
                  </TableCell> */}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component='div'
        count={categories.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CategoryListResults.propTypes = {
  categories: PropTypes.array.isRequired,
};
