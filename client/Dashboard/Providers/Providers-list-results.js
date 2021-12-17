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

export const ProviderListResults = ({ providers, ...rest }) => {
  const [selectedProviderIds, setSelectedProviderIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedProviderIds;

    if (event.target.checked) {
      newSelectedProviderIds = providers.map((provider) => provider.id);
    } else {
      newSelectedProviderIds = [];
    }

    setSelectedProviderIds(newSelectedProviderIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedProviderIds.indexOf(id);
    let newSelectedProviderIds = [];

    if (selectedIndex === -1) {
      newSelectedProviderIds = newSelectedProviderIds.concat(
        selectedProviderIds,
        id,
      );
    } else if (selectedIndex === 0) {
      newSelectedProviderIds = newSelectedProviderIds.concat(
        selectedProviderIds.slice(1),
      );
    } else if (selectedIndex === selectedProviderIds.length - 1) {
      newSelectedProviderIds = newSelectedProviderIds.concat(
        selectedProviderIds.slice(0, -1),
      );
    } else if (selectedIndex > 0) {
      newSelectedProviderIds = newSelectedProviderIds.concat(
        selectedProviderIds.slice(0, selectedIndex),
        selectedProviderIds.slice(selectedIndex + 1),
      );
    }

    setSelectedProviderIds(newSelectedProviderIds);
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
                    checked={selectedProviderIds.length === providers.length}
                    color='primary'
                    indeterminate={
                      selectedProviderIds.length > 0 &&
                      selectedProviderIds.length < providers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                {/* <TableCell>Registration date</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {providers
                .slice(page * limit, page * limit + limit)
                .map((provider) => (
                  <TableRow
                    hover
                    key={provider._id}
                    selected={selectedProviderIds.indexOf(provider._id) !== -1}
                  >
                    <TableCell padding='checkbox'>
                      <Checkbox
                        checked={
                          selectedProviderIds.indexOf(provider._id) !== -1
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
                    <TableCell>{provider.email}</TableCell>
                    <TableCell>{provider.phone}</TableCell>
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
        count={providers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

ProviderListResults.propTypes = {
  providers: PropTypes.array.isRequired,
};
