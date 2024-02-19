import { React, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductChanges from "../products-changes";
import { useDispatch, useSelector } from "react-redux";
import { discardDraft, editProduct } from "../../redux/action";


const EditSingleProduct = () => {

  const { sku } = useParams();

  
  const productData = useSelector((state) => state.productsData);

  const product = productData.find((product) => product.SKU === sku);

  const initialProductInfo = {
    category: product.category,
    productName: product.productName,
    availabilty: product.availabilty,
    salesPrice: product.salesPrice,
    discount: product.discount,
    description: product.description,
    images: product.images
  }

  const [isDraft, setIsDraft] = useState(false);
  const [productInfo, setProductInfo] = useState(initialProductInfo);

  useEffect(() => {
    if (Object.keys(product.draft).length > 0) {
      setIsDraft(true);
      setProductInfo(product.draft);
    }
  }, [])

  const navigate = useNavigate();

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
    }else if (option === "discard"){
      dispatch(discardDraft({sku: sku}))
    }

    navigate("/products");
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
