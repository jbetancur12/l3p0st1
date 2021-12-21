import React, { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  TextField,
  Typography,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

import { useStyles } from '../../../utils';

function Dashboard({ data: category, ...rest }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [loading, setLoading] = React.useState(true);

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

  const handleClick = () => {
    setOpen(!open);
  };

  const loadingState = () => {
    if (loading) {
      return (
        <div className={classes.root}>
          <CircularProgress />
        </div>
      );
    }
    return (
      <div className={classes.root}>
        <Typography variant='body1' component='h2'>
          No hay Resultados 😅
        </Typography>
      </div>
    );
  };
  return (
    <Card className={classes.card}>
      <CardContent>
        <TextField
          id='name'
          label='Nombre'
          className={classes.textField}
          value={category.name}
          margin='normal'
          required
        />
        {/* {category.providers.length > 1 &&
          category.providers.map((provider) => (
            <Chip size='small' label={provider.name} />
          ))} */}
        <List
          component='nav'
          aria-labelledby='nested-list-subheader'
          className={classes.root}
        >
          <ListItem button onClick={handleClick}>
            <ListItemText primary='Medios' />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              <ListItem button className={classes.nested}>
                {/* <ListItemText primary="Starred" /> */}
                {category.providers.length > 1 &&
                  category.providers.map((provider) => (
                    <ListItemText primary={provider.name} />
                  ))}
              </ListItem>
            </List>
          </Collapse>
        </List>
        <br />
        <Button
          variant='contained'
          color='secondary'
          className={classes.button}
          onClick={rest.onClose('cancel')}
        >
          Cancelar
        </Button>
      </CardContent>
    </Card>
  );
}

export default Dashboard;
