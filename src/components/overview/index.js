import React from "react";
import Welcome from "../dashboard/welcome";
import Dashboard from "../dashboard/dashboard";
import { useSelector } from "react-redux";
import EmptyState from "../dashboard/empty-state";


const Overview = () => {

    const profileData = useSelector((state) => state.profile);
    const orderData = useSelector((state) => state.ordersData);

    return (
        <div >
            {(profileData === null || Object.keys(profileData).length === 0) ?
                <Welcome />
                :
                <Dashboard />
            }
        </div>
    );
};

export default Overview;
