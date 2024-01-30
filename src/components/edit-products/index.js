import { React } from "react";
import { useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import PRODUCT_DATA from "../../data/products";
import ProductChanges from "../products-changes";



const EditSingleProduct = () => {

  const { sku } = useParams();

  const product = PRODUCT_DATA.find((product) => product.SKU === sku);
  
  
  const productInfo = {
    category: product.category,
    name: product.productName,
    availability: product.availability,
    price: product.salesPrice,
    discount: product.discount,
    description: product.description,
    images: product.images
  }

  return (
    <ProductChanges 
    name="edit" 
    productInfo={productInfo}
    />
  );
};

export default EditSingleProduct;
