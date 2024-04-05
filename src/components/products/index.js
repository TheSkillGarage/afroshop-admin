import React from "react";
import { useSelector } from "react-redux";
import EmptyProducts from "./empty-products";
import ProductsDashboard from "./products-dashboard";


const Products = () => {

    const productsData = useSelector((state) => state.productsData);

    return (
        <>
            {
                productsData.length > 0 ?
                    <ProductsDashboard productsData={productsData} />
                    :
                    <EmptyProducts />}
        </>
    )
}

export default Products;