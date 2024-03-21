   // Function for aggregating top products
   export const getTopProducts = (ordersData) => {
    const productSalesMap = {};

    // Loop through each object in the array and aggregate product sales
    ordersData?.forEach(data => {
      const products = data?.products;

      products?.forEach(product => {
        const { productID, name, image, amount } = product;

        if (!productSalesMap[productID]) {
          productSalesMap[productID] = {
            productID,
            productName: name,
            productImage: image,
            totalSales: amount
          };
        } else {
          productSalesMap[productID].totalSales += amount;
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
          return orderDate >= sevenDaysAgo && orderDate <= currentDate;
        });
  
        // Creating an array of top customers
        const customerDetails = {};
  
        weeklyData.forEach(data => {
  
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
  