import React, { useState } from "react";
import ProductChanges from "../products-changes";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, postRequest } from "../../redux/action";
import { getTokenFromCookie } from "../../utils";


const AddProduct = () => {
  const store = useSelector((state) => state.storeData)
  const storeID = store.id
  const token = getTokenFromCookie()

  const useProductInfo = {
    category: "",
    productName: "",
    availabilty: "",
    salesPrice: "",
    discount: "",
    description: "",
    images: [],
  };

  const [productInfo, setProductInfo] = useState(useProductInfo);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleProductInfo = (key, val) => {
    setProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      [key]: val,
    }));
  };

  const handleCreateProduct = async (data) => {
    try {
      const [success, responseData] = await postRequest(
        `/api/products/${storeID}`,
        data, token
      );
      if (!success || responseData?.error) {
        throw new Error(responseData?.error?.message);
      } else {
       console.log("Product info", responseData)
      }

    } catch (error) {
      console.log(error);
    } finally {
      console.log("Product created", data);
    }
  };

  const handleFormSubmit = () => {
    dispatch(addProduct({ productInfo: productInfo, status: "active" }));
    navigate("/products");
  };

  const handleProductDraft = () => {
    dispatch(addProduct({ productInfo: productInfo, status: "draft" }));
    navigate("/products");
  };

  return (
    <ProductChanges
      isEdit={false}
      productInfo={productInfo}
      initialProductInfo={useProductInfo}
      handleProductInfo={handleProductInfo}
      handleFormSubmit={handleCreateProduct}
      handleProductDraft={handleProductDraft}
    />
  );
};

export default AddProduct;
