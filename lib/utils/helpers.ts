export const calculatePeriod = (startDate: Date | null, endDate: Date | null): string => {
  if (!startDate || !endDate) {
    return '';
  }

  const startDateFormatted = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
  }).format(startDate);
  const endDateFormatted = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
  }).format(endDate);

  return `${startDateFormatted} - ${endDateFormatted}`;
};
export const formatDate = (date: Date | null): string => {
  if (!date) {
    return '';
  }

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  }).format(date);
};

export const formatMoney = (amount: number): string => {
  // Round the amount to two decimal places
  const roundedAmount: number = Math.round(amount * 100) / 100;
  // Check if the rounded amount is negative
  const isNegative: boolean = roundedAmount < 0;
  // Convert the absolute value of the rounded amount to a string with two decimal places
  const formattedAmount: string = `$${Math.abs(roundedAmount).toFixed(2)}`;
  // Add commas to the formatted amount
  const amountWithCommas: string = formattedAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  // Return the formatted amount with the negative sign if necessary
  return isNegative ? `-${amountWithCommas}` : amountWithCommas;
};
