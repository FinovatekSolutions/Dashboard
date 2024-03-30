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
