import React, { useState } from "react";
import ProductChanges from "../products-changes";


const AddProduct = () => {

    const [productInfo, setProductInfo] = useState({
        category: "",
        productName: "",
        availabilty: "",
        salesPrice: "",
        discount: "",
        description: "",
        images: []
    });


    return (
        <ProductChanges
            isEdit={false}
            initialProductInfo={productInfo}
            setInitialProductInfo={setProductInfo}
            drafted={false}
        />
    )
}

export default AddProduct;