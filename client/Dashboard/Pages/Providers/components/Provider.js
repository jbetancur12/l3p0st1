import React, { useEffect } from 'react';
import { read } from '../../../../core/api-providers';
import {
  Card,
  CardContent,
  CircularProgress,
  Collapse,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  TextField,
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { useStyles } from '../../../utils';
import NumberFormat from 'react-number-format';

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      allowNegative='false'
    />
  );
}

function Provider(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [openP, setOpenP] = React.useState(false);
  const [provider, setProvider] = React.useState([]);
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

  const handleClickP = () => {
    setOpenP(!openP);
  };

  React.useEffect(async () => {
    const _provider = await read(props.match.params.id);
    setProvider(_provider);
    console.log(_provider);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div
        style={{
          justifyContent: 'center',
          display: 'flex',
          padding: '100px',
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <TextField
          id='name'
          label='Nombre'
          className={classes.textField}
          value={provider.name}
          margin='normal'
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id='email'
          label='Email'
          className={classes.textField}
          value={provider.email}
          margin='normal'
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id='phone'
          label='Telefono'
          className={classes.textField}
          value={provider.phone}
          margin='normal'
          InputProps={{
            readOnly: true,
          }}
        />
        <List
          component='nav'
          aria-labelledby='nested-list-subheader'
          className={classes.root}
        >
          <ListItem button onClick={handleClick}>
            <ListItemText primary='Categorias' />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              <ListItem button className={classes.nested}>
                {/* <ListItemText primary="Starred" /> */}
                {provider.categories.length >= 1 &&
                  provider.categories.map((category) => (
                    <ListItemText primary={category.name} />
                  ))}
              </ListItem>
            </List>
          </Collapse>
        </List>
        <List
          component='nav'
          aria-labelledby='nested-list-subheader'
          className={classes.root}
        >
          <ListItem button onClick={handleClickP}>
            <ListItemText primary='Productos' />
            {openP ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openP} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              <ListItem button className={classes.nested}>
                {/* <ListItemText primary="Starred" /> */}
                {provider.products.length >= 1 &&
                  provider.products.map((product) => (
                    <ListItemText primary={product.name} />
                  ))}
              </ListItem>
            </List>
          </Collapse>
        </List>

        {/* {provider.providers.length > 1 &&
          provider.providers.map((provider) => (
            <Chip size='small' label={provider.name} />
          ))} */}
        <br />
      </CardContent>
    </Card>
  );
}

export default Provider;
