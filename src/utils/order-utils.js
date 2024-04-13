export const formatPrice = (number) => {
    const formatter = new Intl.NumberFormat('en-CA', {
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
    });

    // Format the number
    return formatter.format(number);
}


export const isProductInPendingOrder = (productId, orders) => {
    for (const order of orders) {
        if (order.status === "Pending") {
            const foundProduct = order.products.find(product => product.productID === productId);
            if (foundProduct) {
                return true;
            }
        }
    }

    return false;
}