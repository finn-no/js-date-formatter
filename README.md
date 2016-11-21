# FINN date formatter

[![Build Status](https://travis-ci.org/finn-no/js-code-style.svg?branch=master)](https://travis-ci.org/finn-no/js-code-style)


__THIS PROJECT IS AN ONGOING EXPERIMENT.__ No support can be expected.

npm package for formatting Dates, FINN style. From the [styleguide](https://styleguide.finn.no/) (November 6, 2015):

> ### Dates and time
>
> #### Specified time
>
> In Finn we display time and dates the following way:
>
> - 11\. okt 2015 (without time)
> - 11\. okt 2015 23:59 (with time)
>
> #### Relative time
>
> If it's less than 3 days you can show relative time like this:
>
> - Et øyeblikk siden
> - 1 minutt siden
> - 59 minutter siden
> - 1 time siden
> - 23 timer siden
> - 1 dag siden
> - 2 dager siden

### Installation

Use the `npm.finntech.no` registry by adding the following to your `.npmrc` file:

```
# download all packages from the FINN npm registry
registry=http://npm.finntech.no/
```

Then install via npm:

`npm install --save finn-date-formatter`

### Usage

The module exports a default function `format(date: Date[, options: Object])`.

#### Example

```js
import formatDate from 'finn-date-formatter';

const date = new Date('October 11, 2015 03:23:00');

// 11. okt 2015
format(date);

// 11. okt 2015 03:23
format(date, {
  showTime: true
});

// 11.10.2015 03:23
format(date, {
  monthAsNumber: true,
  showTime: true,
});

// Et øyeblikk siden
const now = new Date();
format(date);
```

See the unit tests in `test/` for further usage.

#### Available options

- `boolean showTime`: Appends time on the format `HH:MM`
- `boolean monthAsNumber`: Displays `11.10.2015` instead of `11. okt 2015`

### Development

- [Mocha](https://mochajs.org/) unit tests: `npm run test`
- [ESLint](http://eslint.org/) linting extending the [Airbnb JS style guide](https://github.com/airbnb/javascript): `npm run lint`
- Build with [Babel](http://babeljs.io/): `npm run build`

#### Releasing a new version

See the [guide to publishing to FINN's local npm registry](https://confluence.finn.no/display/TEKK/How+to+publish+to+our+local+NPM+registry).

