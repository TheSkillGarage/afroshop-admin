import React, { useState } from "react";
import ProductChanges from "../products-changes";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addProduct, handleImageUpload, postRequest } from "../../redux/action";
import { getTokenFromCookie } from "../../utils";

const AddProduct = () => {
  const store = useSelector((state) => state.store)
  const token = getTokenFromCookie()

  const [isLoading, setLoading] = useState(false);
  const [saveDraftLoading, setSaveDraftLoading] = useState(false);

  const useProductInfo = {
    category: "",
    productName: "",
    availability: "",
    salesPrice: "",
    discount: "",
    description: "",
    images: [],
    taxable: false,
    unitWeightInGrams: 0
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

  const handleSaveProductAsDraft = async () => {
    setSaveDraftLoading(true)

    const payload = {
      "store": store?.id,
      "description": productInfo?.description,
      "price": productInfo.salesPrice,
      "name": productInfo.productName,
      "discount": productInfo.discount,
      "productCategory": productInfo.category,
      "status": "draft", // hardcoded
      "availability": productInfo.availability,
      // These need to be added to the UI/UX
      "taxable": productInfo?.taxable,
      "pricingType": productInfo?.type === 0 ? "per Item" : productInfo?.pricingType,
      "unitWeightInGrams": productInfo?.unitWeightInGrams
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

      // handle Product Creation
      const [success, responseData] = await postRequest(
        `/api/products`,
        payload,
        token
      );
      if (!success || responseData?.error) {
        throw new Error(responseData?.error?.message);
      }

      toast.success("Your product was successfully saved as draft!");
      navigate("/products");

    } catch (error) {
      toast.error(`An Error occured while uploading this Product. Please try again later.`, {
        autoClose: 2000,
      });
      console.error(error);
    } finally {
      setSaveDraftLoading(false)
    }
  }

  const handleCreateProduct = async (data) => {
    setLoading(true)

    const payload = {
      "store": store.id,
      "description": productInfo.description,
      "price": productInfo.salesPrice,
      "name": productInfo.productName,
      "discount": productInfo.discount,
      "productCategory": productInfo.category,
      "status": "active", // hardcoded
      "availability": productInfo.availability,
      // These need to be added to the UI/UX
      "taxable": productInfo?.taxable,
      "pricingType": productInfo?.type === 0 ? "per Item" : productInfo?.pricingType,
      "unitWeightInGrams": productInfo?.unitWeightInGrams
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

      // handle Product Creation
      const [success, responseData] = await postRequest(
        `/api/products`,
        payload,
        token
      );
      if (!success || responseData?.error) {
        throw new Error(responseData?.error?.message);
      }

      toast.success("Your product was successfully Created!");
      navigate("/products");

    } catch (error) {
      toast.error(`An Error occured while uploading this Product. Please try again later.`, {
        autoClose: 2000,
      });
      console.error(error);
    } finally {
      setLoading(false)
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
      handleProductDraft={handleSaveProductAsDraft}
      isLoading={isLoading}
      isDraftLoading={saveDraftLoading}
    />
  );
};

export default AddProduct;
