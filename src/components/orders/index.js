import React from "react";
import { useSelector } from "react-redux";
import EmptyOrders from "./empty-orders";
import OrdersDashboard from "./orders-dashboard";
import { BeatLoader } from "react-spinners";

const Orders = () => {
    const ordersData = useSelector((state) => state.ordersData);
    const storeData = useSelector((state) => (state.stores && state.stores.length > 0) ? state.stores[state.storeID] : {});
    const loading = useSelector((state) => state.loadingStates);
    
    return (
        <div>
            {loading?.store || !loading || loading?.ordersData 
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
                : storeData === null || ordersData === null
                    ? <EmptyOrders />
                    : <OrdersDashboard />
            }
        </div>
    )
}

export default Orders;