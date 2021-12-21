import { Button, Card, CardContent, TextField } from '@material-ui/core';
import React, { useState, useEffect, useContext } from 'react';
import { list } from '../../../../core/api-categories';
import AsyncSelect from 'react-select/async';
import { useStyles } from '../../../utils';
import { GlobalContext } from '../../../../context/ProviderContext';

function Dashboard(props) {
  const classes = useStyles();
  const [values, setValues] = useState({});
  const { addProvider, updateProvider } = useContext(GlobalContext);
  const ff = (arr) => {
    console.log(arr);
    return arr.map((a) => {
      return { _id: a._id, name: a.name };
    });
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
        response = await fetch('/api/providers/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        const provider = await response.json();
        addProvider(provider.payload);
      } else {
        response = await fetch('/api/provider/' + props.data._id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...values,
            categories: values.categories.map((category) => category._id),
          }),
        });

        const provider = await response.json();
        console.log(provider);
        updateProvider(provider.payload);
      }
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
    console.log(props.data);
    if (props.data) {
      setValues(props.data);
    }
  }, []);
  console.log(values);
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
          value={values.categories}
        />
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
