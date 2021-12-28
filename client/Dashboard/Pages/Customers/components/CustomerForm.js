import { Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import React, { useState, useEffect, useContext } from 'react';
import { useStyles } from '../../../utils';
import { GlobalContext } from '../../../../context/GlobalContext';
import { update } from '../../../../user/api-user';
import auth from '../../../../auth/auth-helper'

function Dashboard(props) {
  const classes = useStyles();
  const [values, setValues] = useState({ role: props.data.role });
  const { addCategory, updateCategory } = useContext(GlobalContext);
  const ff = (arr) => {
    return arr.map((a) => a._id);
  };

  const handleChange = (name) => (event) => {
    if (name !== 'categories') {
      setValues({ ...values, [name]: event.target.value });
    } else {
      setValues({ ...values, [name]: ff(event) });
    }
  };

  const handleSubmit = async () => {

    try {
      let response;
      if (!props.data) {
        response = await fetch('/api/categories/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        // const category = await response.json();
        // addCategory(category.payload);
      } else {
        response = await update({
          userId: props.data._id,
        },
          {
            t: auth.isAuthenticated().token,
          },
          values)

      }
      if (response.ok) {
        props.handleClose('cancel')();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const color = {
    control: (styles) => ({
      ...styles,
      fontFamily: 'Roboto',
      zIndex: 100,
      marginBottom: '35px',
      border: 'none',
      borderBottom: '1px solid gray',
      borderRadius: '0',
      textAlign: 'left',
    }),
    menuList: (styles) => ({
      ...styles,
      fontFamily: 'Roboto',
      zIndex: 9999,
      borderRadius: 10,
    }),
  };

  useEffect(() => {
    if (props.data) {
      console.log(props);
      setValues({
        ...props.data
      });
    }
  }, []);

  return (
    <Card className={classes.card}>
      <CardContent>
        <FormControl >
          <InputLabel id="demo-simple-select-label">Rol</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={values.role}
            onChange={handleChange('role')}
          >

            <MenuItem value={'admin'}>Admin</MenuItem>
            <MenuItem value={'editor'}>Editor</MenuItem>
            <MenuItem value={'user'}>Usuario</MenuItem>
          </Select>
        </FormControl>
        <br />
        <br />
        <Button
          variant='contained'
          color='primary'
          className={classes.button}
          onClick={handleSubmit}
        >
          {props.data ? 'Editar' : 'Crear'}
        </Button>
        <br />
        <br />
        <Button
          variant='contained'
          color='secondary'
          className={classes.button}
          onClick={props.handleClose('cancel')}
        >
          Cancelar
        </Button>
      </CardContent>
    </Card>
  );
}

export default Dashboard;
