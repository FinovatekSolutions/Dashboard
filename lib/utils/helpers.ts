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

export const generateUniqueFileName = (prefix: string = 'Review-'): string => {
  const timestamp: number = Date.now();
  const shortTimestamp: string = timestamp.toString().slice(-5); // Extract last 5 digits of the timestamp
  const randomSuffix: string = Math.random().toString(36).substr(2, 3); // Generates 3 random alphanumeric characters

  // Output example: Review-43601-abc
  return `${prefix}${shortTimestamp}-${randomSuffix}`;
};
