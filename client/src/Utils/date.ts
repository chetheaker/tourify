import dayjs from 'dayjs';

export const formatDate = (date: string) => {
  const day = dayjs(date).date();
  const month = formatMonth(dayjs(date).month());
  return `${month} ${day}`;
};

const formatMonth = (month: number) => {
  switch (month) {
    case 0:
      return 'January';
    case 1:
      return 'February';
    case 2:
      return 'March';
    case 3:
      return 'April';
    case 4:
      return 'May';
    case 5:
      return 'June';
    case 6:
      return 'July';
    case 7:
      return 'August';
    case 8:
      return 'September';
    case 9:
      return 'October';
    case 10:
      return 'November';
    default:
      return 'December';
  }
};
