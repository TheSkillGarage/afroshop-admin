import React, { useState } from "react";
import ProductChanges from "../products-changes";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addProduct, handleImageUpload, postRequest } from "../../redux/action";
import { getTokenFromCookie } from "../../utils";
import DatabaseModal from "./database-modal";

const AddProduct = () => {
  const store = useSelector((state) => state.store);
  const token = getTokenFromCookie();

  const [isLoading, setLoading] = useState(false);
  const [saveDraftLoading, setSaveDraftLoading] = useState(false);

  const [productType, setProductType] = useState("manual");

  const useProductInfo = {
    productCategory: "",
    category: "",
    name: "",
    availability: "0",
    price: 0,
    discount: 0,
    description: "",
    images: [],
    taxable: false,
    unitWeightInGrams: 0,
    pricingType: "per Item",
    measurementUnit: "",
  };

  const [productInfo, setProductInfo] = useState(useProductInfo);

  const productsDatabase = useSelector((state) => state.productsDatabase);
  const firstProductName = productsDatabase?.[0]?.name || "";
  const productOne = productsDatabase?.find((product) => product.name === firstProductName);

  const [databaseInfo, setDatabaseInfo] = useState({
    productCategory: productOne?.productCategory,
    name: productOne?.name,
    availability: productOne?.itemDetail,
    discount: productOne?.percentDiscount,
    description: productOne?.description,
    images: productOne?.images,
    pricingType: productOne?.pricingType,
    taxable: productOne?.taxable,
    unitWeightInGrams: productOne?.unitWeightInGrams,
  });


  const handleDatabaseInfo = (product) => {

    const databaseProductInfo = {
      productCategory: product?.productCategory,
      name: product?.name,
      availability: product?.itemDetail,
      discount: product?.percentDiscount,
      description: product?.description,
      images: product?.images,
      pricingType: product?.pricingType,
      taxable: product?.taxable,
      unitWeightInGrams: product?.unitWeightInGrams,
    };
    setDatabaseInfo(databaseProductInfo)
  }

  const handleSetDatabaseInfo = (key, val) => {
    setDatabaseInfo((prevDatabaseInfo) => ({
      ...prevDatabaseInfo,
      [key]: val,
    }));
  }

  const submittedImages = productType !== "manual" ? databaseInfo.images : productInfo.images

  const navigate = useNavigate();

  const handleProductInfo = (key, val) => {
    setProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      [key]: val,
    }));
  };

  const submitForm = async (payload, imagesToBeUploaded, setLoading, message) => {
    try {
      // upload images first
      const images = imagesToBeUploaded?.map((i) => i.data);

      if (images?.length === 0 && productType === "manual") {
        toast.error("Add an image to save as draft!", { autoClose: 1000 });
      } else {
        const [imageUpSuccess, response] = await handleImageUpload(
          images,
          "products"
        );
        if (!imageUpSuccess || response?.error) {
          throw new Error(response?.error.message);
        } else {
          payload.images = response;
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

        toast.success(message);
        navigate("/products");
      }
    } catch (error) {
      toast.error(
        `An Error occured while uploading this Product. Please try again later.`,
        {
          autoClose: 2000,
        }
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProductAsDraft = async () => {
    setSaveDraftLoading(true);
    const payload = {
      store: store?.id,
      description: productInfo?.description ?? "",
      price: productInfo?.price ?? 0,
      name: productInfo.name ?? "",
      discount: productInfo.discount ?? 0,
      productCategory:
        productInfo?.productCategory === ""
          ? "Draft Product"
          : productInfo.productCategory === "Others"
            ? productInfo?.category
            : productInfo?.productCategory,
      status: "draft",
      availability: productInfo.availability ?? 0,
      taxable: productInfo?.taxable ?? false,
      pricingType:
        productInfo?.pricingType === "per Weight"
          ? productInfo?.measurementUnit
          : productInfo?.pricingType,
      unitWeightInGrams: productInfo?.unitWeightInGrams,
      itemDetail: 0,
    };

    await submitForm(payload, submittedImages, setSaveDraftLoading, "Your product was successfully saved as draft!");
  };

  const handleCreateProduct = async () => {
    setLoading(true);

    const payload = {
      store: store.id,
      description: productInfo.description,
      price: productInfo?.price,
      name: productInfo.name,
      discount: productInfo.discount,
      productCategory:
        productInfo.productCategory === "Others"
          ? productInfo?.category
          : productInfo?.productCategory,
      status: "active",
      availability: productInfo.availability,
      taxable: productInfo?.taxable,
      pricingType:
        productInfo?.pricingType === "per Weight"
          ? productInfo?.measurementUnit
          : productInfo?.pricingType,
      unitWeightInGrams: productInfo?.unitWeightInGrams,
    };

    await submitForm(payload, submittedImages, setLoading, "Your product was successfully created!");
  };

  return (
    <>
      <DatabaseModal />
      <ProductChanges
        isEdit={false}
        productType={productType}
        setProductType={setProductType}
        databaseInfo={databaseInfo}
        setDatabaseInfo={setDatabaseInfo}
        handleDatabaseInfo={handleDatabaseInfo}
        handleSetDatabaseInfo={handleSetDatabaseInfo}
        productInfo={productInfo}
        initialProductInfo={useProductInfo}
        handleProductInfo={handleProductInfo}
        handleFormSubmit={handleCreateProduct}
        handleProductDraft={handleSaveProductAsDraft}
        isLoading={isLoading}
        isDraftLoading={saveDraftLoading}
      />
    </>
  );
};

export default AddProduct;
