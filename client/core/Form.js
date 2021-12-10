import React, { useState, useEffect } from 'react'
import { Card, CardContent, FormControl, InputLabel, makeStyles, Select, TextField } from '@material-ui/core'
import { list } from './api-products';
import { list as listProviders } from './api-providers';

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
  formControl: {
    margin: theme.spacing(1),
    width: "90%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Form() {

  const classes = useStyles();
  const [values, setValues] = useState({
    product: '',
    provider: ''
  });

  const [api, setApi] = useState({
    products: [],
    providers: []
  })

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  useEffect(async () => {
    const _products = await list()
    const _providers = await listProviders()

    setApi({ ...api, providers: _providers, products: _products })

  }, [])


  return (
    <Card className={classes.card}>
      <CardContent>
        <FormControl className={classes.formControl}>
          <InputLabel id="product-label">Producto</InputLabel>
          <Select
            labelId="product-label"
            id="product"
            value={values.product}
            onChange={handleChange("product")}
          >

            {api.products.map(product => <option key={product._id} value={product.name}>{product.name}</option>)}

          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="provider-label">Medio</InputLabel>
          <Select
            labelId="provider-label"
            id="provider"
            value={values.provider}
            onChange={handleChange("provider")}
            disabled={!values.product.length > 0}
          >

            {api.providers.map(provider => <option key={provider._id} value={provider.name}>{provider.name}</option>)}

          </Select>
        </FormControl>
        <br />
      </CardContent>
    </Card>
  )
}
