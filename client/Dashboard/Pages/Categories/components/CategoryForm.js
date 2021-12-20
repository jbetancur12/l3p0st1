import { Button, Card, CardContent, TextField } from '@material-ui/core';
import React, { useState, useEffect, useContext } from 'react';
import { list } from '../../../../core/api-categories';
import AsyncSelect from 'react-select/async';
import { useStyles } from '../../../utils';
import { GlobalContext } from '../../../../context/GlobalContext';

function Dashboard(props) {
  const classes = useStyles();
  const [values, setValues] = useState({});
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

        const category = await response.json();
        addCategory(category.payload);
      } else {
        response = await fetch('/api/category/' + props.data._id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        const category = await response.json();
        updateCategory(category.payload);
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
    if (props.data) {
      setValues({
        name: props.data.name,
      });
    }
  }, []);

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
