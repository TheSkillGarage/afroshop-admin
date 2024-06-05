import { React, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductChanges from "../products-changes";
import { useDispatch, useSelector } from "react-redux";
import {
  editProductAsDraft,
  handleImageUpload,
  putRequest,
} from "../../redux/action";
import { toast } from "react-toastify";
import { getTokenFromCookie } from "../../utils";

const EditSingleProduct = () => {
  const { sku } = useParams();
  const drafts = useSelector((state) => state.productDrafts);
  const [draftProducts, setDraftProducts] = useState(drafts);
  const token = getTokenFromCookie();
  const productData = useSelector((state) => state.productsData);
  const store = useSelector((state) => state.store);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const product = productData.find((product) => product.SKU === sku);
  const productDraft = draftProducts.find((draft) => draft.SKU === sku);
  const navigate = useNavigate();

  useEffect(() => {
    if (!product) {
      navigate("/404");
    }
  }, [product]);
  
  const initialProductInfo = {
    productCategory:
      (productDraft?.productCategory || product?.productCategory) ===
      "Draft Product"
        ? ""
        : productDraft
        ? productDraft?.productCategory !== product?.productCategory
          ? productDraft.productCategory
          : product?.productCategory
        : product?.productCategory,
    name: productDraft
      ? productDraft?.name !== product?.name
        ? productDraft.name
        : product?.name
      : product?.name,
    availability: productDraft
      ? productDraft?.availability !== product?.availability
        ? productDraft.availability
        : product?.availability
      : product?.availability,
    price: productDraft
      ? productDraft?.price !== product?.price
        ? productDraft.price
        : product?.price
      : product?.price,
    discount: productDraft
      ? productDraft?.discount !== product?.percentDiscount
        ? productDraft.discount
        : product?.percentDiscount
      : product?.percentDiscount,
    description: productDraft
      ? productDraft?.description !== product?.description
        ? productDraft.description
        : product?.description
      : product?.description,
    images: productDraft
      ? productDraft?.images !== product?.images
        ? productDraft.images
        : product?.images
      : product?.images,
    pricingType: productDraft
      ? productDraft?.pricingType !== product?.pricingType
        ? productDraft.pricingType
        : product?.pricingType
      : product?.pricingType,
    taxable: productDraft
      ? productDraft?.taxable !== product?.taxable
        ? productDraft.taxable
        : product?.taxable
      : product?.taxable,
    status: productDraft
      ? productDraft?.status !== product?.status
        ? productDraft.status
        : product?.status
      : product?.status,
    unitWeightInGrams: productDraft
      ? productDraft?.unitWeightInGrams !== product?.unitWeightInGrams
        ? productDraft.unitWeightInGrams
        : product?.unitWeightInGrams
      : product?.unitWeightInGrams ?? 0,
    measurementUnit: productDraft
      ? productDraft?.measurementUnit !== product?.pricingType
        ? productDraft.measurementUnit
        : product?.pricingType
      : "",
  };

  const [productInfo, setProductInfo] = useState(initialProductInfo);

  const handleProductInfo = (key, val) => {
    setProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      [key]: val,
    }));
  };

  const handleEditProduct = async () => {
    setLoading(true);

    const payload = {
      store: store.id,
      description: productInfo.description ?? "",
      price: productInfo.price ?? 0,
      name: productInfo.name ?? 0,
      discount: productInfo.discount ?? 0,
      productCategory: productInfo.productCategory,
      status: productInfo?.status ?? "active", // hardcoded
      availability: productInfo.availability ?? 0,
      // These need to be added to the UI/UX
      taxable: productInfo?.taxable,
      pricingType:
        productInfo?.pricingType === "per Weight"
          ? productInfo?.measurementUnit
          : productInfo?.pricingType,
      unitWeightInGrams: productInfo?.unitWeightInGrams ?? 0,
    };

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
      handleProductDraft(false);
      toast.success("Your product was successfully Edited!");
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
  };

  const handleProductDraft = (showToast = true) => {
    const product = productData.filter((p) => p.SKU === sku);

    product[0].productCategory = productInfo.productCategory;

    if (productInfo.images.length === 0) {
      toast.error("upload an image to save as draft");
    } else {
      const updatedDraftArray =
        draftProducts?.map((d) =>
          d.SKU === sku ? { ...d, ...productInfo } : d
        ) ?? [];

      if (!updatedDraftArray?.some((obj) => obj.SKU === sku)) {
        updatedDraftArray.push({ ...product[0], ...productInfo });
      }

      dispatch(editProductAsDraft(updatedDraftArray));

      if (showToast)
        toast.success("Your product was successfully saved as draft!");
      // window.location.href = "/products";
    }
   
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
    />
  );
};

export default EditSingleProduct;
