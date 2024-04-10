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
  const topProductsArray = Object.values(productSalesMap).sort((a, b) => b.totalSales - a.totalSales).filter((obj) => obj.productID !== undefined);

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

  // if there haven't been any orders yet, return [] 
  if (ordersData.length > 0) {

    const filteredData = [];
    const todaysDate = new Date();

    const yearData = ordersData.filter(entry => new Date(entry.createdAt).getFullYear() === Number(selectedYear));

    if (selectedYear === "week") {
      const sevenDaysAgo = new Date(todaysDate);
      sevenDaysAgo.setDate(todaysDate.getDate() - 6);
    
      // Filter ordersData for the last 7 days
      const ordersForLast7Days = ordersData.filter(entry => {
        const entryDate = new Date(entry.createdAt);
        return entryDate >= sevenDaysAgo && entryDate <= todaysDate;
      });
    
      // Generate data for the last 7 days
      for (let i = 0; i < 7; i++) {
        const date = new Date(sevenDaysAgo);
        date.setDate(sevenDaysAgo.getDate() + i);
    
        // Filter orders for the current date
        const orders = ordersForLast7Days.filter(entry => {
          const entryDate = new Date(entry.createdAt).toISOString().split('T')[0];
          return entryDate === date.toISOString().split('T')[0];
        });
    
        // Calculate total grandTotal for the current date's orders
        const totalGrandTotal = orders.reduce((total, order) => total + order.grandTotal, 0);
    
        filteredData.push({
          id: i,
          createdAt: date,
          grandTotal: totalGrandTotal,
          orderCount: orders.length
        });
      }
    }
     else {

      //when selectedYear is a year e.g 2024
      const startDate = new Date(storeCreateDate);

      //use store start month if selected year equals store create year else use January
      const startMonth = startDate.getFullYear() === Number(selectedYear) ? startDate.getMonth() : 0;
      const isCurrentYear = Number(selectedYear) === todaysDate.getFullYear();

      if (isCurrentYear) {
        // If the selected year is the current year, retrieve data only until the current month

        const currentMonth = todaysDate.getMonth();
      
        // Loop through each month from the start month to the current month
        for (let month = startMonth; month <= currentMonth; month++) {
          // Filter data for the current month
          const monthOrders = yearData.filter(entry => new Date(entry.createdAt).getMonth() === month);
          
          // Get the number of days in the current month
          const daysInMonth = new Date(todaysDate.getFullYear(), month + 1, 0).getDate();
          
          // Determine the start and end days for filtering data
          const startDay = (month === startMonth) ? startDate.getDate() : 1;
          const endDay = (month === currentMonth) ? todaysDate.getDate() : daysInMonth;
      
          // Loop through each day in the current month
          for (let day = startDay; day <= endDay; day++) {
            // Create a date object for the current day
            const currentDate = new Date(todaysDate.getFullYear(), month, day);
            
            // Filter orders for the current day ad calculate total
            const ordersForDate = monthOrders.filter(entry => new Date(entry.createdAt).getDate() === day);
            const totalForDay = ordersForDate.reduce((total, order) => total + order.grandTotal, 0);
            
            // Push filtered data for the current day into the array
            filteredData.push({
              id: `${day}-${month}`, 
              createdAt: currentDate,
              grandTotal: totalForDay,
              orderCount: ordersForDate.length
            });
          }
        }
      }
      else {
        // If the selected year is not the current year
        
        // if selected year is start year get day from date or 1
        const startDay = startDate.getFullYear() === Number(selectedYear) ? startDate.getDay() : 1;
        
        // Create a date object for the first day of the selected year
        const firstDay = new Date(Number(selectedYear), startMonth, startDay);
        
        // Create a date object for December 31st of the selected year
        const decThirtyFirst = new Date(Number(selectedYear), 11, 31);
        
        // Calculate the number of days between the first day and December 31st of the selected year
        const numberOfDays = Math.floor((decThirtyFirst - firstDay) / (1000 * 60 * 60 * 24)) + 1;
      
        // Loop through each day from the first day of the year to December 31st
        for (let i = 0; i < numberOfDays; i++) {
          // Create a date object for the current day
          const currentDate = new Date(firstDay);
          currentDate.setDate(currentDate.getDate() + i);
          
          // Filter orders for the current date and calculate total
          const ordersForDate = yearData.filter(entry => new Date(entry.createdAt).toDateString() === currentDate.toDateString());
          const totalForDay = ordersForDate.reduce((total, order) => total + order.grandTotal, 0);
          
          // Push filtered data for the current day into the array
          filteredData.push({
            id: i,
            createdAt: currentDate,
            grandTotal: totalForDay,
            orderCount: ordersForDate.length
          });
        }
      }
      
    }

    return filteredData;
  } else {
    return [];
  }

};




