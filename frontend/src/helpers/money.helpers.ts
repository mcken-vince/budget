export const formatMoney = (value: number) => {
  return value.toLocaleString('en-CA', {
    style: 'currency',
    currency: 'CAD',
  });
};
export const accumulate = (
  array: any[],
  getValue: string | ((item: any) => number),
  start = 0
) => {
  if (!array || array.length === 0) return start;
  if (typeof getValue === 'string') {
    return array.reduce((acc, item) => acc + (item[getValue] || 0), start);
  }
  return array.reduce((acc, item) => acc + getValue(item), start);
};
