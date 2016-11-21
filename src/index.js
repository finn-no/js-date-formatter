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

const addTime = (dateWithoutTime, hours, minutes) => `${dateWithoutTime} ${hours}:${minutes}`;

const formatAbsoluteDate = date => {
    const year = `${date.getFullYear()}`;
    const month = abbreviatedMonthNames[date.getMonth()];
    const dateInMonth = padWithZero(date.getDate());

    return `${dateInMonth}. ${month} ${year}`;
};

const formatDefault = date => {
    const differenceSeconds = Math.floor((Date.now() - date.getTime()) / 1000);

    if (differenceSeconds < 0) {
    // Date is in the future, so return absolute date with time.
        return addTime(
      formatAbsoluteDate(date),
      padWithZero(date.getHours()),
      padWithZero(date.getMinutes())
    );
    }

    const hoursInDay = 24;
    const minutesInHour = 60;
    const secondsInMinute = 60;
    const secondsInHour = secondsInMinute * minutesInHour;
    const secondsInDay = secondsInHour * hoursInDay;

    if (differenceSeconds < secondsInMinute) {
        return 'Et øyeblikk siden';
    }

    if (differenceSeconds < secondsInHour) {
        const differenceMinutes = Math.floor(differenceSeconds / secondsInMinute);

        if (differenceMinutes === 1) {
            return '1 minutt siden';
        }

        return `${differenceMinutes} minutter siden`;
    }

    if (differenceSeconds < secondsInDay) {
        const differenceHours = Math.floor(differenceSeconds / secondsInHour);

        if (differenceHours === 1) {
            return '1 time siden';
        }

        return `${differenceHours} timer siden`;
    }

    if (differenceSeconds < 3 * secondsInDay) {
        const differenceDays = Math.floor(differenceSeconds / secondsInDay);

        if (differenceDays === 1) {
            return '1 dag siden';
        }

        return '2 dager siden';
    }

    return formatAbsoluteDate(date);
};

export default function format (date, options) {
    if (!date || !(date instanceof Date)) {
        throw new IllegalArgumentException(`Parameter ${date} is not an instance of Date`);
    }

    const dateInMonthNumber = date.getDate();
    const monthNumber = date.getMonth();
    const fullYearNumber = date.getFullYear();
    const hoursNumber = date.getHours();
    const minutesNumber = date.getMinutes();

    if (options) {
        if (options.monthAsNumber) {
            const dateInMonth = padWithZero(dateInMonthNumber);
            const month = padWithZero(monthNumber + 1);
            const year = `${fullYearNumber}`;

            const stringWithoutTime = `${dateInMonth}.${month}.${year}`;

            if (options.showTime) {
                const hours = padWithZero(hoursNumber);
                const minutes = padWithZero(minutesNumber);

                return addTime(stringWithoutTime, hours, minutes);
            }

            return stringWithoutTime;
        }

        const defaultDateString = formatDefault(date);

        if (options.showTime) {
            const hours = padWithZero(date.getHours());
            const minutes = padWithZero(date.getMinutes());

            return addTime(defaultDateString, hours, minutes);
        }

        return defaultDateString;
    }

    return formatDefault(date);
}
