const formatDateTime = (timestamp, addSeconds = false) => {
    const dateTime = new Date(timestamp)
    const date = dateTime.toLocaleDateString()
    const time = dateTime.toLocaleTimeString()
    const [timePart, period] = time.split(' ')
    const [hours, minutes, seconds] = timePart.split(':');
    return `${date} ${hours}:${minutes}${addSeconds ? `:${seconds}` : ""} ${period}`;
}

export function exportOrdersToCSV(orderData, storeName) {
    const headers = [
        'Order ID',
        'Status',
        'Delivery Option',
        'SubTotal',
        'Service Fee',
        'Delivery Fee',
        'Total Taxes',
        'Service Taxes',
        'Item Taxes',
        'Tips',
        'Grand Total',
        'Delivery DateTime',
        'Order DateTime',
    ];

    const csvRows = [];

    // Push the headers to CSV
    csvRows.push(headers.join(','));

    // Iterate over the order data
    orderData.forEach(order => {
        const row = [
            order.orderID,
            order.status.props.children.props.status,
            order.deliveryOption ? 'Yes' : 'No',
            order.subTotal || 0,
            order.serviceFee || 0,
            order.delivery || 0,
            order.taxes || 0,
            order.serviceTaxes || 0,
            order.itemTaxes || 0,
            order.tips || 0,
            order.grandTotal || 0,
            formatDateTime(order.deliveryDateTime),
            formatDateTime(order.publishedAt, true),
        ].join(',');

        csvRows.push(row);
    });

    // Convert array to string
    const csvContent = csvRows.join('\n');

    // Create a Blob for the CSV file and generate the download link
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `Afroshop_Orders_${storeName}_${new Date().toLocaleString()}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

export function exportOrderWithProductsToCSV(order, storeName) {
    const headers = [
        'Order ID',
        'Status',
        'Delivery Option',
        'Product Name',
        'Product SKU',
        'Product Category',
        'Product Amount',
        'Product Price',
        'Delivery DateTime',
        'Order DateTime',
    ];

    const csvRows = [];

    // Push the headers to CSV
    csvRows.push(headers.join(','));

    // Add row for order details
    order.products.forEach(product => {
        const row = [
            order.orderID,
            order.status,
            order.deliveryOption ? 'Yes' : 'No',
            product.name,
            product.SKU,
            product.categoryName,
            product.amount,
            (product.price * (1 + (product.percentMarkup ?? 0) / 100) * (1 - (product.percentDiscount ?? 0) / 100)),
            formatDateTime(order.deliveryDateTime),
            formatDateTime(order.publishedAt, true),
        ].join(',');

        csvRows.push(row);
    });

    // Convert array to string
    const csvContent = csvRows.join('\n');

    // Create a Blob for the CSV file and generate the download link
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `Afroshop_Order_${storeName}_${order.orderID}_${new Date().toLocaleString()}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
