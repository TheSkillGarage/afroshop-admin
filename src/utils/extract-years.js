export const extractYears = (createdAt) => {
  const createdAtDate = new Date(createdAt);
  const currentYear = new Date().getFullYear();
  const createdYear = createdAtDate.getFullYear();
  
  const yearsSinceCreation = [];

  for (let year = createdYear; year <= currentYear; year++) {
      yearsSinceCreation.push({value: year, label: year});
  }

  return yearsSinceCreation;
}

