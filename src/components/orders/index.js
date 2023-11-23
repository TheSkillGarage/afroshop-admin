import React, { useState } from "react";
import { EyeIcon, FilterIcon, NextIcon, PrevIcon, SearchIcon } from "../../images";
import ORDERS_DATA from "../../data/orders";
import StatusPills from "../status-pills";
import { useNavigate } from "react-router";
import usePagination from "../../hooks/usePagination";
import Filters from "../filters";
import useFilter from "../../hooks/useFilter";

const OrdersDashboard = () => {

    const filters = ["all", "pending", "shipped", "delivered", "cancelled"];
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('all');
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);


    // using custom  hooks
    const data = useFilter(activeTab, ORDERS_DATA).data;
    const pagination = usePagination(page, itemsPerPage, data);
    const totalPages = pagination.totalPages; // sets total 

    //functions
    const handleItemsPerPage = (e) => setItemsPerPage(e.target.value); // set items per page when selected
    const handleActiveTab = (activeTab) => setActiveTab(activeTab); // controls styles for all, active, pending and draft filters
    const handlePage = (activePage) => setPage(activePage); // sets page when pagination button is clicked
    const prevPage = () => page > 1 ? setPage(page - 1) : null; // goes to previous page
    const nextPage = () => page < totalPages ? setPage(page + 1) : null; // goes to next page

    const handleViewOrder = (orderID) => navigate(`/view-order/${orderID}`);


    return (
        <div className="bg-[#F2F2F2] w-full pt-6 pb-8 px-4">

            <div className="flex items-center gap-8 mb-6 h-[39px]">
                <p className="text-[rgba(48,48,48,0.4)] font-medium text-[14px] leading-[16.8px] -tracking[16%] font-['Lato']">...</p>
                <p className="text-[13px] leading-[23px] text-[#186F3D]">Orders</p>
            </div>

            <Filters filters={filters} activeTab={activeTab} handleActiveTab={handleActiveTab} />

            <div className="mt-6 w-full">

                {/******************************************************* * Filter section  **************************************************************/}
                <div className="bg-[#ffffff] ">
                    <div className="pl-4">
                        <p className="text-[20px] leading-[32px] text-[#186F3D] font-bold h-[64px] flex items-center">Orders</p>
                    </div>

                    <div className="border-t border-1 border-[#F2F2F2] flex justify-between items-center px-4 py-6 h-[93px]">
                        <div className="w-[514px] relative">
                            <SearchIcon className="absolute top-[10px] left-[18px] " />
                            <input type="text" placeholder="Text" className="bg-[#F2F2F2] w-full h-[45px] rounded-[30px] text-[#999999] px-12" />
                        </div>

                        <div className="w-[108px] h-[44px] rounded border border-[0.5px] flex items-center justify-center gap-2">
                            <p className="text-[16px] leading-[24px] text-[#333333]">Filter</p>
                            <FilterIcon />
                        </div>
                    </div>
                </div>

                {/**************************************************************  table section *****************************************************/}

                <div className="w-full">
                    <table className="w-full border-collapse">
                        <thead className="h-[56px] uppercase text-left text-[13px] leading-[23px] text-[#186F3D] font-semibold bg-[#F2F2F2]">
                            <tr>
                                <th className="w-[6.5%] text-center">
                                    <input type="checkbox" name="order" id="" className=" w-[24px] h-[24px] rounded border border-1 border-[#CCCCCC] mt-2 accent-[#186F3D] " />
                                </th>
                                <th className="w-[14.5%]">order id</th>
                                <th className=" w-[14.5%]">order date</th>
                                <th className="w-[14.5%]">customer</th>
                                <th className="w-[14.5%] pl-8">price</th>
                                <th className="w-[14.5%] pl-8">items</th>
                                <th className="w-[14.5%]">status</th>
                                <th className="w-[6.5%]"></th>
                            </tr>

                        </thead>

                        <tbody className="bg-[#ffffff]">
                            {pagination.currentData.map(({ orderID, orderDate, customer, price, items, status }, key) => {
                                return (
                                    <tr key={key} className="text-[13px] leading-[23px] text-[#333333] border border-1 border-[#E6E6E6] h-[52px]">
                                        <td className="text-center "><input type="checkbox" name={orderID} id="" className=" w-[24px] h-[24px] rounded border border-1 border-[#CCCCCC] mt-2 accent-[#186F3D]" /></td>
                                        <td className="">{orderID}</td>
                                        <td className="">{orderDate}</td>
                                        <td className="">{customer}</td>
                                        <td className=" pl-8">
                                            <p>${price.price}</p>
                                            <p className="text-[#186F3D] text-[10px] leading-[15px]">{price.paymentMethod}</p>
                                        </td>
                                        <td className=" pl-8">{items}</td>
                                        <td className="capitalize ">
                                            <StatusPills status={status} name="orders" />
                                        </td>
                                        <td className="">
                                            <EyeIcon className="cursor-pointer" onClick={() => handleViewOrder(orderID)} />
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-between pt-4 pb-6 px-6 text-[13px] leading-[23px] items-center bg-[#ffffff] w-full ">
                    <div className="flex gap-8 text-[#CCCCCC] items-center">
                        <p className="flex gap-4 items-center">
                            <span>Show</span>
                            <select name="lines" id=""
                                className="w-[56px] h-[33px] border border-1 border-[#CCCCCC] rounded focus:outline-none font-medium text-[#333333] text-[14px] leading-[16.8px]"
                                onChange={(e) => handleItemsPerPage(e)}>
                                {
                                    ["10", "15", "20", "25", "30"].map((num, key) => {
                                        return <option value={num} key={key}>{num}</option>
                                    })
                                }
                            </select>
                            <span>Lines</span>
                        </p>

                        <p>Showing {pagination.count.start} to {pagination.count.stop} of {ORDERS_DATA.length} orders</p>
                    </div>

                    <div className="flex gap-1 text-[#333333]">
                        <p className="h-[31px] w-[31px] rounded cursor-pointer flex justify-center items-center" onClick={prevPage}>
                            {page === 1 ? <PrevIcon />
                                :
                                <NextIcon className="rotate-180" />
                            }
                        </p>



                        <div className="flex gap-1">
                            {
                                pagination.pageButtons.map((number, key) => {
                                    return (
                                        <p key={key} className={`${page === number ? "bg-[#FFE0B2]" : null} ${number === "..." ? "text-[#CCCCCC]" : "text-[#333333]"} text-[13px] leading-[23px] mr-1 flex justify-center items-center h-[31px] w-[31px] rounded cursor-pointer transition-all duration-200 ease-in`} onClick={() => number !== "..." ? handlePage(number) : null}>{number}</p>
                                    )
                                })

                            }
                        </div>


                        <p className="h-[31px] w-[31px] rounded cursor-pointer flex justify-center items-center" onClick={nextPage}>
                            {page !== totalPages ? <NextIcon />
                                :
                                <PrevIcon className="rotate-180" />
                            }
                        </p>
                    </div>
                </div>
            </div>


        </div>
    )
}


export default OrdersDashboard;