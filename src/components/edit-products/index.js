import { React, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductChanges from "../products-changes";
import { useDispatch, useSelector } from "react-redux";
import { discardDraft, editProduct, handleImageUpload, putRequest } from "../../redux/action";
import { toast } from "react-toastify";
import { getTokenFromCookie } from "../../utils";


const EditSingleProduct = () => {

  const { sku } = useParams();
  const token = getTokenFromCookie();

  const productData = useSelector((state) => state.productsData);
  const store = useSelector((state) => state.storeData)
  const [isLoading, setLoading] = useState(false);

  const product = productData.find((product) => product.SKU == sku);

  const navigate = useNavigate();

  useEffect(() => {
    if (!product) {
      navigate("/404");
    }
  }, [product])


  const initialProductInfo = {
    category: product?.productCategory,
    productName: product?.name,
    availabilty: product?.availability,
    salesPrice: product?.price,
    discount: product?.percentDiscount,
    description: product?.description,
    images: product?.images
  }

  const [isDraft, setIsDraft] = useState(false);
  const [productInfo, setProductInfo] = useState(initialProductInfo);

  // useEffect(() => {
  //   if (Object.keys(product.draft).length > 0) {
  //     setIsDraft(true);
  //     setProductInfo(product.draft);
  //   }
  // }, [])


  const dispatch = useDispatch();

  const handleProductInfo = (key, val) => {
    setProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      [key]: val,
    }))
  }


  const handleEditProduct = async (data) => {
    setLoading(true)
    
    const payload = {
      "store": store.id,
      "description": productInfo.description,
      "price": productInfo.salesPrice,
      "name": productInfo.productName,
      "discount": productInfo.discount,
      "productCategory": productInfo.category,
      "status": "active", // hardcoded
      "availability": productInfo.availabilty,
      // These need to be added to the UI/UX
      "taxable": true,
      "pricingType": "per Item",
      "unitWeightInGrams": 5
    }

    try {
      // upload images first
      payload.images = productInfo?.images?.filter((image) => image.id).map((i) => (i.id));
      const unuploadedImages = productInfo?.images?.filter((image) => !image.id).map((i) => (i.data));

      if (unuploadedImages?.length >= 0) {
        const [imageUpSuccess, response] = await handleImageUpload(unuploadedImages, 'products')
        if (!imageUpSuccess || response?.error) {
          throw new Error(response?.error.message)
        }
        payload.images = [...payload.images, ...response]
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
      toast.error(`An Error occured while uploading this Product. Please try again later.`, {
        autoClose: 2000,
      });
      console.error(error);
    } finally {
      setLoading(false)
    }
  };

  const handleProductDraft = (option) => {
    if (option === "draft") {
      dispatch(editProduct({ sku: sku, productInfos: productInfo, option: "draft" }));
    } else if (option === "discard") {
      dispatch(discardDraft({ sku: sku }))
    }

    navigate("/products");
  }

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
