import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmptyOrders from "./empty-orders";
import OrdersDashboard from "./orders-dashboard";
import { getOrdersData, getStoreData } from "../../redux/action";
import { getTokenFromCookie } from "../../utils";


const Orders = () => {
    const dispatch = useDispatch()

    const token = getTokenFromCookie();
    const user = useSelector((state) => state.user);
    const storeData = useSelector((state) => state.storeData);

    useEffect(() => {

        dispatch(getStoreData(user.id, token));
        dispatch(getOrdersData(storeData.id, token));
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