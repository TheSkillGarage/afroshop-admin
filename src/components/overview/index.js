import React, { useEffect } from "react";
import Welcome from "../dashboard/welcome";
import Dashboard from "../dashboard/dashboard";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersData, getStoreData } from "../../redux/action";
import { getTokenFromCookie } from "../../utils";


const Overview = () => {
    const dispatch = useDispatch();

    const token = getTokenFromCookie();
    const user = useSelector((state) => state.user);
    const storeData = useSelector((state) => state.storeData);

    useEffect(() => {

        dispatch(getStoreData(user.id, token));
        dispatch(getOrdersData(storeData.id, token));
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
