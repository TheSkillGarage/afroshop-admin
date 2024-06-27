import React from "react";
import Welcome from "../dashboard/welcome";
import Dashboard from "../dashboard/dashboard";
import { useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";

const Overview = () => {
  const storeExists = useSelector((state) => state.storeExists);
  const loading = useSelector((state) => state.loadingStates);
  const ordersData = useSelector((state) => state.ordersData)

  return (
    <>
      {
          (loading?.store || !loading || loading?.ordersData)
            ? (
              <div className="fixed inset-0 bg-[#D3D3D3] bg-opacity-25 z-[100] flex justify-center items-center h-screen">
                <div className="mt-[250px] w-full flex justify-center items-center">
                  <BeatLoader
                    color={"#186F3D"}
                    loading={true}
                    size={25}
                    speedMultiplier={1}
                  />
                </div>
              </div>
            )
            : storeExists && ordersData !== null ?
            <Dashboard />
            :
            <Welcome />
      }
    </>
  );
};

export default Overview;
