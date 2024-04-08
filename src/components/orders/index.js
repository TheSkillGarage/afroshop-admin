import React from "react";
import { useSelector } from "react-redux";
import EmptyOrders from "./empty-orders";
import OrdersDashboard from "./orders-dashboard";

const Orders = () => {
    const ordersData = useSelector((state) => state.ordersData);
    return (
        <div>
            {ordersData === null || ordersData.length > 0 ?
                <OrdersDashboard />
                :
                <EmptyOrders />
            }
        </div>
    )
}

export default Orders;