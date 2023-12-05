const ORDERS_DATA = [
    {
        id:"order1",
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
        id:"order2",
        orderID: "XXXXX2",
        orderDate: "23/12/23",
        customer: "Justin James A.",
        price: {price: "13", paymentMethod: "Mastercard"},
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
        id:"order4",
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
        id:"order5",
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
        id:"order5",
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
        id:"order6",
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
        id:"order7",
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
        id:"order8",
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
        id:"order9",
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
        id:"order10",
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
        id:"order11",
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
        id:"order12",
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
        id:"order13",
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
        id:"order14",
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
        id:"order15",
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
        id:"order16",
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
        id:"order17",
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
        id:"order18",
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
        id:"order19",
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
        id:"order20",
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