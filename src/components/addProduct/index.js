import React, { useState } from "react";
import ProductChanges from "../products-changes";
import { addProduct } from "../../redux/action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const AddProduct = () => {

    const [productInfo, setProductInfo] = useState({
        category: "",
        productName: "",
        availabilty: "",
        salesPrice: "",
        discount: "",
        description: "",
        images: []
    });

    const handleProductInfo = (key, val) => {
        setProductInfo((prevProductInfo) => ({
            ...prevProductInfo,
            [key]: val,
        }))
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddFormSubmit = () => {
        dispatch(addProduct({ productInfo: productInfo, status: "active"}));
        navigate("/products");
    }

    const handleProductDraft = () => {
        dispatch(addProduct({ productInfo: productInfo, status: "draft"}));
        navigate("/products");
    }

    return (
        <ProductChanges
            name="add"
            productInfo={productInfo}
            handleProductInfo={handleProductInfo}
            handleFormSubmit={handleAddFormSubmit}
            handleProductDraft={handleProductDraft}
            drafted={false}
        />
    )
}

export default AddProduct;