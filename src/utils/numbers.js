export const genRandomNumber = () => Math.random();

export const addCommaToNumber = (number) => {
  const nf = new Intl.NumberFormat();
  return nf.format(number);
};
