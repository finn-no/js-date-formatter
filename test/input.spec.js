import { expect } from 'chai';

import format from '../src/index.js';
import IllegalArgumentException from '../src/IllegalArgumentException.js';

describe('bad input', () => {
    it('should throw IllegalArgumentException if non-Date argument is supplied', () => {
        const badCalls = [
            () => format(),
            () => format(null),
            () => format(undefined),
            () => format(''),
            () => format(null),
            () => format(undefined),
        ];

        badCalls.forEach(badCall => expect(badCall).to.throw(IllegalArgumentException));
        expect(() => format(new Date())).to.not.throw(IllegalArgumentException);
    });
});

