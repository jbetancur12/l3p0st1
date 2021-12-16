import { Button, Card, CardContent, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useStyles } from './utils';

function Categories() {
  const classes = useStyles();
  const [values, setValues] = useState({});

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  console.log(values);

  const handleSubmit = async () => {
    try {
      let response = await fetch('/api/categories/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      return await response.json();
    } catch (err) {
      console.log(err);
    }
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
        <Button
          variant='contained'
          color='primary'
          className={classes.button}
          onClick={handleSubmit}
        >
          Crear
        </Button>
      </CardContent>
    </Card>
  );
}

export default Categories;
