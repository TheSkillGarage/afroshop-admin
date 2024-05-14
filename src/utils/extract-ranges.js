export const extractYears = (createdAt) => {
  const createdAtDate = new Date(createdAt);
  const currentYear = new Date().getFullYear();
  const createdYear = createdAtDate.getFullYear();

  const yearsSinceCreation = [];

  for (let year = createdYear; year <= currentYear; year++) {
    yearsSinceCreation.push({ value: year, label: year });
  }

  return yearsSinceCreation;
}

export function extractMonths(year) {
  // Create an array to store the months
  const monthsOfYear = [];

  // Loop through all months and add them to the array
  for (let i = 0; i < 12; i++) {
    const monthDate = new Date(year, i, 1);
    const monthFormatted = monthDate.toLocaleString('default', { month: 'short' });
    monthsOfYear.push(monthFormatted);
  };

  return monthsOfYear;
}
