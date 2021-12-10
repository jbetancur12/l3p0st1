import React from 'react'
import { Card, CardContent, FormControl, InputLabel, makeStyles, Select, TextField } from '@material-ui/core'
import Products from './components/Products.component';
import Providers from './components/Providers.component';
import DateComponent from './components/Date.component';

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
}));

export default function Form() {

  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Products />
        <Providers />
        <DateComponent />
        <br />
      </CardContent>
    </Card>
  )
}
