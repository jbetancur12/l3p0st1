import React, { useState } from 'react'
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

export default function DateComponent() {
  const classes = useStyles()
  const [selectedDate, handleDateChange] = useState(Date.now());
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap.es}>
      <DatePicker placeholder="MM/dd/yyyy"
        format={"MM/dd/yyyy"} value={selectedDate} onChange={handleDateChange} className={classes.formControl} disablePast />
    </MuiPickersUtilsProvider>
  )
}
