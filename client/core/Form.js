import React from 'react';
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Icon,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import Categories from './components/Categories.component';
import Providers from './components/Providers.component';
import DateComponent from './components/Date.component';

import { getDay } from 'date-fns';
import Editor from './components/Editor/Editor';
import { dayOfWeek } from '../helpers/dates';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 350,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  error: {
    verticalAlign: 'middle',
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  button: {
    width: '90%',
  },
}));

export default function Form() {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    email: '',
    terms: false,
    category: '',
    date: Date.now(),
    content: '',
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleChangeCB = (name) => (event) => {
    setValues({ ...values, [event.target.name]: event.target.checked });
  };

  const handleQuotation = async () => {
    if (
      !values.email ||
      !values.category ||
      !values.provider ||
      !values.content ||
      !values.terms
    ) {
      setValues({ ...values, error: 'Llenar los campos' });
      return;
    }
    const textLength = values.content.length;
    const dayToPublish = dayOfWeek[getDay(values.date)];
    const _quote = values.prices.find(
      (price) => price.length > textLength && price.days.includes(dayToPublish),
    );
    console.log(_quote);
    return _quote;
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Categories values={{ values, setValues }} />
        <Providers values={{ values, setValues }} />
        <DateComponent values={{ values, setValues }} />
        <Editor values={{ values, setValues }} />
        <TextField
          id='email'
          type='email'
          label='Email'
          className={classes.textField}
          value={values.email}
          onChange={handleChange('email')}
          margin='normal'
          required
          disabled={!values.content}
        />
        <FormControlLabel
          control={
            <Checkbox
              color='primary'
              checked={values.terms}
              onChange={handleChangeCB('terms')}
              id='terms'
              name='terms'
            />
          }
          label='Acepto terminos y condiciones'
        />
        <br />
        <Button
          variant='contained'
          color='primary'
          className={classes.button}
          onClick={handleQuotation}
        >
          Cotizar
        </Button>
        <br />
        {values.error && (
          <Typography component='p' color='error'>
            <Icon color='error' className={classes.error}>
              error
            </Icon>
            {values.error}
          </Typography>
        )}

        <br />
      </CardContent>
    </Card>
  );
}
