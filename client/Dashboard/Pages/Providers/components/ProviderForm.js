import { Button, Card, CardContent, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { list } from '../../../../core/api-categories';
import AsyncSelect from 'react-select/async';
import { useStyles } from '../../../utils';

function Dashboard(props) {
  const classes = useStyles();
  const [values, setValues] = useState({});

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
      let response = await fetch('/api/providers/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        props.handleClose('cancel')();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const promiseOptions = async () => {
    return await list();
  };

  console.log(values);

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

  return (
    <Card className={classes.card}>
      <CardContent>
        <TextField
          id='name'
          label='Nombre'
          className={classes.textField}
          value={values.name}
          onChange={handleChange('name')}
          margin='normal'
          required
        />
        <TextField
          id='email'
          type='email'
          label='email'
          className={classes.textField}
          value={values.email}
          onChange={handleChange('email')}
          margin='normal'
          required
        />
        <TextField
          id='phone'
          label='Telefono'
          className={classes.textField}
          style={{ marginBottom: '35px' }}
          value={values.phone}
          onChange={handleChange('phone')}
          margin='normal'
          required
        />
        <AsyncSelect
          id='long-value-select'
          instanceId='long-value-select'
          isMulti
          cacheOptions
          defaultOptions
          loadOptions={promiseOptions}
          getOptionValue={(option) => option._id}
          getOptionLabel={(option) => option.name}
          onChange={handleChange('categories')}
          className={classes.selector}
          menuColor='red'
          styles={color}
          isSearchable
          menuPosition={'fixed'}
          placeholder='Categorias'
        />
        <Button
          variant='contained'
          color='primary'
          className={classes.button}
          onClick={handleSubmit}
        >
          Crear
        </Button>
        <Button
          variant='contained'
          color='primary'
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
