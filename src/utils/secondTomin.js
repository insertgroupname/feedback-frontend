import moment from 'moment';

export const secondToFormat = (secs, format) => {
  let secondToFormat = moment.utc(secs * 1000).format(format);
  return secondToFormat;
};
