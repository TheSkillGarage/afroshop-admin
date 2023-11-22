const ORDERS_DATA = [
    {
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
    {
        orderID: "XXXXX4",
        orderDate: "23/12/23",
        customer: "Justin James A.",
        price: {price: "15", paymentMethod: "Mastercard"},
        items: 1,
        status: "cancelled",
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
        orderID: "XXXXX5",
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
        orderID: "XXXXX6",
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
        orderID: "XXXXX7",
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
    {
        orderID: "XXXXX8",
        orderDate: "23/12/23",
        customer: "Justin James A.",
        price: {price: "15", paymentMethod: "Mastercard"},
        items: 1,
        status: "cancelled",
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
        orderID: "XXXXX9",
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
        orderID: "XXXX10",
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
        orderID: "XXXX11",
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
    {
        orderID: "XXXX12",
        orderDate: "23/12/23",
        customer: "Justin James A.",
        price: {price: "15", paymentMethod: "Mastercard"},
        items: 1,
        status: "cancelled",
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
        orderID: "XXXX13",
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
        orderID: "XXXX14",
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
        orderID: "XXXX15",
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
    {
        orderID: "XXXX16",
        orderDate: "23/12/23",
        customer: "Justin James A.",
        price: {price: "15", paymentMethod: "Mastercard"},
        items: 1,
        status: "cancelled",
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
        orderID: "XXXX17",
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
        orderID: "XXXX18",
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
        orderID: "XXXX19",
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
    {
        orderID: "XXXX20",
        orderDate: "23/12/23",
        customer: "Justin James A.",
        price: {price: "15", paymentMethod: "Mastercard"},
        items: 1,
        status: "cancelled",
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


export default ORDERS_DATA;