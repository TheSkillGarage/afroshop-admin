import { React, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import ProductChanges from "../products-changes";
import { useDispatch, useSelector } from "react-redux";
import { editProduct } from "../../redux/action";



const EditSingleProduct = () => {

  const { sku } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const PRODUCT_DATA = useSelector((state) => state.productsData);
  const product = PRODUCT_DATA.find((product) => product.SKU === sku);
  
  const [productInfo, setProductInfo] = useState({
    category: product.category,
    name: product.productName,
    availabilty: product.availabilty,
    price: product.salesPrice,
    discount: product.discount,
    description: product.description,
    images: product.images
  })


  const handleEditFormSubmit = () => {
    dispatch(editProduct(sku, productInfo, PRODUCT_DATA));
    navigate("/products");
  }


  const handleProductInfo = (key, val) => {
    setProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      [key]: val,
    }))

  }
  
  useEffect(() => {
    console.log("product info: ", productInfo)
  }, [productInfo])

  return (
    <ProductChanges
      name="edit"
      productInfo={productInfo}
      handleProductInfo={handleProductInfo}
      handleEditFormSubmit={handleEditFormSubmit}
    />
  );
};

export default EditSingleProduct;
