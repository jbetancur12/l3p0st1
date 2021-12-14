import React, { useContext } from 'react';
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  makeStyles,
  Modal,
  Select,
  TextField,
} from '@material-ui/core';
import Categories from './components/Categories.component';
import Providers from './components/Providers.component';
import DateComponent from './components/Date.component';
import WYSIWYG from './components/WYSIWYG.component';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from 'react-device-detect';
import { getDay } from 'date-fns';

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
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    //border: '2px solid #000',
    borderRadius: 5,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  button: {
    width: '90%',
  },
  buttonEditor: {
    width: '90%',
    background: theme.palette.primary.light,
    color: '#fff',
  },
}));

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

const dayOfWeek = {
  0: 'domingo',
  1: 'lunes',
  2: 'martes',
  3: 'miercoles',
  4: 'jueves',
  5: 'viernes',
  6: 'sabado',
};

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export default function Form() {
  const classes = useStyles();

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    email: '',
    terms: false,
    category: '',
    date: Date.now(),
    content: '',
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (action) => () => {
    if (action === 'accept') {
      setOpen(false);
    }
    if (action === 'cancel') {
      setOpen(false);
      setValues({ ...values, content: '' });
    }
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id='simple-modal-title'>Contenido</h2>
      <WYSIWYG values={{ values, setValues }} />
      <Button variant='contained' onClick={handleClose('accept')}>
        Aceptar
      </Button>
      <Button
        variant='contained'
        color='secondary'
        onClick={handleClose('cancel')}
      >
        Limpiar
      </Button>
    </div>
  );

  const deviceEditor = () => {
    if (isMobile) {
      return <WYSIWYG values={{ values, setValues }} />;
    }
    return (
      <Button
        variant='contained'
        className={classes.buttonEditor}
        onClick={handleOpen}
        disabled={!values.disableDate}
      >
        Agregar Contenido
      </Button>
    );
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleChangeCB = (name) => (event) => {
    console.log(name);
    setValues({ ...values, [event.target.name]: event.target.checked });
  };

  const handleQuotation = async () => {
    const textLength = values.content.length;
    const dayToPublish = dayOfWeek[getDay(values.date)];
    const _quote = values.prices.find(
      (price) => price.length > textLength && price.days.includes(dayToPublish),
    );
    console.log(_quote);
    return _quote;
  };

  console.log(values);
  return (
    <Card className={classes.card}>
      <CardContent>
        <Categories values={{ values, setValues }} />
        <Providers values={{ values, setValues }} />
        <DateComponent values={{ values, setValues }} />
        {deviceEditor()}
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
              onChange={handleChangeCB('name')}
              id='terms'
              name='terms'
            />
          }
          label='Acepto terminos y condiciones'
        />
        <Button
          variant='contained'
          color='primary'
          className={classes.button}
          onClick={handleQuotation}
        >
          Cotizar
        </Button>
        <Modal
          // disablePortal
          open={open}
          onClose={handleClose}
          aria-labelledby='simple-modal-title'
          aria-describedby='simple-modal-description'
        >
          {body}
        </Modal>
        <br />
      </CardContent>
    </Card>
  );
}
