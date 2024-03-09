import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmptyOrders from "./empty-orders";
import OrdersDashboard from "./orders-dashboard";
import { getOrdersData } from "../../redux/action";


const Orders = () => {
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(getOrdersData(1))
    }, [])

    const ordersData = useSelector((state) => state.ordersData);
    return (
        <div>
            {ordersData.length > 0 ?
                <OrdersDashboard />
                :
                <EmptyOrders />
            }
        </div>
    )
}

export default Orders;