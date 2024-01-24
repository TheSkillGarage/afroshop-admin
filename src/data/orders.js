const ORDERS_DATA = [
    {
        id: "order-1",
        orderID: "XXXXX1",
        orderDate: "23/12/23",
        customer: "Justin James A.",
        price: { price: "15", paymentMethod: "Paypal" },
        items: 3,
        status: "pending",
        order: [
            {
                productName: "Peak Milk Full Cream Powder Pouch",
                productID: "XC234",
                price: "5.60",
            },
            {
                productName: "Boneless Chicken Breasts with Rib Meat",
                productID: "VR456",
                price: "10.85",
            },
            {
                productName: "Palm Fruit (Kernel)",
                productID: "VY123",
                price: "10.85",
            },
        ],
        shopperInfo: {
            deliveryAddress: "471 East Beaver Creek Rd, ON L4B 1M7, Ontario, Canada",
            phone: "+125 000 2892",
            email: "jjames@gmail.com"
        },
    },
    {
        id: "order-2",
        orderID: "XXXXX2",
        orderDate: "23/12/23",
        customer: "Ini James A.",
        price: { price: "15", paymentMethod: "Mastercard" },
        items: 4,
        status: "shipped",
        order: [
            {
                productName: "Peak Milk Full Cream Powder Pouch",
                productID: "XC234",
                price: "5.60",
            },
            {
                productName: "Boneless Chicken Breasts with Rib Meat",
                productID: "VR456",
                price: "10.85",
            },
            {
                productName: "Palm Fruit (Kernel)",
                productID: "VY123",
                price: "10.85",
            },
        ],
        shopperInfo: {
            deliveryAddress: "471 East Beaver Creek Rd, ON L4B 1M7, Ontario, Canada",
            phone: "+125 000 2892",
            email: "jjames@gmail.com"
        },
    },
    {
        id: "order-3",
        orderID: "XXXXX3",
        orderDate: "23/12/23",
        customer: "Justin James A.",
        price: { price: "15", paymentMethod: "Paypal" },
        items: 11,
        status: "delivered",
        order: [
            {
                productName: "Peak Milk Full Cream Powder Pouch",
                productID: "XC234",
                price: "5.60",
            },
            {
                productName: "Boneless Chicken Breasts with Rib Meat",
                productID: "VR456",
                price: "10.85",
            },
            {
                productName: "Palm Fruit (Kernel)",
                productID: "VY123",
                price: "10.85",
            },
        ],
        shopperInfo: {
            deliveryAddress: "471 East Beaver Creek Rd, ON L4B 1M7, Ontario, Canada",
            phone: "+125 000 2892",
            email: "jjames@gmail.com"
        },
    },
    {
        id: "order-4",
        orderID: "XXXXX4",
        orderDate: "23/12/23",
        customer: "Edo James A.",
        price: { price: "15", paymentMethod: "Mastercard" },
        items: 1,
        status: "cancelled",
        order: [
            {
                productName: "Peak Milk Full Cream Powder Pouch",
                productID: "XC234",
                price: "5.60",
            },
            {
                productName: "Boneless Chicken Breasts with Rib Meat",
                productID: "VR456",
                price: "10.85",
            },
            {
                productName: "Palm Fruit (Kernel)",
                productID: "VY123",
                price: "10.85",
            },
        ],
        shopperInfo: {
            deliveryAddress: "471 East Beaver Creek Rd, ON L4B 1M7, Ontario, Canada",
            phone: "+125 000 2892",
            email: "jjames@gmail.com"
        },
    },
    {
        id: "order-5",
        orderID: "XXXXX5",
        orderDate: "23/12/23",
        customer: "Ini James A.",
        price: { price: "15", paymentMethod: "Paypal" },
        items: 3,
        status: "pending",
        order: [
            {
                productName: "Peak Milk Full Cream Powder Pouch",
                productID: "XC234",
                price: "5.60",
            },
            {
                productName: "Boneless Chicken Breasts with Rib Meat",
                productID: "VR456",
                price: "10.85",
            },
            {
                productName: "Palm Fruit (Kernel)",
                productID: "VY123",
                price: "10.85",
            },
        ],
        shopperInfo: {
            deliveryAddress: "471 East Beaver Creek Rd, ON L4B 1M7, Ontario, Canada",
            phone: "+125 000 2892",
            email: "jjames@gmail.com"
        },
    },
    {
        id: "order-6",
        orderID: "XXXXX6",
        orderDate: "23/12/23",
        customer: "Yamma James A.",
        price: { price: "15", paymentMethod: "Mastercard" },
        items: 4,
        status: "shipped",
        order: [
            {
                productName: "Peak Milk Full Cream Powder Pouch",
                productID: "XC234",
                price: "5.60",
            },
            {
                productName: "Boneless Chicken Breasts with Rib Meat",
                productID: "VR456",
                price: "10.85",
            },
            {
                productName: "Palm Fruit (Kernel)",
                productID: "VY123",
                price: "10.85",
            },
        ],
        shopperInfo: {
            deliveryAddress: "471 East Beaver Creek Rd, ON L4B 1M7, Ontario, Canada",
            phone: "+125 000 2892",
            email: "jjames@gmail.com"
        },
    },
    {
        id: "order-7",
        orderID: "XXXXX7",
        orderDate: "23/12/23",
        customer: "Ofofon James A.",
        price: { price: "15", paymentMethod: "Paypal" },
        items: 11,
        status: "delivered",
        order: [
            {
                productName: "Peak Milk Full Cream Powder Pouch",
                productID: "XC234",
                price: "5.60",
            },
            {
                productName: "Boneless Chicken Breasts with Rib Meat",
                productID: "VR456",
                price: "10.85",
            },
            {
                productName: "Palm Fruit (Kernel)",
                productID: "VY123",
                price: "10.85",
            },
        ],
        shopperInfo: {
            deliveryAddress: "471 East Beaver Creek Rd, ON L4B 1M7, Ontario, Canada",
            phone: "+125 000 2892",
            email: "jjames@gmail.com"
        },
    },
    {
        id: "order-8",
        orderID: "XXXXX8",
        orderDate: "23/12/23",
        customer: "Emem James A.",
        price: { price: "15", paymentMethod: "Mastercard" },
        items: 1,
        status: "cancelled",
        order: [
            {
                productName: "Peak Milk Full Cream Powder Pouch",
                productID: "XC234",
                price: "5.60",
            },
            {
                productName: "Boneless Chicken Breasts with Rib Meat",
                productID: "VR456",
                price: "10.85",
            },
            {
                productName: "Palm Fruit (Kernel)",
                productID: "VY123",
                price: "10.85",
            },
        ],
        shopperInfo: {
            deliveryAddress: "471 East Beaver Creek Rd, ON L4B 1M7, Ontario, Canada",
            phone: "+125 000 2892",
            email: "jjames@gmail.com"
        },
    },
    {
        id: "order-9",
        orderID: "XXXXX9",
        orderDate: "23/12/23",
        customer: "Justin James A.",
        price: { price: "15", paymentMethod: "Paypal" },
        items: 3,
        status: "pending",
        order: [
            {
                productName: "Peak Milk Full Cream Powder Pouch",
                productID: "XC234",
                price: "5.60",
            },
            {
                productName: "Boneless Chicken Breasts with Rib Meat",
                productID: "VR456",
                price: "10.85",
            },
            {
                productName: "Palm Fruit (Kernel)",
                productID: "VY123",
                price: "10.85",
            },
        ],
        shopperInfo: {
            deliveryAddress: "471 East Beaver Creek Rd, ON L4B 1M7, Ontario, Canada",
            phone: "+125 000 2892",
            email: "jjames@gmail.com"
        },
    },
    {
        id: "order-10",
        orderID: "XXXX10",
        orderDate: "23/12/23",
        customer: "Justin James A.",
        price: { price: "15", paymentMethod: "Mastercard" },
        items: 4,
        status: "shipped",
        order: [
            {
                productName: "Peak Milk Full Cream Powder Pouch",
                productID: "XC234",
                price: "5.60",
            },
            {
                productName: "Boneless Chicken Breasts with Rib Meat",
                productID: "VR456",
                price: "10.85",
            },
            {
                productName: "Palm Fruit (Kernel)",
                productID: "VY123",
                price: "10.85",
            },
        ],
        shopperInfo: {
            deliveryAddress: "471 East Beaver Creek Rd, ON L4B 1M7, Ontario, Canada",
            phone: "+125 000 2892",
            email: "jjames@gmail.com"
        },
    },
    {
        id: "order-11",
        orderID: "XXXX11",
        orderDate: "23/12/23",
        customer: "Justin James A.",
        price: { price: "15", paymentMethod: "Paypal" },
        items: 11,
        status: "delivered",
        order: [
            {
                productName: "Peak Milk Full Cream Powder Pouch",
                productID: "XC234",
                price: "5.60",
            },
            {
                productName: "Boneless Chicken Breasts with Rib Meat",
                productID: "VR456",
                price: "10.85",
            },
            {
                productName: "Palm Fruit (Kernel)",
                productID: "VY123",
                price: "10.85",
            },
        ],
        shopperInfo: {
            deliveryAddress: "471 East Beaver Creek Rd, ON L4B 1M7, Ontario, Canada",
            phone: "+125 000 2892",
            email: "jjames@gmail.com"
        },
    },
    {
        id: "order-12",
        orderID: "XXXX12",
        orderDate: "23/12/23",
        customer: "Justin James A.",
        price: { price: "15", paymentMethod: "Mastercard" },
        items: 1,
        status: "cancelled",
        order: [
            {
                productName: "Peak Milk Full Cream Powder Pouch",
                productID: "XC234",
                price: "5.60",
            },
            {
                productName: "Boneless Chicken Breasts with Rib Meat",
                productID: "VR456",
                price: "10.85",
            },
            {
                productName: "Palm Fruit (Kernel)",
                productID: "VY123",
                price: "10.85",
            },
        ],
        shopperInfo: {
            deliveryAddress: "471 East Beaver Creek Rd, ON L4B 1M7, Ontario, Canada",
            phone: "+125 000 2892",
            email: "jjames@gmail.com"
        },
    },
    {
        id: "order-13",
        orderID: "XXXX13",
        orderDate: "23/12/23",
        customer: "Justin James A.",
        price: { price: "15", paymentMethod: "Paypal" },
        items: 3,
        status: "pending",
        order: [
            {
                productName: "Peak Milk Full Cream Powder Pouch",
                productID: "XC234",
                price: "5.60",
            },
            {
                productName: "Boneless Chicken Breasts with Rib Meat",
                productID: "VR456",
                price: "10.85",
            },
            {
                productName: "Palm Fruit (Kernel)",
                productID: "VY123",
                price: "10.85",
            },
        ],
        shopperInfo: {
            deliveryAddress: "471 East Beaver Creek Rd, ON L4B 1M7, Ontario, Canada",
            phone: "+125 000 2892",
            email: "jjames@gmail.com"
        },
    },
    {
        id: "order-14",
        orderID: "XXXX14",
        orderDate: "23/12/23",
        customer: "Justin James A.",
        price: { price: "15", paymentMethod: "Mastercard" },
        items: 4,
        status: "shipped",
        order: [
            {
                productName: "Peak Milk Full Cream Powder Pouch",
                productID: "XC234",
                price: "5.60",
            },
            {
                productName: "Boneless Chicken Breasts with Rib Meat",
                productID: "VR456",
                price: "10.85",
            },
            {
                productName: "Palm Fruit (Kernel)",
                productID: "VY123",
                price: "10.85",
            },
        ],
        shopperInfo: {
            deliveryAddress: "471 East Beaver Creek Rd, ON L4B 1M7, Ontario, Canada",
            phone: "+125 000 2892",
            email: "jjames@gmail.com"
        },
    },
    {
        id: "order-15",
        orderID: "XXXX15",
        orderDate: "23/12/23",
        customer: "Justin James A.",
        price: { price: "15", paymentMethod: "Paypal" },
        items: 11,
        status: "delivered",
        order: [
            {
                productName: "Peak Milk Full Cream Powder Pouch",
                productID: "XC234",
                price: "5.60",
            },
            {
                productName: "Boneless Chicken Breasts with Rib Meat",
                productID: "VR456",
                price: "10.85",
            },
            {
                productName: "Palm Fruit (Kernel)",
                productID: "VY123",
                price: "10.85",
            },
        ],
        shopperInfo: {
            deliveryAddress: "471 East Beaver Creek Rd, ON L4B 1M7, Ontario, Canada",
            phone: "+125 000 2892",
            email: "jjames@gmail.com"
        },
    },
    {
        id: "order-16",
        orderID: "XXXX16",
        orderDate: "23/12/23",
        customer: "Justin James A.",
        price: { price: "15", paymentMethod: "Mastercard" },
        items: 1,
        status: "cancelled",
        order: [
            {
                productName: "Peak Milk Full Cream Powder Pouch",
                productID: "XC234",
                price: "5.60",
            },
            {
                productName: "Boneless Chicken Breasts with Rib Meat",
                productID: "VR456",
                price: "10.85",
            },
            {
                productName: "Palm Fruit (Kernel)",
                productID: "VY123",
                price: "10.85",
            },
        ],
        shopperInfo: {
            deliveryAddress: "471 East Beaver Creek Rd, ON L4B 1M7, Ontario, Canada",
            phone: "+125 000 2892",
            email: "jjames@gmail.com"
        },
    },
    {
        id: "order-17",
        orderID: "XXXX17",
        orderDate: "23/12/23",
        customer: "Justin James A.",
        price: { price: "15", paymentMethod: "Paypal" },
        items: 3,
        status: "pending",
        order: [
            {
                productName: "Peak Milk Full Cream Powder Pouch",
                productID: "XC234",
                price: "5.60",
            },
            {
                productName: "Boneless Chicken Breasts with Rib Meat",
                productID: "VR456",
                price: "10.85",

            },
            {
                productName: "Palm Fruit (Kernel)",
                productID: "VY123",
                price: "10.85",

            },
        ],
        shopperInfo: {
            deliveryAddress: "471 East Beaver Creek Rd, ON L4B 1M7, Ontario, Canada",
            phone: "+125 000 2892",
            email: "jjames@gmail.com"
        },
    },
    {
        id: "order-18",
        orderID: "XXXX18",
        orderDate: "23/12/23",
        customer: "Justin James A.",
        price: { price: "15", paymentMethod: "Mastercard" },
        items: 4,
        status: "shipped",
        order: [
            {
                productName: "Peak Milk Full Cream Powder Pouch",
                productID: "XC234",
                price: "5.60",
            },
            {
                productName: "Boneless Chicken Breasts with Rib Meat",
                productID: "VR456",
                price: "10.85",
            },
            {
                productName: "Palm Fruit (Kernel)",
                productID: "VY123",
                price: "10.85",
            },
        ],
        shopperInfo: {
            deliveryAddress: "471 East Beaver Creek Rd, ON L4B 1M7, Ontario, Canada",
            phone: "+125 000 2892",
            email: "jjames@gmail.com"
        },
    },
    {
        id: "order-19",
        orderID: "XXXX19",
        orderDate: "23/12/23",
        customer: "Justin James A.",
        price: { price: "15", paymentMethod: "Paypal" },
        items: 11,
        status: "delivered",
        order: [
            {
                productName: "Peak Milk Full Cream Powder Pouch",
                productID: "XC234",
                price: "5.60",
            },
            {
                productName: "Boneless Chicken Breasts with Rib Meat",
                productID: "VR456",
                price: "10.85",
            },
            {
                productName: "Palm Fruit (Kernel)",
                productID: "VY123",
                price: "10.85",
            },
        ],
        shopperInfo: {
            deliveryAddress: "471 East Beaver Creek Rd, ON L4B 1M7, Ontario, Canada",
            phone: "+125 000 2892",
            email: "jjames@gmail.com"
        },
    },
    {
        id: "order-20",
        orderID: "XXXX20",
        orderDate: "23/12/23",
        customer: "Justin James Alexander",
        price: { price: "15", paymentMethod: "Mastercard" },
        items: 1,
        status: "cancelled",
        order: [
            {
                productName: "Peak Milk Full Cream Powder Pouch",
                productID: "XC234",
                price: "5.60",
            },
            {
                productName: "Boneless Chicken Breasts with Rib Meat",
                productID: "VR456",
                price: "10.85",
            },
            {
                productName: "Palm Fruit (Kernel)",
                productID: "VY123",
                price: "10.85",
            },
        ],
        shopperInfo: {
            deliveryAddress: "471 East Beaver Creek Rd, ON L4B 1M7, Ontario, Canada",
            phone: "+125 000 2892",
            email: "jjames@gmail.com"
        },
    },
]


export default ORDERS_DATA;