import {
  Box,
  CircularProgress,
  Container,
  makeStyles,
  Typography,
  useTheme,
} from '@material-ui/core';
import React, { useEffect, useState, useContext } from 'react';
import { list as listRoles, remove } from '../../../core/api-roles';
import { CustomerListToolbar } from '../SharedComponents/ListToolbar';
import { ListResults } from '../SharedComponents/ListTable';

import { GlobalContext } from '../../../context/RoleContext';
import RoleForm from './components/RoleForm';

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

function Roles() {
  console.log('Roles', useContext(GlobalContext));
  const classes = useStyles();
  const theme = useTheme();
  const { roles, loadRoles } = useContext(GlobalContext);
  const [rolesCopy, setRolesCopy] = useState([]);
  const [selectedValue, setSelectedValue] = React.useState('name');
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [data2, setData2] = useState({});
  const [loading, setLoading] = useState(true);
  const { deleteRole } = useContext(GlobalContext);

  useEffect(async () => {
    const _roles = await listRoles();
    loadRoles(_roles);
    setRolesCopy(_roles);
    if (_roles) setLoading(false);
  }, []);

  const requestSearch = (searchedVal) => {
    const filteredRows = rolesCopy.filter((row) => {
      return row[selectedValue]
        .toLowerCase()
        .includes(searchedVal.target.value.toLowerCase());
    });
    loadRoles(filteredRows);
  };

  const filterOptions = [{ value: 'name', label: 'Name' }];

  const cells = [
    {
      name: 'Rol',
      value: 'name',
    },
  ];

  const handleRemove = (role) => async () => {
    await remove(role._id);
    deleteRole(role._id);
  };

  const handleOpen = (role) => () => {
    setOpen(true);
    setData(role);
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
            title='Rol'
            id='xxx'
            form={<RoleForm />}
          />
          <Box marginTop={theme.spacing(1 * 0.38)}>
            {roles.length > 0 ? (
              <ListResults
                list={roles}
                cells={cells}
                edit={handleOpen}
                remove={handleRemove}
                open={open}
                data={data}
                form={<RoleForm data={data} handleClose={handleClose} />}
                // form2={<RoleFormList data={data2} />}
                clickcell={onClickCell}
                cellLink='/role/'
                adminEdit
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

export default Roles;
