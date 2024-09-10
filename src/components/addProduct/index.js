import React, { useEffect, useState } from "react";
import ProductChanges from "../products-changes";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getProductsDatabase, handleImageUpload, postRequest } from "../../redux/action";
import { getTokenFromCookie } from "../../utils";
import DatabaseModal from "./database-modal";

const AddProduct = () => {
  const store = useSelector((state) => (state.stores && state.stores.length > 0) ? state.stores[state.storeID] : {});
  const token = getTokenFromCookie();

  const [isLoading, setLoading] = useState(false);
  const [saveDraftLoading, setSaveDraftLoading] = useState(false);

  const [productType, setProductType] = useState("manual");
  const [openModal, setOpenModal] = useState(false);

  const useProductInfo = {
    productCategory: "",
    category: "",
    name: "",
    availability: "",
    price: 0,
    discount: 0,
    description: "",
    images: [],
    taxable: false,
    unitWeightInGrams: 0,
    pricingType: "per Item",
    measurementUnit: "",
  };

  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getProductsDatabase(token));
  }, []);

  const [productInfo, setProductInfo] = useState(useProductInfo);

  const handleDatabaseInfo = (product) => {
    const databaseProductInfo = {
      productCategory: product?.productCategory,
      name: product?.name,
      price: "",
      discount: product?.percentDiscount,
      description: product?.description,
      images: product?.images,
      pricingType: product?.pricingType,
      taxable: product?.taxable,
      unitWeightInGrams: product?.unitWeightInGrams,
    };
    setProductInfo(databaseProductInfo);
  }

  const submittedImages = productInfo.images
  const navigate = useNavigate();

  const handleProductInfo = (key, val) => {
    setProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      [key]: val,
    }));
  };

  const submitForm = async (payload, images, setLoading, message) => {
    try {
 
      if (images?.length === 0) {
        toast.error("Add an image to save as draft!", { autoClose: 1000 });
      } else {

        payload.images = images
          ?.filter((image) => image.id)
          .map((i) => i.id);
        const unuploadedImages = images
          ?.filter((image) => !image.id)
          .map((i) => i.data);

        if (unuploadedImages.length > 0) {
          const [imageUpSuccess, response] = await handleImageUpload(
            unuploadedImages,
            "products"
          );
          if (!imageUpSuccess || response?.error) {
            throw new Error(response?.error.message);
          } else {
            payload.images = [...payload.images, ...response];
          }
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
      store: store?.id,
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
      <DatabaseModal
        openModal={openModal}
        closeModal={setOpenModal}
        handleDatabaseInfo={handleDatabaseInfo} />

      <ProductChanges
        setOpenModal={setOpenModal}
        isEdit={false}
        productType={productType}
        setProductType={setProductType}
        handleDatabaseInfo={handleDatabaseInfo}
        productInfo={productInfo}
        setProductInfo={setProductInfo}
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
