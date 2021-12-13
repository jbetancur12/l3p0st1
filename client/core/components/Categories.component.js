import React, { useState, useEffect, useContext } from 'react'
import { FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core'
import { list } from '../api-categories';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "90%",
  },
}));

export default function Products(props) {
  const classes = useStyles()
  const { values, setValues } = props.values


  const [categories, setCategories] = useState([]);


  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: { name: event.target.value, id: event.currentTarget.dataset.id } })

  };


  useEffect(async () => {
    const _categories = await list()
    setCategories(_categories)

  }, [])

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="category-label">Producto</InputLabel>
      <Select
        labelId="category-label"
        id="category"
        value={values.category.name}
        onChange={handleChange("category")}
      >

        {categories.map(category => <MenuItem key={category._id} data-id={category._id} value={category.name}>{category.name}</MenuItem>)}

      </Select>
    </FormControl>
  )
}
