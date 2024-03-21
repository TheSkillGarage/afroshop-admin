export const extractYears = data => {
    const years = data?.map(order => new Date(order.createdAt).getFullYear());
    const uniqueYears = [...new Set(years)].sort((a, b) => b - a);
    const result = uniqueYears?.map(year => ({ value: year, label: year }));
    return result;
  };
