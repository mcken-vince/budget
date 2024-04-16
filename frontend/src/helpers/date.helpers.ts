export const formatDate = (date?: Date): string => {
  if (!date) return '';
  return new Date(date).toDateString();
};

export const addxMonths = (x: number, date?: Date) => {
  const d = date ? new Date(date) : new Date();
  d.setMonth(d.getMonth() + x);
  return d;
};
export const getMonthYearObject = (date: Date) => {
  return {
    month: date.toLocaleString('default', { month: 'long' }),
    monthNumber: date.getMonth() + 1,
    year: date.getFullYear(),
  };
};
