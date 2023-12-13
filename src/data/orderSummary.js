const ORDERS_SUMMARY = [
    {
        id: "order-1",
        orderID: "XXXXX1",
        orderDate: "23/12/23",
        customer: "Justin James A.",
        price: {price: "15", paymentMethod: "Paypal"},
        items: 3,
        status: "pending",
        order: [
            {
                name: "Peak Milk Full Cream Powder Pouch",
                productID: "XC234",
                price: "5.60",
                status: "pending"
            },
            {
                name: "Boneless Chicken Breasts with Rib Meat",
                productID: "VR456",
                price: "10.85",
                status: "pending"
            },
            {
                name: "Palm Fruit (Kernel)",
                productID: "VY123",
                price: "10.85",
                status: "pending"
            },
        ]
    },
    {
        id: "order-2",
        orderID: "XXXXX2",
        orderDate: "23/12/23",
        customer: "Justin James A.",
        price: {price: "15", paymentMethod: "Mastercard"},
        items: 4,
        status: "shipped",
        order: [
            {
                name: "Peak Milk Full Cream Powder Pouch",
                productID: "XC234",
                price: "5.60",
                status: "pending"
            },
            {
                name: "Boneless Chicken Breasts with Rib Meat",
                productID: "VR456",
                price: "10.85",
                status: "pending"
            },
            {
                name: "Palm Fruit (Kernel)",
                productID: "VY123",
                price: "10.85",
                status: "pending"
            },
        ]
    },
    {
        id: "order-3",
        orderID: "XXXXX3",
        orderDate: "23/12/23",
        customer: "Justin James A.",
        price: {price: "15", paymentMethod: "Paypal"},
        items: 11,
        status: "delivered",
        order: [
            {
                name: "Peak Milk Full Cream Powder Pouch",
                productID: "XC234",
                price: "5.60",
                status: "pending"
            },
            {
                name: "Boneless Chicken Breasts with Rib Meat",
                productID: "VR456",
                price: "10.85",
                status: "pending"
            },
            {
                name: "Palm Fruit (Kernel)",
                productID: "VY123",
                price: "10.85",
                status: "pending"
            },
        ]
    },
]

export default ORDERS_SUMMARY