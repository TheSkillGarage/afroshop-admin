import React from "react";
import Welcome from "../dashboard/welcome";
import Dashboard from "../dashboard/dashboard";
import { useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";

const Overview = () => {
    const storeData = useSelector((state) => state.storeData);
    const ordersData = useSelector((state) => state.ordersData);

    return (
        <div >
            {
                storeData === null ?
                    <Welcome />
                    :
                    ordersData === null ?
                        <div className="fixed inset-0 bg-[#D3D3D3] bg-opacity-25 z-[100] flex justify-center items-center h-screen">
                            <div className="mt-[250px] w-full flex justify-center items-center">
                                <BeatLoader color={'#186F3D'} loading={true} size={25} speedMultiplier={1} />
                            </div>
                        </div>
                        :
                        <Dashboard />
            }
        </div>
    );
};

export default Overview;
