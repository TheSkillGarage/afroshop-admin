import React from "react";
import Welcome from "../dashboard/welcome";
import Dashboard from "../dashboard/dashboard";
import { useSelector } from "react-redux";

const Overview = () => {
    const profileData = useSelector((state) => state.profile);

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
