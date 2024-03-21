import React from "react";
import { EmptyProductsImage } from "../../images";
import Button from "../shared/button";
import { useNavigate } from "react-router-dom";

const EmptyProducts = () => {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen flex justify-center items-center">

            <div className="h-[40%] w-full flex flex-col items-center text-center">
                <img src={EmptyProductsImage} alt="empty-product" className="w-[327px] h-[218px]" />

                <p className="text-[20px] leading-[32px] text-[#186F3D] font-bold my-6">No products added</p>

                <p className="text-[#333333] w-[491px]">It looks like you haven't added any products yet.</p>
                <p className="text-[#333333] w-[491px]">Let's get started by adding your first product. Click the button below to begin.</p>

                <div className="mt-8 w-[216px]">
                    <Button className="h-[40px] w-full" onClick={() => navigate("/products/new")}>Add New Product</Button>
                </div>
            </div>


        </div>

    )
}

export default EmptyProducts;