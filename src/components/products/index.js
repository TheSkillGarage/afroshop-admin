import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmptyProducts from "./empty-products";
import { getProductData, getStoreData } from "../../redux/action";
import { getTokenFromCookie } from "../../utils";
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