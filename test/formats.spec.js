import test from 'ava';
import format from '../src/index.js';

const PROPER_DATE = new Date(1995, 11, 17, 3, 24, 33);
const ONE_DAY_IN_MILLIS = 1000 * 60 * 60 * 24;
const dateFormatOptions = {
    monthAsNumber: true,
};

test('No formatting options should return DD. <abbreviated month name> YYYY', t => {
    const expectedAbbreviations = [
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

    expectedAbbreviations.forEach((abbreviation, monthNumber) => {
        const date = new Date(1995, monthNumber, 3);
        const result = format(date);
        t.true(result === `03. ${expectedAbbreviations[monthNumber]} 1995`);
    });
});

test('No formatting options should return "Et øyeblikk siden" if less than 1 minute has passed', t => {
    const date = new Date();
    const result = format(date);
    t.true(result === 'Et øyeblikk siden');
});

test('No formatting options should return "1 minutt siden" if 1 minute has passed', t => {
    // 117 seconds is close to 2 minutes.
    const oneMinuteAgo = new Date();
    oneMinuteAgo.setSeconds(oneMinuteAgo.getSeconds() - 117);

    const result = format(oneMinuteAgo);
    t.true(result === '1 minutt siden');
});

test('No formatting options should return "59 minutter siden" if 59 minutes have passed', t => {
    const fiftyNineMinutesAgo = new Date();
    fiftyNineMinutesAgo.setMinutes(fiftyNineMinutesAgo.getMinutes() - 59);

    const result = format(fiftyNineMinutesAgo);
    t.true(result === '59 minutter siden');
});

test('No formatting options should return "1 time siden" if 1 hour has passed', t => {
    const oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() - 1);

    const result = format(oneHourAgo);
    t.true(result === '1 time siden');
});

test('No formatting options should return "23 timer siden" if 23 hours have passed', t => {
    const twentyThreeHoursAgo = new Date();
    twentyThreeHoursAgo.setHours(twentyThreeHoursAgo.getHours() - 23);

    const result = format(twentyThreeHoursAgo);
    t.true(result === '23 timer siden');
});

test('No formatting options should return "1 dag siden" if 1 day has passed', t => {
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);

    const result = format(oneDayAgo);
    t.true(result === '1 dag siden');
});

test('No formatting options should return "2 dager siden" if 2 days have passed', t => {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const result = format(twoDaysAgo);
    t.true(result === '2 dager siden');
});

test('Dates in the future should return DD. <abbreviated month name> YYYY HH:MM for all dates in the future', t => {
    const date = new Date();
    date.setSeconds(date.getSeconds() + 3);

    const result = format(date);
    t.regex(result, /\d{2}\. [a-z]{3} \d{4} \d{2}:\d{2}/);
});

test('Formatting with time should return DD. <abbreviated month name> YYYY HH:MM with only showTime option set', t => {
    const options = { showTime: true };
    const result = format(PROPER_DATE, options);
    t.true(result === '17. des 1995 03:24');
});

test('Formatting with time should return DD.MM.YYYY HH:MM with monthAsNumber and showTime options set', t => {
    const options = {
        showTime: true,
        monthAsNumber: true,
    };

    const result = format(PROPER_DATE, options);
    t.true(result === '17.12.1995 03:24');
});

test('Format month as number should return DD.MM.YYYY', t => {
    const result = format(PROPER_DATE, dateFormatOptions);
    t.true(result === '17.12.1995');
});

test('Format month as number should return well for dates before epoch', t => {
    const date = new Date(-ONE_DAY_IN_MILLIS);
    const result = format(date, dateFormatOptions);
    t.true(result === '31.12.1969');
});

test('Format month as number should always return two-digit day and month', t => {
    const date = new Date('1995-03-02T03:24:00');
    const result = format(date, dateFormatOptions);
    t.true(result === '02.03.1995');
});

test('Format month as number should work even when relative times would be default', t => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - 1);
    const result = format(date, dateFormatOptions);
    t.regex(result, /\d{2}\.\d{2}\.\d{4}/);
});
