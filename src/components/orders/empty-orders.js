import React from "react";
import { OrdersCart } from "../../images";

const EmptyOrders = () => {
    return (
        <div className="min-h-screen flex justify-center items-center">
            
                <div className="h-[40%] w-full flex flex-col items-center text-center">
                    <img src={OrdersCart} alt="orders-cart" className="w-[312px] h-[208px]" />

                    <p className="text-[20px] leading-[32px] text-[#186F3D] font-bold my-6">No orders yet</p>

                    <p className="text-[#333333] w-[491px]">You currently do not have any order(s).</p>
                    <p className="text-[#333333] w-[491px]">Orders will be listed here as soon as customers begin placing their requests for items.</p>
                </div>
            </div>
    
    )
}

export default EmptyOrders;