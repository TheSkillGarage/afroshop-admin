import React, { useState } from "react";
import AdminNavbar from "../navbar";
import { GreenRightArrow } from "../../images";
import StatusPills from "../status-pills";
import { useNavigate, useParams } from "react-router-dom";
import ORDERS_DATA from "../../data/orders";
import useFilter from "../../hooks/useFilter";
import Search from "../search";
import Button from "../shared/button";
import { useSelector } from "react-redux";

const ViewOrders = () => {

    const { orderID } = useParams();

    const navigate = useNavigate();

    const orderData = useSelector((state) => state.ordersData);

    const order = orderData.find((order) => order.orderID === orderID);
   
    const date = new Date(order.createdAt)


    const [searchTerm, setSearchTerm] = useState('');
    const [filterObject, setFilterObject] = useState({});

    const handleSearch = (searchWord) => setSearchTerm(searchWord)
    const handleFilterObject = (filterObject) => setFilterObject(filterObject)


    // using custom  hooks
    const data = useFilter("products", "all", order["products"], searchTerm, filterObject).filteredData;

    return (
        <div>
            <AdminNavbar name={"viewOrders"} />

            <div className="bg-[#F2F2F2] w-full py-6 px-4">

                <div className="flex items-center gap-8 mb-6">
                    <p className="text-[rgba(48,48,48,0.4)] font-medium text-[14px] leading-[16.8px] -tracking[16%] font-['Lato']">...</p>
                    <p className="text-[13px] leading-[23px] text-[#999999] cursor-pointer" onClick={() => navigate("/orders")}>Orders</p>
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
                                        <p>{date. date.toLocaleDateString('en-CA')}</p>
                                        <p>{order.products.length}</p>
                                        <p>{parseFloat(order.grandTotal).toFixed(2)}</p>
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
                                        <p>{`${order.firstName} ${order.lastName}`}</p>
                                        <p>{`${order.address.streetAddress}, ${order.address.city}, ${order.address.state}, ${order.address.country} `}</p>
                                        <p>{order.phoneNumber}</p>
                                        <p>{order.email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>



                        {/**************************************************************** * table section ***************************************************************/}

                        <Search handleSearch={handleSearch} name="view-orders" DATA={order.products} handleFilterObject={handleFilterObject} />

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
                                        data.map(({ name, productID, price }, key) => {
                                            return (
                                                <tr key={key} className="border-b border-1 border-[#E6E6E6] text-[13px] leading-[23px] text-[#333333]">
                                                    <td className="py-2 pr-8"></td>
                                                    <td className="py-2 pr-8" >{name}</td>
                                                    <td className="py-2 pr-8">{productID}</td>
                                                    <td className="py-2 pr-8">{parseFloat(price).toFixed(2)}</td>
                                                    <td className="py-4 pr-8 capitalize">
                                                        <StatusPills status={order.status} />
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

                    <div className="flex justify-end mt-24">
                        <Button
                            variant="secondary"
                            type="button"
                            className="w-[133px]"
                            onClick={() => navigate("/orders")}
                        >
                            Close
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    )
}


export default ViewOrders;