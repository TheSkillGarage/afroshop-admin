import { React, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductChanges from "../products-changes";
import { useSelector } from "react-redux";
import {
  handleImageUpload,
  putRequest,
} from "../../redux/action";
import { toast } from "react-toastify";
import { getTokenFromCookie } from "../../utils";

const EditSingleProduct = () => {
  const { sku } = useParams();
  const token = getTokenFromCookie();
  const productData = useSelector((state) => state.productsData);
  const store = useSelector((state) => (state.stores && state.stores.length > 0) ? state.stores[state.storeID] : {});
  const [isLoading, setLoading] = useState(false);
  const [draftLoading, setDraftLoading] = useState(false);
  const product = productData.find((product) => product.SKU === sku);
  const navigate = useNavigate();
  const productPricingType = product?.pricingType;

  useEffect(() => {
    if (!product) {
      navigate("/404");
    }
  }, [product]);

  const initialProductInfo = {
    productCategory:
      product?.productCategory === "Draft Product"
        ? ""
        : product?.productCategory,
    name: product?.name,
    availability: product?.availability,
    price: product?.price,
    discount: product?.percentDiscount,
    description: product?.description,
    images: product?.images,
    pricingType:
      productPricingType !== "per Item" ? "per Weight" : productPricingType,
    taxable: product?.taxable,
    status: product?.status,
    unitWeightInGrams: product?.unitWeightInGrams,
    measurementUnit:  productPricingType !== "per Item" ? productPricingType : "",
  };

  const [productInfo, setProductInfo] = useState(initialProductInfo);

  const handleProductInfo = (key, val) => {
    setProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      [key]: val,
    }));
  };

  const submitForm = async (payload, setLoading, message) => {
    try {
      // upload images first
      payload.images = productInfo?.images
        ?.filter((image) => image.id)
        .map((i) => i.id);
      const unuploadedImages = productInfo?.images
        ?.filter((image) => !image.id)
        .map((i) => i.data);

      if (unuploadedImages?.length > 0) {
        const [imageUpSuccess, response] = await handleImageUpload(
          unuploadedImages,
          "products"
        );
        if (!imageUpSuccess || response?.error) {
          throw new Error(response?.error.message);
        }
        payload.images = [...payload.images, ...response];
      }

      // handle Product Update
      const [success, responseData] = await putRequest(
        `/api/products/${product.id}`,
        payload,
        token
      );
      if (!success || responseData?.error) {
        throw new Error(responseData?.error?.message);
      }
      toast.success(message);
      navigate("/products");
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
  }

  const handleEditProduct = async () => {
    setLoading(true);

    const payload = {
      store: store.id,
      description: productInfo.description ?? "",
      price: productInfo.price ?? 0,
      name: productInfo.name ?? 0,
      discount: productInfo.discount ?? 0,
      productCategory:
        productInfo.productCategory === "Others"
          ? productInfo?.category
          : productInfo?.productCategory,
      status: "active",
      availability: productInfo.availability ?? 0,
      taxable: productInfo?.taxable,
      pricingType:
        productInfo?.pricingType === "per Weight"
          ? productInfo?.measurementUnit
          : productInfo?.pricingType,
      unitWeightInGrams: productInfo?.unitWeightInGrams ?? 0,
    };

    await submitForm(payload, setLoading, "Your product was successfully edited!");
  };

  const handleProductDraft = async () => {
    setDraftLoading(true);

    const payload = {
      store: store.id,
      description: productInfo.description ?? "",
      price: productInfo.price ?? 0,
      name: productInfo.name ?? 0,
      discount: productInfo.discount ?? 0,
      productCategory:
        productInfo.productCategory === "Others"
          ? productInfo?.category
          : productInfo?.productCategory,
      status: "draft",
      availability: productInfo.availability ?? 0,
      taxable: productInfo?.taxable,
      pricingType:
        productInfo?.pricingType === "per Weight"
          ? productInfo?.measurementUnit
          : productInfo?.pricingType,
      unitWeightInGrams: productInfo?.unitWeightInGrams ?? 0,
    };

    await submitForm(payload, setDraftLoading, "Your product was successfully edited as draft!");
  };
  return (
    <ProductChanges
      isEdit={true}
      productInfo={productInfo}
      initialProductInfo={initialProductInfo}
      handleProductInfo={handleProductInfo}
      handleFormSubmit={handleEditProduct}
      handleProductDraft={handleProductDraft}
      isLoading={isLoading}
      isDraftLoading={draftLoading}
      product={product}
    />
  );
};

export default EditSingleProduct;
