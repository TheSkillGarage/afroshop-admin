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

export const calculatePercentageChanges = (ordersData, selectedYear, years) => {
    let ordersForSelectedYear;
    let ordersForPreviousYear;

    if (selectedYear === "all") {
      ordersForSelectedYear = ordersData?.filter(order => new Date(order.createdAt).getFullYear() === Math.max(...years.map(year => year.value)));
      ordersForPreviousYear = ordersData?.filter(order => new Date(order.createdAt).getFullYear() === Math.min(...years.map(year => year.value)));
    } else {
      ordersForSelectedYear = ordersData?.filter(order => new Date(order.createdAt).getFullYear() === parseInt(selectedYear));
      ordersForPreviousYear = ordersData?.filter(order => new Date(order.createdAt).getFullYear() === parseInt(selectedYear) - 1);
    }

    const calculatePercentageChange = (currentValue, previousValue) => {
        if (previousValue > 0) {
            return parseFloat(((currentValue - previousValue) / previousValue) * 100).toFixed(2);
        } else {
            return parseFloat(((currentValue) / 1) * 100).toFixed(2);
        }
    };

    const percentageChanges = {
        sales: calculatePercentageChange(
            ordersForSelectedYear?.reduce((sum, order) => sum + order?.grandTotal, 0),
            ordersForPreviousYear?.reduce((sum, order) => sum + order?.grandTotal, 0)
        ),
        customers: calculatePercentageChange(
            new Set(ordersForSelectedYear?.map(order => order?.email)).size,
            new Set(ordersForPreviousYear?.map(order => order?.email)).size
        ),
        orders: calculatePercentageChange(
            ordersForSelectedYear?.length,
            ordersForPreviousYear?.length
        ),
        products: calculatePercentageChange(
            new Set(ordersForSelectedYear?.flatMap(order => order?.products?.map(product => product?.productID))).size,
            new Set(ordersForPreviousYear?.flatMap(order => order?.products?.map(product => product?.productID))).size
        )
    };

    return percentageChanges;
};