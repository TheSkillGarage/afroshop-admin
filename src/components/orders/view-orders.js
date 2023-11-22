import React from "react";
import AdminNavbar from "../navbar";
import { FilterIcon, GreenRightArrow, SearchIcon } from "../../images";
import StatusPills from "../status-pills";
import { useParams } from "react-router-dom";
import ORDERS_DATA from "../../data/orders";

const ViewOrders = () => {

    const { orderID } = useParams()

    const order = ORDERS_DATA.find((order) => order.orderID === orderID);

    return (
        <div>
            <AdminNavbar name={"viewOrders"}/>

            <div className="bg-[#F2F2F2] w-full py-6 px-4">

                <div className="flex items-center gap-8 mb-6">
                    <p className="text-[rgba(48,48,48,0.4)] font-medium text-[14px] leading-[16.8px] -tracking[16%] font-['Lato']">...</p>
                    <p className="text-[13px] leading-[23px] text-[#999999]">Orders</p>
                    <GreenRightArrow alt="" />
                    <p className="text-[13px] leading-[23px] text-[#186F3D]">View Orders</p>
                </div>

                <div className="bg-[#ffffff] px-8 pt-12 pb-8">

                   <div className="px-8">
                   <div className="flex gap-4">
                        <div className="w-1/2 border border-1 border-[#E6E6E6] p-4 rounded">
                            <p className="font-semibold test-[16px] leading-[24px] uppercase text-[#186F3D] mb-4">order info</p>

                            <div className="flex">
                                <div className="text-[13px] leading-[23px] text-[#333333] w-[30%]">
                                    <p>Order ID:</p>
                                    <p>Order Date:</p>
                                    <p>Item No:</p>
                                    <p>Total Price ($):</p>
                                </div>

                                <div className="text-[13px] leading-[23px] text-[#7F7F7F] w-[70%]">
                                    <p>{order.orderID}</p>
                                    <p>{order.orderDate}</p>
                                    <p>{order.items}</p>
                                    <p>{order.price.price}</p>
                                </div>
                            </div>
                        </div>

                        <div className="w-1/2 border border-1 border-[#E6E6E6] p-4 rounded">
                            <p className="font-semibold test-[16px] leading-[24px] uppercase text-[#186F3D] mb-4">shopper info</p>

                            <div className="flex">
                                <div className="text-[13px] leading-[23px] text-[#333333] w-[30%]">
                                    <p>Name:</p>
                                    <p>Delivery Address:</p>
                                    <p>Phone:</p>
                                    <p>Email:</p>
                                </div>

                                <div className="text-[13px] leading-[23px] text-[#7F7F7F] w-[70%]">
                                    <p>Justin James A.</p>
                                    <p>471 East Beaver Creek Rd, ON L4B 1M7, Ontario, Canada</p>
                                    <p> +125 000 2892</p>
                                    <p>jjames@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="mt-6 flex justify-between items-center px-4 py-8">
                        <div className="w-[514px] relative">
                            <SearchIcon className="absolute top-[10px] left-[18px] " />
                            <input type="text" placeholder="Text" className="bg-[#F2F2F2] w-full h-[45px] rounded-[30px] text-[#999999] px-12" />
                        </div>

                        <div className="w-[108px] h-[44px] rounded border border-[0.5px] flex items-center justify-center gap-2">
                            <p className="text-[16px] leading-[24px] text-[#333333]">Filter</p>
                            <FilterIcon />
                        </div>
                    </div>

                    {/**************************************************************** * table section ***************************************************************/}

                    <div className="w-full">
                        <table className="w-full border-collapse">
                            <thead className="text-left bg-[#F2F2F2] h-[56px] font-semibold text-[13px] leading-[23px] text-[#186F3D] uppercase">
                                <tr>
                                    <th className="w-[4.3%]"></th>
                                    <th className="w-[17.5%]">items</th>
                                    <th className="w-[17.5%]">id</th>
                                    <th className="w-[17.5%]">price ($)</th>
                                    <th className="w-[17.5%]">status</th>
                                    <th className="w-[4.3%]"></th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    order.order.map(({name, productID, price, status}, key) => {
                                        return (
                                            <tr key={key} className="border-b border-1 border-[#E6E6E6] text-[13px] leading-[23px] text-[#333333]">
                                                <td className="py-2 pr-8"></td>
                                                <td className="py-2 pr-8" >{name}</td>
                                                <td className="py-2 pr-8">{productID}</td>
                                                <td className="py-2 pr-8">{price}</td>
                                                <td className="py-4 pr-8 capitalize">
                                                    <StatusPills status={status} />
                                                </td>
                                                <td className="py-2 pr-8"></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                   </div>

                    <div className="flex justify-end gap-6 mt-24">
                        <button className="h-[40px] rounded bg-[rgba(252,174,23,0.15)] w-[133px] text-[16px] leading-[24px] text-[#333333]">Cancel</button>
                        <button className="h-[40px] rounded bg-[#186F3D] w-[136px] text-[16px] leading-[24px] text-[#FFFFFF]">Submit</button>
                    </div>
                </div>

            </div>
        </div>
    )
}


export default ViewOrders;