const formatAmount = (amount) => {
  if (amount > 1000000) {
    return `${Math.round(amount / 10000) / 100} M`;
  }
  if (amount > 1000) {
    return `${Math.round(amount / 10) / 100} K`;
  }
  return `${amount}`;
};

// eslint-disable-next-line import/prefer-default-export
export { formatAmount };
