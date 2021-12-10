import React, { useState, useEffect } from 'react'
import { FormControl, InputLabel, makeStyles, Select } from '@material-ui/core'
import { list } from '../api-providers';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "90%",
  },
}));

export default function Providers() {
  const classes = useStyles()

  const [values, setValues] = useState({
    provider: '',
    providers: []
  });


  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };


  useEffect(async () => {
    const _providers = await list()
    setValues({ ...values, providers: _providers })

  }, [])
  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="provider-label">Medio</InputLabel>
      <Select
        labelId="provider-label"
        id="provider"
        value={values.provider}
        onChange={handleChange("provider")}
      >

        {values.providers.map(provider => <option key={provider._id} value={provider.name}>{provider.name}</option>)}

      </Select>
    </FormControl>
  )
}
