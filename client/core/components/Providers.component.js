import React, { useState, useEffect, useContext } from 'react';
import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core';
import { listProvidersByCategory } from '../api-providers';
import { listPrices } from '../api-providers';
import { arrayIncludes } from '@material-ui/pickers/_helpers/utils';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: '90%',
  },
}));

export default function Providers(props) {
  const classes = useStyles();
  const { values, setValues } = props.values;

  const [providers, setProviders] = useState([]);

  const handleChange = (name) => async (event) => {
    const _prices = await listPrices({ ...values, [name]: event.target.value });

    const days = _prices && _prices.map(price => price.days)
    const unique_days = [...new Set(days.flat())]
    setValues({ ...values, [name]: event.target.value, prices: _prices, days: unique_days });

  };

  useEffect(async () => {
    const _providers = await listProvidersByCategory(values.category.id);

    if (_providers.providers) setProviders(_providers.providers);
  }, [values]);
  return (
    <FormControl className={classes.formControl}>
      <InputLabel id='provider-label'>Medio</InputLabel>
      <Select
        labelId='provider-label'
        id='provider'
        value={values.provider}
        onChange={handleChange('provider')}
        disabled={!values.category.name}
      >
        {providers.length > 0 &&
          providers.map((provider) => (
            <MenuItem key={provider._id} value={provider.name}>
              {provider.name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}
