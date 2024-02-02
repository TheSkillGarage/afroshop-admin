import { React, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import ProductChanges from "../products-changes";
import { useDispatch, useSelector } from "react-redux";
import { editProduct } from "../../redux/action";



const EditSingleProduct = () => {

  const { sku } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productData = useSelector((state) => state.productsData);
  const product = productData.find((product) => product.SKU === sku);
  
  const [productInfo, setProductInfo] = useState({
    category: product.category,
    productName: product.productName,
    availabilty: product.availabilty,
    salesPrice: product.salesPrice,
    discount: product.discount,
    description: product.description,
    images: product.images
  })


  const handleEditFormSubmit = () => {
    dispatch(editProduct({sku: sku, productInfos: productInfo}));
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
      handleProductInfo={handleProductInfo}
      handleFormSubmit={handleEditFormSubmit}
    />
  );
};

export default EditSingleProduct;
