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
});

