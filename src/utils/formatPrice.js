export const formatPrice = (number) => {
    const formatter = new Intl.NumberFormat('en-CA', {
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
    });

    // Format the number
    return formatter.format(number);
}
