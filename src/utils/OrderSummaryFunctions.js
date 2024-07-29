export const calculateTotals = (selectedYear, data) => {
  let sales = 0;
  let customers = new Set();
  let orders = 0;
  let products = new Set();

  data?.forEach((order) => {
    const orderYear = new Date(order?.createdAt).getFullYear();

    if (selectedYear === "all" || orderYear === selectedYear) {
      if (order.status === "Cancelled" || order.status === "cancelled") {
        sales += 0;
      }else{
        sales += order?.grandTotal;
      }
      customers.add(order?.email);
      orders++;
      order?.products?.forEach((product) => {
        products?.add(product?.productID);
      });
    }
  });

  return {
    sales,
    customers,
    orders,
    products,
  };
};

export const calculatePercentageChanges = (ordersData, selectedYear) => {
  let ordersForSelectedYear = [];
  let ordersForPreviousYear = [];

  ordersData?.forEach((order) => {
    const orderYear = new Date(order.createdAt).getFullYear();
    if (orderYear === parseInt(selectedYear)) {
      ordersForSelectedYear.push(order);
    } else if (orderYear === parseInt(selectedYear) - 1) {
      ordersForPreviousYear.push(order);
    }
  });

  const calculatePercentageChange = (currentValue, previousValue) => {
    if (previousValue > 0) {
      return parseFloat(
        ((currentValue - previousValue) / previousValue) * 100
      ).toFixed(2);
    } else {
      return null;
    }
  };

  const summaryForYear = (orders) => ({
    grandTotal: orders.reduce(
      (sum, order) => sum + (order?.grandTotal || 0),
      0
    ),
    uniqueCustomers: new Set(orders.map((order) => order?.email)).size,
    totalOrders: orders.length,
    uniqueProducts: new Set(
      orders.flatMap((order) =>
        order?.products?.map((product) => product?.productID)
      )
    ).size,
  });

  const selectedYearSummary = summaryForYear(ordersForSelectedYear);
  const previousYearSummary = summaryForYear(ordersForPreviousYear);

  const percentageChanges = {
    sales: calculatePercentageChange(
      selectedYearSummary.grandTotal,
      previousYearSummary.grandTotal
    ),
    customers: calculatePercentageChange(
      selectedYearSummary.uniqueCustomers,
      previousYearSummary.uniqueCustomers
    ),
    orders: calculatePercentageChange(
      selectedYearSummary.totalOrders,
      previousYearSummary.totalOrders
    ),
    products: calculatePercentageChange(
      selectedYearSummary.uniqueProducts,
      previousYearSummary.uniqueProducts
    ),
  };

  return percentageChanges;
};

export const getTopData = (ordersData) => {
  const productSalesMap = {};
  const customerDetails = {};

  const currentDate = new Date();
  const sevenDaysAgo = new Date(currentDate);
  sevenDaysAgo.setDate(currentDate.getDate() - 7);

  // Loop through each object in the array and aggregate product sales
  ordersData?.forEach((data) => {
    // get Top Products
    data?.products.forEach((product) => {
      try {
        productSalesMap[product?.productID].totalSales += product?.amount;
      } catch {
        productSalesMap[product?.productID] = {
          productID: product?.productID,
          productName: product?.name,
          productImage: product?.image,
          totalSales: product?.amount,
        };
      }
    });

    // get Top Customers
    const orderDate = new Date(data?.createdAt);
    if (orderDate > sevenDaysAgo) {
      const { customer, firstName, lastName, email, customerProfileURL } = data;
      try {
        customerDetails[email].orders++;
        customerDetails[email].image =
          customerDetails[email].image === null
            ? customerProfileURL
            : customerDetails[email].image;
      } catch {
        customerDetails[email] = {
          customerID: customer ? customer : null,
          name: `${firstName} ${lastName}`,
          email: email,
          image: customerProfileURL,
          orders: 1,
        };
      }
    }
  });

  // Converting the aggregated product sales into a sorted array of objects
  const topProductsArray = Object.values(productSalesMap)
    .sort((a, b) => b.totalSales - a.totalSales)
    .filter((obj) => obj.productID !== undefined);
  // Converting the aggregated customer data into an array of objects
  const customerArray = Object.values(customerDetails).sort(
    (a, b) => b.orders - a.orders
  );

  return [topProductsArray, customerArray];
};

export const getLineChartData = (selectedYear, ordersData, storeCreateDate) => {
  // if there haven't been any orders yet, return []
  if (!ordersData || ordersData.length === 0) {
    return null;
  }

  const data = {
    dates: [],
  };
  const startDate = new Date(storeCreateDate);
  const today = new Date();

  if (selectedYear === "week") {
    data.income = Array(7).fill(0);
    data.orders = Array(7).fill(0);

    // Fill the dates array with the last 7 days
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - 6 + i);
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
      }).format(date);
      data.dates.push(formattedDate); // Format as 'MMM dd'

      if (date < startDate) {
        data.income[i] = null; // Update the income array to null if the date is before the store creation date
        data.orders[i] = null; // Update the orders array to null if the date is before the store creation date
      }
    }

    ordersData.forEach((order) => {
      const entryDate = new Date(order.createdAt);
      const diffTime = new Date() - entryDate;

      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

      if (diffDays < 7 && diffDays >= 0) {
        data.income[7 - diffDays] += order.grandTotal; // Use 7 - diffDays to match the correct index
        data.orders[7 - diffDays] += 1; // Use 7 - diffDays to match the correct index
      }
    });
  } else {
    data.income = Array(12).fill(0);
    data.orders = Array(12).fill(0);

    // Fill the dates array with the months of the selected year
    for (let i = 0; i < 12; i++) {
      const date = new Date(selectedYear, i, 1);
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        month: "short",
      }).format(date);

      data.dates.push(formattedDate); // Format as 'MMM'

      // Check if the date is before the store creation date
      if (date < startDate && i < startDate.getMonth()) {
        data.income[i] = null;
        data.orders[i] = null;
      }

      // Check if the date is after today (only relevant if selectedYear is the current year)
      if (
        selectedYear === today.getFullYear() &&
        date > today &&
        i > today.getMonth()
      ) {
        data.income[i] = null;
        data.orders[i] = null;
      }
    }

    // Iterate over ordersData to aggregate income and orders
    ordersData.forEach((order) => {
      const entryDate = new Date(order.createdAt);
      const entryYear = entryDate.getFullYear();
      const entryMonth = entryDate.getMonth();

      if (entryYear === selectedYear) {
        if (data.income[entryMonth] !== null) {
          // Check if the value is not null before adding
          data.income[entryMonth] += order.grandTotal; // Use entryMonth to match the correct index
          data.orders[entryMonth] += 1; // Use entryMonth to match the correct index
        }
      }
    });
  }

  return data;
};

export function getAxisDetails(arr, maximum, step) {
  const max = Math.max(...arr); // Find the maximum value in the array

  const nextPow = Math.pow(10, Math.ceil(Math.log10(max))); // Calculate the next power of 10

  const maxAxisValue =
    nextPow / 5 > max ? nextPow / 5 : nextPow / 2 > max ? nextPow / 2 : nextPow;

  return {
    max: Math.max(maximum, maxAxisValue),
    step: Math.max(maximum / 4, maxAxisValue / 4, step),
  };
}

export function getAxisTicks(value, index, ticks) {
  if (value < 100) {
    return value;
  } else {
    return value / 1000 + "K";
  }
}
