import dayjs from 'dayjs';

export const SimpleDate = (isoDate: string | Date) => {
  return isoDate ? dayjs(isoDate).format('DD MMMM YYYY') : '';
};

export const simpleDateTime = (isoDate: string | Date) => {
  return isoDate ? dayjs(isoDate).format('DD MMMM YYYY, HH:mm') : '';
};
