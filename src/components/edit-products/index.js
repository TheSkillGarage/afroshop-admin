import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductChanges from "../products-changes";
import { useSelector } from "react-redux";


const EditSingleProduct = () => {

  const { sku } = useParams();

  const [isDraft, setIsDraft] = useState(false);
  const [productInfo, setProductInfo] = useState({
    category: "",
    productName: "",
    availabilty: "",
    salesPrice: "",
    discount: "",
    description: "",
    images: []
  })

const productData = useSelector((state) => state.productsData);

const product = productData.find((product) => product.SKU === sku);
const useProductInfo = {
    category: product.category,
    productName: product.productName,
    availabilty: product.availabilty,
    salesPrice: product.salesPrice,
    discount: product.discount,
    description: product.description,
    images: product.images
  }

  const draftedProduct = useSelector((state) => state.draftProductInfo);

  useEffect(() => {
    const isEditDrafted = draftedProduct.find((product) => product.sku === sku);

    if (isEditDrafted){
      setProductInfo(isEditDrafted);
      setIsDraft(true);
    }else{
      setProductInfo(useProductInfo);
      setIsDraft(false);
    }
  }, [])


  return (
    <ProductChanges
      isEdit={true}
      initialProductInfo={productInfo}
      drafted={isDraft}
      param={sku}
    />
  );
};

export default EditSingleProduct;
