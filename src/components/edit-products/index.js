import { React, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductChanges from "../products-changes";
import { useDispatch, useSelector } from "react-redux";
import { deleteDraftProductInfo, draftProductInfo, editProduct } from "../../redux/action";



const EditSingleProduct = () => {

  const { sku } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleEditFormSubmit = () => {
    dispatch(editProduct({sku: sku, productInfos: productInfo}));
    dispatch(deleteDraftProductInfo({sku: sku}))
    navigate("/products");
  }

  const handleProductDraft = () => {
    dispatch(draftProductInfo({sku: sku, productInfo: productInfo}))
    navigate("/products");
  }


  const handleProductInfo = (key, val) => {
    setProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      [key]: val,
    }))
  }
  

  return (
    <ProductChanges
      name="edit"
      productInfo={productInfo}
      drafted={isDraft}
      handleProductInfo={handleProductInfo}
      handleFormSubmit={handleEditFormSubmit}
      handleProductDraft={handleProductDraft}
    />
  );
};

export default EditSingleProduct;
