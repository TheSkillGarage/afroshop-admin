import React, { useState } from "react";
import ProductChanges from "../products-changes";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/action";


const AddProduct = () => {

    const useProductInfo = {
        category: "",
        productName: "",
        availabilty: "",
        salesPrice: "",
        discount: "",
        description: "",
        images: []
    }

    const [productInfo, setProductInfo] = useState(useProductInfo);


    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleProductInfo = (key, val) => {

        setProductInfo((prevProductInfo) => ({
            ...prevProductInfo,
            [key]: val,
        }))
    }

    const handleFormSubmit = () => {
        dispatch(addProduct({ productInfo: productInfo, status: "active" }));
        navigate("/products");
    }

    const handleProductDraft = () => {
        dispatch(addProduct({ productInfo: productInfo, status: "draft" }));
        navigate("/products");
    }

    return (
        <ProductChanges
            isEdit={false}
            productInfo={productInfo}
            initialProductInfo={useProductInfo}
            handleProductInfo={handleProductInfo}
            handleFormSubmit={handleFormSubmit}
            handleProductDraft={handleProductDraft}
        />
    )
}

export default AddProduct;