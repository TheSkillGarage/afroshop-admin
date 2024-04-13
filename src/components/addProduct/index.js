import React, { useState } from "react";
import ProductChanges from "../products-changes";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addProduct, handleImageUpload, postRequest } from "../../redux/action";
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
    const payload = {
      "store": store.id,
      "images": [5, 2, 1],
      "description": productInfo.description,
      "price": productInfo.salesPrice,
      "name": productInfo.productName,
      "discount": productInfo.discount,
      "productCategory": productInfo.category,
      "status": productInfo.status,
      "availability": productInfo.availabilty,
      // These need to be added to the UI/UX
      "taxable": true,
      "pricingType": "per Item",
      "unitWeightInGrams": 5
    }

    try {
      // upload images first
      const images = productInfo?.images?.map((i) => (i.data));

      if (images?.length === 0) {
        throw new Error('Add an Image to upload!')
      }

      const [imageUpSuccess, response] = await handleImageUpload(images, 'products')
      if (!imageUpSuccess || response?.error) {
        throw new Error(response?.error.message)
      } else {
        payload.images = response
      }

      console.log(payload)
      // handle Product Creation
      const [success, responseData] = await postRequest(
        `/api/products`,
        payload,
        token
      );
      if (!success || responseData?.error) {
        throw new Error(responseData?.error?.message);
      } else {
        console.log("Product info", responseData)
      }
      toast.success("Your product was successfull Created!");
      navigate("/products");
      
    } catch (error) {
      toast.error(`An Error occured while uploading this Product. Please try again later.`, {
        autoClose: 2000,
      });
      console.error(error);
    }
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
