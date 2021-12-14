import {
  Badge,
  Button,
  Chip,
  makeStyles,
  Modal,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import WYSIWYG from './WYSIWYG.component';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 700,
    backgroundColor: theme.palette.primary.dark,
    //border: '2px solid #000',
    borderRadius: 5,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    left: '0',
    right: '0',
    marginLeft: 'auto',
    marginRight: 'auto',
    top: '15%',
  },
  buttonEditor: {
    width: '90%',
    background: theme.palette.primary.light,
    color: '#fff',
  },
  chipContainer: {
    display: 'flex',
    justifyContent: 'end',
  },
  chip: {
    width: 65,
  },
  button: {
    margin: theme.spacing(1),
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function Editor(props) {
  const classes = useStyles();
  const { values, setValues } = props.values;
  const [open, setOpen] = useState(false);

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
    <div className={classes.paper}>
      {/* <Typography component="subtitle1">Contenido</Typography> */}
      <div className={classes.chipContainer}>
        <Chip className={classes.chip} label={values.content.length} />
      </div>
      <WYSIWYG values={{ values, setValues }} />
      <div className={classes.buttonContainer}>
        <Button
          className={classes.button}
          variant='contained'
          onClick={handleClose('accept')}
        >
          Aceptar
        </Button>
        <Button
          variant='contained'
          color='secondary'
          onClick={handleClose('cancel')}
          startIcon={<ClearIcon />}
          className={classes.button}
        >
          Limpiar
        </Button>
      </div>
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

  return (
    <div>
      {deviceEditor()}
      <Modal
        // disablePortal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {body}
      </Modal>
    </div>
  );
}

export default Editor;
