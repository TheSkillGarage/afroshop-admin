import React from "react";
import { useSelector } from "react-redux";
import EmptyProducts from "./empty-products";
import ProductsDashboard from "./products-dashboard";
import { BeatLoader } from "react-spinners";
import Welcome from "../dashboard/welcome";
import DraftView from "../dashboard/draft-store-dashboard";

const Products = () => {
  const loading = useSelector((state) => state.loadingStates);
  const productsData = useSelector((state) => state.productsData);
  const store = useSelector((state) =>
    state.stores && state.stores.length > 0 ? state.stores[state.storeID] : {}
  );
  const storeExists = useSelector((state) => state.storeExists);

  return (
    <>
      {storeExists && store && store?.status === "Draft" ? (
        <DraftView />
      ) : (
        <>
          {storeExists ? (
            loading?.productsData || !loading ? (
              <div className="fixed inset-0 bg-[#D3D3D3] bg-opacity-25 z-[100] flex justify-center items-center h-screen">
                <div className="mt-[250px] w-full flex justify-center items-center">
                  <BeatLoader
                    color={"#186F3D"}
                    loading={true}
                    size={25}
                    speedMultiplier={2}
                  />
                </div>
              </div>
            ) : store === null &&
              (productsData === null || productsData?.length === 0) ? (
              <EmptyProducts />
            ) : (
              <ProductsDashboard productsData={productsData} />
            )
          ) : (
            <Welcome />
          )}
        </>
      )}
    </>
  );
};

export default Products;
