import { Button, makeStyles, Modal } from '@material-ui/core';
import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import WYSIWYG from './WYSIWYG.component';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    //border: '2px solid #000',
    borderRadius: 5,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
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

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

function Editor(props) {
  const classes = useStyles();
  const { values, setValues } = props.values;
  const [modalStyle] = useState(getModalStyle);
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
