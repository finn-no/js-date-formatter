import test from 'ava';
import format from '../src/index.js';

test('bad input should throw IllegalArgumentException if non-Date argument is supplied', t => {
    const badCalls = [
        () => format(),
        () => format(''),
        () => format(null),
        () => format(undefined),
    ];

    badCalls.forEach(badCall => t.throws(badCall, TypeError));
    t.notThrows(() => format(new Date()));
});

