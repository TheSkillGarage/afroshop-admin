import React, { useState } from "react";
import ProductChanges from "../products-changes";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../redux/action";

const AddNewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const PRODUCT_DATA = useSelector((state) => state.addedNewProducts);
  const randomSku = Math.floor(100000 + Math.random() * 900000);
  const today = new Date()

  const [productInfo, setProductInfo] = useState({
    id: randomSku.toString(),
    productName: "",
    SKU: randomSku.toString(),
    dateAdded: today.toLocaleDateString(),
    salesPrice: "",
    availability: "",
    status: "active",
    category: "",
    description: "",
    discount: "",
    images: [],
  });


  const handleAddFormSubmit = () => {
    dispatch(addProduct(productInfo, PRODUCT_DATA));
    navigate("/products");
  }
  const handleProductInfo = (key, val) => {
    setProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      [key]: val,
    }));
  };

  return (
    <ProductChanges
      name="new"
      productInfo={productInfo}
      handleProductInfo={handleProductInfo}
      handleAddFormSubmit={handleAddFormSubmit}
    />
  );
};

export default AddNewProduct;
