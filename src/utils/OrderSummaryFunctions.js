export const calculateTotals = (selectedYear, data) => {
  let sales = 0;
  let customers = new Set();
  let orders = 0;
  let products = new Set();

  data?.forEach(order => {
    const orderYear = new Date(order?.createdAt).getFullYear();

    if (selectedYear === "all" || orderYear === selectedYear) {
      sales += order?.grandTotal;
      customers.add(order?.email);
      orders++;
      order?.products?.forEach(product => {
        products?.add(product?.productID);
      });
    }
  });

  return {
    sales,
    customers,
    orders,
    products,
  }
};

export const calculatePercentageChanges = (ordersData, selectedYear) => {
  let ordersForSelectedYear = [];
  let ordersForPreviousYear = [];


  ordersData?.forEach(order => {
    const orderYear = new Date(order.createdAt).getFullYear();
    if (orderYear === parseInt(selectedYear)) {
      ordersForSelectedYear.push(order);
    } else if (orderYear === parseInt(selectedYear) - 1) {
      ordersForPreviousYear.push(order);
    }
  });

  const calculatePercentageChange = (currentValue, previousValue) => {
    if (previousValue > 0) {
      return parseFloat(((currentValue - previousValue) / previousValue) * 100).toFixed(2);
    } else {
      return null;
    }
  };

  const summaryForYear = (orders) => ({
    grandTotal: orders.reduce((sum, order) => sum + (order?.grandTotal || 0), 0),
    uniqueCustomers: new Set(orders.map(order => order?.email)).size,
    totalOrders: orders.length,
    uniqueProducts: new Set(orders.flatMap(order => order?.products?.map(product => product?.productID))).size
  });

  const selectedYearSummary = summaryForYear(ordersForSelectedYear);
  const previousYearSummary = summaryForYear(ordersForPreviousYear);

  const percentageChanges = {
    sales: calculatePercentageChange(selectedYearSummary.grandTotal, previousYearSummary.grandTotal),
    customers: calculatePercentageChange(selectedYearSummary.uniqueCustomers, previousYearSummary.uniqueCustomers),
    orders: calculatePercentageChange(selectedYearSummary.totalOrders, previousYearSummary.totalOrders),
    products: calculatePercentageChange(selectedYearSummary.uniqueProducts, previousYearSummary.uniqueProducts)
  };

  return percentageChanges;
};


// Function for aggregating top products
export const getTopProducts = (ordersData) => {
  const productSalesMap = {};

  // Loop through each object in the array and aggregate product sales
  ordersData?.forEach(data => {
    const products = data?.products;

    products?.forEach(product => {

      if (!productSalesMap[product?.productID]) {
        productSalesMap[product?.productID] = {
          productID: product?.productID,
          productName: product?.name,
          productImage: product?.image,
          totalSales: product?.amount
        };
      } else {
        productSalesMap[product?.productID].totalSales += product?.amount;
      }
    });
  });

  // Converting the aggregated product sales into a sorted array of objects
  const topProductsArray = Object.values(productSalesMap).sort((a, b) => b.totalSales - a.totalSales);

  return topProductsArray
}


// Function to filter and aggregate customer data
export const getTopCustomers = (ordersData) => {

  const currentDate = new Date();
  const sevenDaysAgo = new Date(currentDate);
  sevenDaysAgo.setDate(currentDate.getDate() - 7);

  // Filter ordersData to include only orders within the last 7 days
  const weeklyData = ordersData?.filter(data => {
    const orderDate = new Date(data?.createdAt);
    return orderDate > sevenDaysAgo;
  });

  // Creating an array of top customers
  const customerDetails = {};

  weeklyData?.forEach(data => {

    const { customer, firstName, lastName, email, customerProfileURL } = data;

    if (!customerDetails[email]) {
      customerDetails[email] = {
        customerID: customer ? customer : null,
        name: `${firstName} ${lastName}`,
        email: email,
        image: customerProfileURL,
        orders: 1
      };
    } else if (customerDetails[email].customerID === null) {
      customerDetails[email].image = customerProfileURL;
      customerDetails[email].orders++;
    }
    else {
      customerDetails[email].orders++;
    }
  });

  // Converting the aggregated customer data into an array of objects
  const customerArray = Object.values(customerDetails).sort((a, b) => b.orders - a.orders);

  return customerArray;
};

export const getLineChartData = (selectedYear, ordersData, storeCreateDate) => {
  if (ordersData.length > 0) {
    const filteredData = [];
    const todaysDate = new Date();
    const yearData = ordersData.filter(entry => new Date(entry.createdAt).getFullYear() === Number(selectedYear));

    if (selectedYear === "week") {
      const ordersMap = new Map();
      ordersData.forEach(entry => {
        const entryDate = new Date(entry.createdAt).toISOString().split('T')[0];
        ordersMap.set(entryDate, entry);
      });

      const sevenDaysAgo = new Date(todaysDate);
      sevenDaysAgo.setDate(todaysDate.getDate() - 7);

      for (let i = 0; i < 7; i++) {
        const date = new Date(sevenDaysAgo);
        date.setDate(sevenDaysAgo.getDate() + i);
        const order = ordersMap.get(date.toISOString().split('T')[0]);
        filteredData.push(order ? order : { id: null, createdAt: date, grandTotal: 0 });
      }
    } else {
      const startDate = new Date(storeCreateDate);
      const startMonth = startDate.getFullYear() === Number(selectedYear) ? startDate.getMonth() : 0;
      const isCurrentYear = Number(selectedYear) === todaysDate.getFullYear();

      if (isCurrentYear) {
        const currentMonth = todaysDate.getMonth();

        for (let month = startMonth; month <= currentMonth; month++) {
          const monthOrders = yearData.filter(entry => new Date(entry.createdAt).getMonth() === month);
          const daysInMonth = new Date(todaysDate.getFullYear(), month + 1, 0).getDate();
          const startDay = (month === startMonth) ? startDate.getDate() : 1;
          const endDay = (month === currentMonth) ? todaysDate.getDate() : daysInMonth;

          for (let day = startDay; day <= endDay; day++) {
            const currentDate = new Date(todaysDate.getFullYear(), month, day);
            const ordersForDate = monthOrders.filter(entry => new Date(entry.createdAt).getDate() === day);
            filteredData.push({
              id: null,
              createdAt: currentDate,
              grandTotal: ordersForDate.reduce((total, order) => total + order.grandTotal, 0)
            });
          }
        }
      } else {
        const startDay = startDate.getFullYear() === Number(selectedYear) ? startDate.getDay() : 1;
        const firstDay = new Date(Number(selectedYear), startMonth, startDay);
        const decThirtyFirst = new Date(Number(selectedYear), 11, 31);
        const numberOfDays = Math.floor((decThirtyFirst - firstDay) / (1000 * 60 * 60 * 24)) + 1;

        for (let i = 0; i < numberOfDays; i++) {
          const currentDate = new Date(firstDay);
          currentDate.setDate(currentDate.getDate() + i);
          const ordersForDate = yearData.filter(entry => new Date(entry.createdAt).toDateString() === currentDate.toDateString());
          filteredData.push(ordersForDate.length > 0 ? ordersForDate : { id: null, createdAt: currentDate, grandTotal: 0 });
        }
      }
    }

    return filteredData;
  } else {
    return [];
  }

};




