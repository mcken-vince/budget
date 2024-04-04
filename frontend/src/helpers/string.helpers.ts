export const capitalize = (string?: string): string => {
  if (!string) return '';
  const words = string.split(' ');
  console.log(words);
  if (words.length > 1) {
    return words.map((word) => capitalize(word)).join(' ');
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
};
