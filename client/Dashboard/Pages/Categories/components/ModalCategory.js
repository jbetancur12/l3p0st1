import {
  Badge,
  Button,
  Chip,
  makeStyles,
  Modal,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import ProviderForm from './CategoryForm';

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
    marginTop: 35,
    // background: theme.palette.primary.light,
    // color: '#fff',
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

function ModalProvider(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (action) => () => {
    if (action === 'accept') {
      setOpen(false);
    }
    if (action === 'cancel') {
      console.log('object');
      setOpen(false);
    }
  };

  return (
    <>
      {/* {deviceEditor()} */}
      <Button color='primary' variant='contained' onClick={handleOpen}>
        Agregar Categoria
      </Button>
      <Modal
        // disablePortal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      // id={id}
      >
        <ProviderForm handleClose={handleClose} />
      </Modal>
    </>
  );
}

export default ModalProvider;
