import React, { useState, useContext } from 'react'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'
import esLocale from "date-fns/locale/es";
import { makeStyles } from '@material-ui/core';


const localeMap = {
  es: esLocale,
};
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "90%",
  },
}));

export default function DateComponent(props) {
  const classes = useStyles()
  const { values, setValues } = props.values

  const handleDateChange = (name) => (event) => {
    setValues({ ...values, [name]: event });

  }
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap.es}>
      <DatePicker placeholder="MM/dd/yyyy"
        format={"MM/dd/yyyy"} value={values.date} onChange={handleDateChange("date")} className={classes.formControl} disablePast autoOk={true} />
    </MuiPickersUtilsProvider>
  )
}
