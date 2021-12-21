import React, { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';

// import { getInitials } from '../../utils/get-initials';

export const ListResults = ({
  list,
  cells,
  clickcell,
  remove,
  edit,
  cellLink,
  ...rest
}) => {
  const [selectedListIds, setSelectedListIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const handleSelectAll = (event) => {
    let newSelectedListIds;

    if (event.target.checked) {
      newSelectedListIds = list.map((list) => list._id);
    } else {
      newSelectedListIds = [];
    }

    setSelectedListIds(newSelectedListIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedListIds.indexOf(id);
    let newSelectedListIds = [];

    if (selectedIndex === -1) {
      newSelectedListIds = newSelectedListIds.concat(selectedListIds, id);
    } else if (selectedIndex === 0) {
      newSelectedListIds = newSelectedListIds.concat(selectedListIds.slice(1));
    } else if (selectedIndex === selectedListIds.length - 1) {
      newSelectedListIds = newSelectedListIds.concat(
        selectedListIds.slice(0, -1),
      );
    } else if (selectedIndex > 0) {
      newSelectedListIds = newSelectedListIds.concat(
        selectedListIds.slice(0, selectedIndex),
        selectedListIds.slice(selectedIndex + 1),
      );
    }

    setSelectedListIds(newSelectedListIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const onClickCell = (listCell) => () => {
    // setOpen(true);
    clickcell(listCell);
  };

  const handleClose = (action) => () => {
    if (action === 'accept') {
      setOpen(false);
    }
    if (action === 'cancel') {
      setOpen(false);
    }
  };

  const ll = rest.form2 && {
    ...rest.form2,
    props: { ...rest.form2.props, onClose: handleClose },
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
                    checked={selectedListIds.length === list.length}
                    color='primary'
                    indeterminate={
                      selectedListIds.length > 0 &&
                      selectedListIds.length < list.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                {cells.map((cell) => (
                  <TableCell key={cell.name}>{cell.name}</TableCell>
                ))}
                {/* <TableCell>Registration date</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {list.slice(page * limit, page * limit + limit).map((list) => (
                <TableRow
                  hover
                  key={list._id}
                  selected={selectedListIds.indexOf(list._id) !== -1}
                >
                  <TableCell padding='checkbox'>
                    <Checkbox
                      checked={selectedListIds.indexOf(list._id) !== -1}
                      onChange={(event) => handleSelectOne(event, list._id)}
                      value='true'
                    />
                  </TableCell>
                  {cells.map((cell, idx) => (
                    <TableCell onClick={onClickCell(list)} key={cell.value}>
                      {idx === 0 ? (<Link to={+ list._id}>
                        {list[cell.value]}
                      </Link>) : list[cell.value]}
                    </TableCell>
                  ))}
                  <TableCell>
                    <IconButton aria-label='delete' onClick={remove(list)}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label='edit' onClick={edit(list)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  {/* <TableCell>
                    {format(list.createdAt, 'dd/MM/yyyy')}
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        {rest.form && (
          <Modal
            // disablePortal
            instanceId='sdsdd'
            open={rest.open}
            onClose={rest.handleClose}
            aria-labelledby='simple-modal-title'
            aria-describedby='simple-modal-description'
          >
            {rest.form}
          </Modal>
        )}

        {rest.form2 && (
          <Modal
            // disablePortal
            instanceId='sdsddd'
            open={open}
            onClose={handleClose}
            aria-labelledby='simple-modal-title2'
            aria-describedby='simple-modal-description2'
          >
            {ll}
          </Modal>
        )}
      </PerfectScrollbar>
      <TablePagination
        component='div'
        count={list.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

ListResults.propTypes = {
  list: PropTypes.array.isRequired,
};
