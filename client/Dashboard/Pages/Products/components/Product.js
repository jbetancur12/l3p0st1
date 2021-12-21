import React, { useEffect } from 'react';
import { read } from '../../../../core/api-products';
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

function Product(props) {
  const classes = useStyles();
  const card = { ...classes.card, maxWidth: 600 };
  const [open, setOpen] = React.useState(true);
  const [product, setProduct] = React.useState([]);
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

  React.useEffect(async () => {
    const _product = await read(props.match.params.id);
    setProduct(_product);
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
          value={product.name}
          margin='normal'
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id='name'
          label='Medio'
          className={classes.textField}
          value={product.provider.name}
          margin='normal'
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id='name'
          label='Categoria'
          className={classes.textField}
          value={product.category.name}
          margin='normal'
          InputProps={{
            readOnly: true,
          }}
        />

        <TextField
          id='name'
          label='Precio'
          className={classes.textField}
          value={product.price}
          margin='normal'
          InputProps={{
            readOnly: true,
            inputComponent: NumberFormatCustom,
            startAdornment: <InputAdornment position='start'>$</InputAdornment>,
            style: { textAlign: 'center' },
          }}
        />
        <TextField
          id='name'
          label='Tamaño'
          className={classes.textField}
          value={product.length}
          margin='normal'
          InputProps={{
            readOnly: true,
            inputComponent: NumberFormatCustom,
            endAdornment: (
              <InputAdornment position='end'>Caracteres</InputAdornment>
            ),
          }}
        />
        {/* {category.providers.length > 1 &&
          category.providers.map((provider) => (
            <Chip size='small' label={provider.name} />
          ))} */}
        <br />
      </CardContent>
    </Card>
  );
}

export default Product;
