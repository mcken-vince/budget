export const formatDate = (date?: Date): string => {
  if (!date) return '';
  return new Date(date).toDateString();
};

export const addxMonths = (x: number) => {
  const d = new Date();
  d.setMonth(d.getMonth() + x);
  return d;
};
export const getMonthYearObject = (date: Date) => {
  return {
    month: date.toLocaleString('default', { month: 'long' }),
    year: date.getFullYear(),
  };
};
