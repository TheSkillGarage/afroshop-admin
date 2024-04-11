import React from "react";
import { EmptyProductsImage } from "../../images";
import Button from "../shared/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const EmptyProducts = () => {
    const navigate = useNavigate()
    const storeData = useSelector(state => state.storeData)
    return (
        <div className="min-h-screen flex justify-center items-center">

            <div className="h-[40%] w-full flex flex-col items-center text-center">
                <img src={EmptyProductsImage} alt="empty-product" className="w-[327px] h-[218px]" />

                {
                    storeData === null ?
                        <div className='flex flex-col gap-0 text-base leading-6 text-[#333333] w-[490px] text-center my-6'>
                            <p >Products will be listed here as you add them to your store.</p>
                            <p >Complete your store registration by adding details about your store.</p>
                            <br/>
                            <p> Click the button below to complete your Store Registration.</p>
                        </div>
                        :
                        <>
                            <p className="text-[20px] leading-[32px] text-[#186F3D] font-bold my-6">No products added</p>
                            <p className="text-[#333333] w-[491px]">It looks like you haven't added any products yet.</p>
                            <p className="text-[#333333] w-[491px]">Let's get started by adding your first product. Click the button below to begin.</p>
                        </>
                }

                <div className="mt-8 w-[216px]">
                    <Button
                        className="h-[40px] w-full"
                        onClick={() => storeData !== null ? navigate("/products/new") : navigate("/profile")}
                    >
                        {storeData !== null ? "Add New Product" : "Add My Store"}
                    </Button>
                </div>
            </div>


        </div>

    )
}

export default EmptyProducts;