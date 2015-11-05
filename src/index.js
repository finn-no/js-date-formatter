import IllegalArgumentException from './IllegalArgumentException';

export default function format(date) {
  if (!date || !(date instanceof Date)) {
    throw new IllegalArgumentException(`Parameter ${date} is not an instance of Date`);
  }

  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}

