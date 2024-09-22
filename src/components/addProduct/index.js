import React, { useEffect, useState } from "react";
import ProductChanges from "../products-changes";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { handleImageUpload, postRequest } from "../../redux/action";
import { getTokenFromCookie } from "../../utils";
import DatabaseModal from "./database-modal";
import RadioButton from "../shared/radioBtn";
import Button from "../shared/button";

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
    description: "",
    images: [],
    taxable: false,
    unitWeightInGrams: 0,
    pricingType: "per Item",
    measurementUnit: "",
    userSKU: ""
  };

  const [productInfo, setProductInfo] = useState(useProductInfo);

  const handleDatabaseInfo = (product) => {
    const databaseProductInfo = {
      ...productInfo,
      ...product,
      discount: product?.percentDiscount,
      pricingType: product?.pricingType !== "per Item" ? "per Weight" : product?.pricingType,
      measurementUnit: product?.pricingType !== "per Item" ? product?.pricingType : "",
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

  useEffect(() => { console.log(productInfo) }, [productInfo])

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
      SKU: productInfo?.userSKU ?? "",
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
      SKU: productInfo?.userSKU ?? "",
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
        handleDatabaseInfo={handleDatabaseInfo}
      />
      <div className="bg-white px-6 pt-[40px] flex flex-col gap-[24px] mx-[12px]">
        <div className="flex px-[24px] gap-[12px]">
          <div className="flex gap-3">
            <RadioButton
              name="manual"
              id="manual"
              checked={productType === "manual"}
              handleChange={() => { setProductType("manual"); }}
            />
            <label for="manual">Manual Entry</label>
          </div>

          <div className="flex gap-3">
            <RadioButton
              name="database"
              id="database"
              checked={productType === "database"}
              handleChange={() => { setProductType("database"); }}
            />
            <label for="database">Database Entry</label>
          </div>
        </div>

        {productType === "database" &&
          <div className="px-[24px]">
            <Button type="button" variant="tertiary" outline="green" icon="add" direction="reverse" onClick={() => setOpenModal(true)}>Add Product</Button>
          </div>
        }

        <ProductChanges
          store={store}
          productInfo={productInfo}
          setProductInfo={setProductInfo}
          initialProductInfo={useProductInfo}
          handleProductInfo={handleProductInfo}
          handleFormSubmit={handleCreateProduct}
          handleProductDraft={handleSaveProductAsDraft}
          isLoading={isLoading}
          isDraftLoading={saveDraftLoading}
        />
      </div>
    </>
  );
};

export default AddProduct;
