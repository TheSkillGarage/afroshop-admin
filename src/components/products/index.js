import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmptyProducts from "./empty-products";
import { getProductData, getStoreData } from "../../redux/action";
import { getTokenFromCookie } from "../../utils";
import ProductsDashboard from "./products-dashboard";


const Products = () => {

    const productsData = useSelector((state) => state.productsData);
    const storeData = useSelector((state) => state.storeData);
    const user = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const token = getTokenFromCookie();

    useEffect(() => {
        dispatch(getStoreData(user.id, token));
    }, [user])

    useEffect(() => {
        dispatch(getProductData(storeData.id, token));
    }, [storeData])

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