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
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.productsData);
  const store = useSelector((state) => state.store);
  const [isLoading, setLoading] = useState(false);

  const product = productData.find((product) => product.SKU === sku);
  const productDraft = draftProducts.find((draft) => draft.SKU === sku);

  const pricingType = productDraft
  ? productDraft?.type !== product?.pricingType
    ? productDraft.type
    : product?.pricingType
  : product?.type
  console.log(product, productDraft)

  const navigate = useNavigate();

  useEffect(() => {
    if (!product) {
      navigate("/404");
    }
  }, [product]);

  const initialProductInfo = {
    category: productDraft
      ? productDraft?.productCategory !== product?.productCategory
        ? productDraft.productCategory
        : product?.productCategory
      : product?.productCategory,
    productName: productDraft
      ? productDraft?.productName !== product?.name
        ? productDraft.productName
        : product?.name
      : product?.name,
    availability: productDraft
      ? productDraft?.availability !== product?.availability
        ? productDraft.availability
        : product?.availability
      : product?.availability,
    salesPrice: productDraft
      ? productDraft?.salesPrice !== product?.price
        ? productDraft.salesPrice
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
    type: (pricingType === "per Item" ? 0 : 1) ?? 0,
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
  };
  console.log(initialProductInfo);

  const [isDraft, setIsDraft] = useState(false);
  const [productInfo, setProductInfo] = useState(initialProductInfo);

  const handleProductInfo = (key, val) => {
    setProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      [key]: val,
    }));
  };

  const handleEditProduct = async (data) => {
    setLoading(true);

    const payload = {
      store: store.id,
      description: productInfo.description,
      price: productInfo.salesPrice,
      name: productInfo.productName,
      discount: productInfo.discount,
      productCategory: productInfo.category,
      status: "active", // hardcoded
      availability: productInfo.availability,
      // These need to be added to the UI/UX
      taxable: true,
      pricingType: "per Item",
      unitWeightInGrams: 5,
    };

    try {
      // upload images first
      payload.images = productInfo?.images
        ?.filter((image) => image.id)
        .map((i) => i.id);
      const unuploadedImages = productInfo?.images
        ?.filter((image) => !image.id)
        .map((i) => i.data);

      if (unuploadedImages?.length >= 0) {
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

  const handleProductDraft = () => {
    const product = productData.filter((p) => p.SKU === sku);
    setDraftProducts((prev) => {
      const updatedDraftArray =
        prev?.map((d) => (d.SKU === sku ? { ...d, ...productInfo } : d)) ?? [];

      if (!updatedDraftArray?.some((obj) => obj.SKU === sku)) {
        updatedDraftArray.push({ ...product[0], ...productInfo });
      }
      dispatch(editProductAsDraft(updatedDraftArray));
      return updatedDraftArray;
    });
    toast.success("Your product was successfully saved as draft!");
    // navigate("/products");
  };

  if (!product) {
    return null;
  }

  return (
    <ProductChanges
      isEdit={true}
      isDraft={isDraft}
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
