import IllegalArgumentException from './IllegalArgumentException';

const abbreviatedMonthNames = [
  'jan',
  'feb',
  'mar',
  'apr',
  'mai',
  'jun',
  'jul',
  'aug',
  'sep',
  'okt',
  'nov',
  'des',
];

const padWithZero = number => {
  if (number < 10) {
    return `0${number}`;
  }

  return `${number}`;
};

const addTime = (dateWithoutTime, hours, minutes) => {
  return `${dateWithoutTime} ${hours}:${minutes}`;
};

const formatDefault = (fullYearNumber, monthNumber, dateInMonthNumber) => {
  const dateInMonth = padWithZero(dateInMonthNumber);
  const month = abbreviatedMonthNames[monthNumber];
  const year = `${fullYearNumber}`;

  return `${dateInMonth}. ${month} ${year}`;
};

export default function format(date, options) {
  if (!date || !(date instanceof Date)) {
    throw new IllegalArgumentException(`Parameter ${date} is not an instance of Date`);
  }

  const dateInMonthNumber = date.getDate();
  const monthNumber = date.getMonth();
  const fullYearNumber = date.getFullYear();

  if (options) {
    if (options.monthAsNumber) {
      const dateInMonth = padWithZero(dateInMonthNumber);
      const month = padWithZero(monthNumber + 1);
      const year = `${fullYearNumber}`;

      const stringWithoutTime = `${dateInMonth}.${month}.${year}`;

      if (options.showTime) {
        const hours = padWithZero(date.getHours());
        const minutes = padWithZero(date.getMinutes());

        return addTime(stringWithoutTime, hours, minutes);
      }

      return stringWithoutTime;
    }

    const defaultDateString = formatDefault(fullYearNumber, monthNumber, dateInMonthNumber);

    if (options.showTime) {
      const hours = padWithZero(date.getHours());
      const minutes = padWithZero(date.getMinutes());

      return addTime(defaultDateString, hours, minutes);
    }

    return defaultDateString;
  }

  return formatDefault(fullYearNumber, monthNumber, dateInMonthNumber);
}

