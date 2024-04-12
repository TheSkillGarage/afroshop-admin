import { React, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductChanges from "../products-changes";
import { useDispatch, useSelector } from "react-redux";
import { discardDraft, editProduct } from "../../redux/action";


const EditSingleProduct = () => {

  const { sku } = useParams();


  const productData = useSelector((state) => state.productsData);

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

  const handleFormSubmit = () => {
    dispatch(editProduct({ sku: sku, productInfos: productInfo, option: "save" }));

    navigate("/products");
  }

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
      handleFormSubmit={handleFormSubmit}
      handleProductDraft={handleProductDraft}
    />
  );
};

export default EditSingleProduct;
