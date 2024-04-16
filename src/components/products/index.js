import React from "react";
import { useSelector } from "react-redux";
import EmptyProducts from "./empty-products";
import ProductsDashboard from "./products-dashboard";


const Products = () => {
    const storeData = useSelector((state) => state.store);
    const productsData = useSelector((state) => state.productsData);

    return (
        <>
            {
                storeData === null || productsData === null || productsData?.length === 0 ?
                    <EmptyProducts />
                    :
                    <ProductsDashboard productsData={productsData} />

            }
        </>
    )
}

export default Products;