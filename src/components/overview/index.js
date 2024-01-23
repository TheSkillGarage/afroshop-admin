import React from "react";
import Welcome from "../dashboard/welcome";
import Dashboard from "../dashboard/dashboard";
import { OVERVIEW_DATA } from "../../data";


const Overview = () => {

    return (
        <div >
            {OVERVIEW_DATA.length < 0 ?
                <Welcome />
                :
                <Dashboard />
            }
        </div>
    );
};

export default Overview;
