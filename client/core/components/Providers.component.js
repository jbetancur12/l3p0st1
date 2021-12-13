import React, { useState, useEffect, useContext } from 'react'
import { FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core'
import { listProvidersByCategory } from '../api-providers';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "90%",
  },
}));

export default function Providers(props) {
  const classes = useStyles()
  const { values, setValues } = props.values


  const [providers, setProviders] = useState([]);


  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });

  };


  useEffect(async () => {
    const _providers = await listProvidersByCategory(values.category.id)
    console.log(_providers.providers.length);
    if (_providers.providers) setProviders(_providers.providers)

  }, [values])
  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="provider-label">Medio</InputLabel>
      <Select
        labelId="provider-label"
        id="provider"
        value={values.provider}
        onChange={handleChange("provider")}
      >

        {providers.length > 0 && providers.map(provider => <MenuItem key={provider._id} value={provider.name}>{provider.name}</MenuItem>)}

      </Select>
    </FormControl>
  )
}
