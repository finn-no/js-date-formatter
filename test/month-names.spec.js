import { expect } from 'chai';

import format from '../src/index.js';

const PROPER_DATE = new Date('1995-12-17T03:24:00');
const ONE_DAY_IN_MILLIS = 1000 * 60 * 60 * 24;

describe('No special formatting', () => {
  it('should return DD.MM.YYYY', () => {
    const result = format(PROPER_DATE);
    expect(result).to.equal('17.12.1995');
  });

  it('should return well for dates before epoch', () => {
    const result = format(new Date(-ONE_DAY_IN_MILLIS));
    expect(result).to.equal('31.12.1969');
  });
});

