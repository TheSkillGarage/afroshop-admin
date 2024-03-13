import React, { useEffect } from "react";
import Welcome from "../dashboard/welcome";
import Dashboard from "../dashboard/dashboard";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersData } from "../../redux/action";


const Overview = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrdersData(1))
    }, [])

    const ordersData = useSelector((state) => state.ordersData);
    
    return (
        <div >
            {ordersData.length === 0 ?
                <Welcome />
                :
                <Dashboard />
            }
        </div>
    );
};

export default Overview;
