import React, { useState, useEffect } from 'react'
import { FormControl, InputLabel, makeStyles, Select } from '@material-ui/core'
import { list } from '../api-products';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "90%",
  },
}));

export default function Products() {
  const classes = useStyles()

  const [values, setValues] = useState({
    product: '',
    products: []
  });


  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };


  useEffect(async () => {
    const _products = await list()
    setValues({ ...values, products: _products })

  }, [])
  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="product-label">Producto</InputLabel>
      <Select
        labelId="product-label"
        id="product"
        value={values.product}
        onChange={handleChange("product")}
      >

        {values.products.map(product => <option key={product._id} value={product.name}>{product.name}</option>)}

      </Select>
    </FormControl>
  )
}
