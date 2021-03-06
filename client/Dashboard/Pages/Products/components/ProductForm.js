import {
  Button,
  Card,
  CardContent,
  InputAdornment,
  TextField,
} from '@material-ui/core';
import React, { useState, useEffect, useContext } from 'react';
import { useStyles } from '../../../utils';
import { list } from '../../../../core/api-categories';
import { listProvidersByCategory } from '../../../../core/api-providers';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import NumberFormat from 'react-number-format';
import { dayOfWeek } from '../../../../helpers/dates';
import { GlobalContext } from '../../../../context/ProductContext';
import { set } from 'lodash';

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

const defaultDays = [
  { value: 'lunes', label: 'Lunes' },
  { value: 'martes', label: 'Martes' },
  { value: 'miercoles', label: 'Miercoles' },
  { value: 'jueves', label: 'Jueves' },
  { value: 'viernes', label: 'Viernes' },
  { value: 'sabado', label: 'Sabado' },
  { value: 'domingo', label: 'Domingo' },
];

const ff = (arr) => {
  return arr.map((a) => a.value);
};

function Products(props) {
  const classes = useStyles();
  const [values, setValues] = useState({});
  const [disable, setDisable] = useState(true);
  const [providerOptions, setProvidersOptions] = useState([]);
  const [catProv, setCatProv] = useState({});
  const { addProduct, updateProduct } = useContext(GlobalContext);
  const [daysSelected, setDaysSelected] = useState([]);

  const categoriesOptions = async () => {
    return await list();
  };

  const handleChange = (name) => (event) => {
    switch (name) {
      case 'category':
      case 'provider':
        setValues({ ...values, [name]: { _id: event._id, name: event.name } });
        setCatProv({ ...catProv, [name]: event.name });
        break;
      case 'days':
        setDaysSelected(event);
        setValues({ ...values, [name]: ff(event) });
        break;
      case 'length':
      case 'price':
        setValues({ ...values, [name]: parseFloat(event.target.value) });
        break;
      default:
        setValues({ ...values, [name]: event.target.value });
        break;
    }
  };

  function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }

  const setName = (values, catProv) => {
    const order = values.days
      .map((day) => getKeyByValue(dayOfWeek, day))
      .sort();
    if (order[0] === '0') {
      order.shift();
      order.push('0');
    }
    const daysOrdered = order.map((id) => dayOfWeek[id]);
    const daysSufix = daysOrdered.map((day) => {
      if (day === 'miercoles') {
        return 'Mi';
      }
      return day.charAt(0).toUpperCase();
    });
    return `${catProv.category} ${catProv.provider} ${
      values.length
    } caracteres ${daysSufix.join('-')}`;
  };

  const color = {
    control: (styles) => ({
      ...styles,
      fontFamily: 'Roboto',
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

  useEffect(async () => {
    if (props.data) {
      setValues(props.data);
    }
    if (values.category) {
      const id = values.category._id ? values.category._id : values.category;
      const providers = await listProvidersByCategory(id);
      setDisable(false);
      setProvidersOptions(providers);
    }
  }, [values.category]);

  const handleSubmit = async () => {
    const newValues = { ...values, name: setName(values, catProv) };

    try {
      let response;
      if (!props.data) {
        response = await fetch('/api/products/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newValues),
        });

        const product = await response.json();
        addProduct(product.payload);
      } else {
        response = await fetch('/api/product/' + props.data._id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...values,
            categories: values.categories.map((category) => category._id),
          }),
        });

        const provider = await response.json();
        updateProduct(provider.payload);
      }
      if (response.ok) {
        props.handleClose('cancel')();
      }
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(event);

  return (
    <Card className={classes.card}>
      <CardContent>
        <AsyncSelect
          cacheOptions
          defaultOptions
          loadOptions={categoriesOptions}
          getOptionValue={(option) => option._id}
          getOptionLabel={(option) => option.name}
          onChange={handleChange('category')}
          className={classes.selector}
          menuColor='red'
          styles={color}
          isSearchable
          menuPosition={'fixed'}
          placeholder='Categoria'
          value={[values.category]}
        />
        <Select
          options={providerOptions.providers}
          getOptionValue={(option) => option._id}
          getOptionLabel={(option) => option.name}
          onChange={handleChange('provider')}
          className={classes.selector}
          menuColor='red'
          styles={color}
          isSearchable
          menuPosition={'fixed'}
          placeholder='Medio'
          isDisabled={disable}
          value={[values.provider]}
        />
        <Select
          isMulti
          isClearable
          isSearchable
          options={defaultDays}
          className={classes.selector}
          onChange={handleChange('days')}
          styles={color}
          menuPosition={'fixed'}
          placeholder='Dias'
          // value={values.days}
          // getOptionValue={(option) => {
          //   if (props.data) {
          //     return option
          //   } return option.value
          // }}
          // getOptionLabel={(option) => {
          //   if (props.data) {
          //     return option.charAt(0).toUpperCase() + option.slice(1)
          //   } return option.label
          // }}
        />

        <TextField
          label='Rango'
          value={values.length}
          className={classes.textField}
          onChange={handleChange('length')}
          name='length'
          InputProps={{
            inputComponent: NumberFormatCustom,
            endAdornment: (
              <InputAdornment position='end'>Caracteres</InputAdornment>
            ),
            style: { textAlign: 'center' },
          }}
          required
        />
        <br />
        <br />
        <TextField
          label='Precio'
          value={values.price}
          className={classes.textField}
          onChange={handleChange('price')}
          name='price'
          InputProps={{
            inputComponent: NumberFormatCustom,
            startAdornment: <InputAdornment position='start'>$</InputAdornment>,
            style: { textAlign: 'center' },
          }}
          required
        />

        <br />
        <br />
        <Button
          variant='contained'
          color='primary'
          className={classes.button}
          onClick={handleSubmit}
        >
          {props.data ? 'Editar' : 'Crear'}
        </Button>
        <br />
        <br />
        <Button
          variant='contained'
          color='secondary'
          className={classes.button}
          onClick={props.handleClose('cancel')}
        >
          Cancelar
        </Button>
      </CardContent>
    </Card>
  );
}

export default Products;
