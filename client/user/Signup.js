import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import { create } from './api-user.js';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
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
}));

export default function Signup() {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: '',
    password: '',
    email: '',
    open: false,
    error: '',
    terms: false,
    lname: '',
    address: '',
    city: '',
    phone: '',
    doc_id: ''
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleChangeCB = (name) => (event) => {
    setValues({ ...values, [name]: event.target.checked });
  };

  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
      lname: values.lname || undefined,
      doc_id: values.doc_id || undefined,
      phone: values.doc_id || undefined,
      city: values.city || undefined,
      address: values.address || undefined,
      terms: values.terms || undefined
    };
    create(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: '', open: true });
      }
    });
  };

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant='h6' className={classes.title}>
            Registrate
          </Typography>
          <TextField
            id='name'
            label='Nombres'
            className={classes.textField}
            value={values.name}
            onChange={handleChange('name')}
            margin='normal'
            required
          />
          <br />
          <TextField
            id='lname'
            label='Apellidos'
            className={classes.textField}
            value={values.lname}
            onChange={handleChange('lname')}
            margin='normal'
            required
          />
          <br />
          <TextField
            id='doc_id'
            label='Número de Cedula'
            className={classes.textField}
            value={values.doc_id}
            onChange={handleChange('doc_id')}
            margin='normal'
            required
          />
          <br />
          <TextField
            id='email'
            type='email'
            label='Email'
            className={classes.textField}
            value={values.email}
            onChange={handleChange('email')}
            margin='normal'
            required
          />
          <br />
          <TextField
            id='password'
            type='password'
            label='Password'
            className={classes.textField}
            value={values.password}
            onChange={handleChange('password')}
            margin='normal'
            required
          />
          <br />
          <TextField
            id='phone'
            label='Número de celular'
            className={classes.textField}
            value={values.phone}
            onChange={handleChange('phone')}
            margin='normal'
            required
          />
          <br />
          <TextField
            id='city'
            label='Ciudad'
            className={classes.textField}
            value={values.city}
            onChange={handleChange('city')}
            margin='normal'
            required
          />
          <br />
          <TextField
            id='address'
            label='Dirección'
            className={classes.textField}
            value={values.address}
            onChange={handleChange('address')}
            margin='normal'
            required
          />
          <br />
          <Checkbox
            id='terms'
            checked={values.terms}
            onChange={handleChangeCB('terms')}
            name="terms"
            color="primary"
          />
          <br />
          {values.error && (
            <Typography component='p' color='error'>
              <Icon color='error' className={classes.error}>
                error
              </Icon>
              {values.error}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            color='primary'
            variant='contained'
            onClick={clickSubmit}
            className={classes.submit}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
      <Dialog open={values.open} disableBackdropClick={true}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New account successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to='/signin'>
            <Button color='primary' autoFocus='autoFocus' variant='contained'>
              Sign In
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}
