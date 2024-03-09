import React, { useEffect } from "react";
import Welcome from "../dashboard/welcome";
import Dashboard from "../dashboard/dashboard";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersData, resetStore } from "../../redux/action";


const Overview = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetStore())
        dispatch(getOrdersData(1))
    }, [])

    const ordersData = [useSelector((state) => state.ordersData)];
    const orders = []
    return (
        <div >
            {orders.length === 0 ?
                <Welcome />
                :
                <Dashboard />
            }
        </div>
    );
};

export default Overview;
