import React from "react";
import Welcome from "../dashboard/welcome";
import DraftView from "../dashboard/draft-store-dashboard"
import Dashboard from "../dashboard/dashboard";
import { useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";

const Overview = () => {
  const storeExists = useSelector((state) => state.storeExists);
  const stores = useSelector((state) => state.stores);
  const loading = useSelector((state) => state.loadingStates);
  const ordersData = useSelector((state) => state.ordersData);
  const storeID = useSelector((state) => state.storeID);

  return (
    <>
      {storeExists && stores && stores[storeID]?.status === "Draft" ? (
       <DraftView/>
      ) : (
        <>
          {storeExists && ordersData !== null ? (
            <Dashboard />
          ) : loading?.stores || !loading || loading?.ordersData ? (
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
          ) : (
            <Welcome />
          )}
        </>
      )}
    </>
  );
};

export default Overview;
