import { expect } from 'chai';

import format from '../src/index.js';

const PROPER_DATE = new Date(1995, 11, 17, 3, 24, 33);
const ONE_DAY_IN_MILLIS = 1000 * 60 * 60 * 24;

describe('No formatting options', () => {
  it('should return DD. <abbreviated month name> YYYY', () => {
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
      expect(result).to.equal(`03. ${expectedAbbreviations[monthNumber]} 1995`);
    });
  });

  it('should return "Et øyeblikk siden" if less than 1 minute has passed', () => {
    const date = new Date();
    const result = format(date);
    expect(result).to.equal('Et øyeblikk siden');
  });

  it('should return "1 minutt siden" if 1 minute has passed', () => {
    // 117 seconds is close to 2 minutes.
    const oneMinuteAgo = new Date();
    oneMinuteAgo.setSeconds(oneMinuteAgo.getSeconds() - 117);

    const result = format(oneMinuteAgo);
    expect(result).to.equal('1 minutt siden');
  });

  it('should return "59 minutter siden" if 59 minutes have passed', () => {
    const fiftyNineMinutesAgo = new Date();
    fiftyNineMinutesAgo.setMinutes(fiftyNineMinutesAgo.getMinutes() - 59);

    const result = format(fiftyNineMinutesAgo);
    expect(result).to.equal('59 minutter siden');
  });

  it('should return "1 time siden" if 1 hour has passed', () => {
    const oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() - 1);

    const result = format(oneHourAgo);
    expect(result).to.equal('1 time siden');
  });

  it('should return "23 timer siden" if 23 hours have passed', () => {
    const twentyThreeHoursAgo = new Date();
    twentyThreeHoursAgo.setHours(twentyThreeHoursAgo.getHours() - 23);

    const result = format(twentyThreeHoursAgo);
    expect(result).to.equal('23 timer siden');
  });

  it('should return "1 dag siden" if 1 day has passed', () => {
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);

    const result = format(oneDayAgo);
    expect(result).to.equal('1 dag siden');
  });

  it('should return "2 dager siden" if 2 days have passed', () => {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const result = format(twoDaysAgo);
    expect(result).to.equal('2 dager siden');
  });
});

describe('Dates in the future', () => {
  it('should return DD. <abbreviated month name> YYYY HH:MM for all dates in the future', () => {
    const date = new Date();
    date.setSeconds(date.getSeconds() + 3);

    const result = format(date);
    expect(result).to.match(/\d{2}\. [a-z]{3} \d{4} \d{2}:\d{2}/);
  });
});

describe('Formatting with time', () => {
  it('should return DD. <abbreviated month name> YYYY HH:MM with only showTime option set', () => {
    const options = { showTime: true };
    const result = format(PROPER_DATE, options);
    expect(result).to.equal('17. des 1995 03:24');
  });

  it('should return DD.MM.YYYY HH:MM with monthAsNumber and showTime options set', () => {
    const options = {
      showTime: true,
      monthAsNumber: true,
    };

    const result = format(PROPER_DATE, options);
    expect(result).to.equal('17.12.1995 03:24');
  });
});

describe('Format month as number', () => {
  const options = {
    monthAsNumber: true,
  };

  it('should return DD.MM.YYYY', () => {
    const result = format(PROPER_DATE, options);
    expect(result).to.equal('17.12.1995');
  });

  it('should return well for dates before epoch', () => {
    const date = new Date(-ONE_DAY_IN_MILLIS);
    const result = format(date, options);
    expect(result).to.equal('31.12.1969');
  });

  it('should always return two-digit day and month', () => {
    const date = new Date('1995-03-02T03:24:00');
    const result = format(date, options);
    expect(result).to.equal('02.03.1995');
  });

  it('should work even when relative times would be default', () => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - 1);
    const result = format(date, options);
    expect(result).to.match(/\d{2}\.\d{2}\.\d{4}/);
  });
});

