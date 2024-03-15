export const formatMoney = (value: number) => {
  return value.toLocaleString('en-CA', {
    style: 'currency',
    currency: 'CAD',
  });
};
