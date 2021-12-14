import format from 'date-fns/format';
import colombianHolidays from 'colombian-holidays';
import {
  addDays,
  isFriday,
  parseISO,
  isWeekend,
  nextTuesday,
  nextWednesday,
} from 'date-fns';

export function minDate() {
  const current_date = new Date();
  const current_hour = current_date.getHours();
  const current_minutes = current_date.getMinutes();
  const forma = (date) => format(date, 'P');
  const getColombianHolidays = colombianHolidays().map((colombianHoliday) =>
    forma(parseISO(colombianHoliday.celebrationDate)),
  );

  const before_noon = current_minutes <= 59 && current_hour < 12;

  const conditional_1 =
    isWeekend(current_date) ||
    (current_hour >= 12 && isFriday(current_date)) ||
    (isFriday(current_date) &&
      getColombianHolidays.includes(forma(current_date)));
  const conditional_2 =
    !isWeekend(current_date) &&
    getColombianHolidays.includes(forma(current_date));
  const conditional_3 = !isWeekend(current_date) && before_noon;

  if (conditional_1) {
    if (getColombianHolidays.includes(forma(nextTuesday(current_date)))) {
      return nextWednesday(current_date);
    }
    return nextTuesday(current_date);
  } else if (conditional_2) {
    return addDays(current_date, 2);
  } else if (conditional_3) {
    return addDays(current_date, 1);
  } else {
    return addDays(current_date, 2);
  }
}

export const dayOfWeek = {
  0: 'domingo',
  1: 'lunes',
  2: 'martes',
  3: 'miercoles',
  4: 'jueves',
  5: 'viernes',
  6: 'sabado',
};
