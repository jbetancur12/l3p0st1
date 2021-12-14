import React, { useEffect, useContext } from 'react';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import esLocale from 'date-fns/locale/es';
import { getDay } from 'date-fns';
import { Badge, makeStyles } from '@material-ui/core';
import format from 'date-fns/format';

const localeMap = {
  es: esLocale,
};
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: '90%',
  },
}));

const dayOfWeek = {
  0: 'domingo',
  1: 'lunes',
  2: 'martes',
  3: 'miercoles',
  4: 'jueves',
  5: 'viernes',
  6: 'sabado',
};

export default function DateComponent(props) {
  const classes = useStyles();
  const { values, setValues } = props.values;

  const handleDateChange = (name) => (event) => {
    const dayWeek = dayOfWeek[getDay(event)];
    setValues({ ...values, [name]: event, disableDate: true });
  };

  useEffect(() => {
    const days = values.days;
    console.log(days);
  }, [values]);

  const renderWrappedWeekDay = (
    date,
    selectedDate,
    dayInCurrentMonth,
    dayComponent,
  ) => {
    const ss = dayInCurrentMonth && [0, 1, 2].includes(date.getDay());
    return <div>{ss ? dayComponent : undefined}</div>;
  };

  function disableWeekends(date) {
    const ff = [];
    Object.keys(dayOfWeek).forEach(function (key, index) {
      if (values.days.includes(dayOfWeek[key])) {
        ff.push(index);
      }
    });

    return !ff.includes(date.getDay());
    // date.getDay() === 0 || date.getDay() === 6;
  }

  console.log(values);
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap.es}>
      <DatePicker
        placeholder='MM/dd/yyyy'
        format={'MM/dd/yyyy'}
        value={values.date}
        onChange={handleDateChange('date')}
        className={classes.formControl}
        disablePast
        autoOk={true}
        shouldDisableDate={disableWeekends}
        disabled={!values.provider}
      />
    </MuiPickersUtilsProvider>
  );
}
