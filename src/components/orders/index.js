import React from "react";
import { useSelector } from "react-redux";
import EmptyOrders from "./empty-orders";
import OrdersDashboard from "./orders-dashboard";

const Orders = () => {
    const ordersData = useSelector((state) => state.ordersData);
    const storeData = useSelector((state) => state.store);
    return (
        <div>
            {storeData === null || ordersData === null ?
                <EmptyOrders />
                :
                <OrdersDashboard />
            }
        </div>
    )
}

export default Orders;