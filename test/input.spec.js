import test from 'ava';
import format from '../src/index.js';
import IllegalArgumentException from '../src/IllegalArgumentException.js';

test('bad input should throw IllegalArgumentException if non-Date argument is supplied', t => {
    const badCalls = [
        () => format(),
        () => format(null),
        () => format(undefined),
        () => format(''),
        () => format(null),
        () => format(undefined),
    ];

    badCalls.forEach(badCall => t.throws(badCall, IllegalArgumentException));
    t.notThrows(() => format(new Date()));
});

