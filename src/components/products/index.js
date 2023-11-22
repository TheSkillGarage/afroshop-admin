import React, { useState } from "react";
import { FilterIcon, NextIcon, PrevIcon, SearchIcon } from "../../images";
import PRODUCT_DATA from "../../data/products";
import Detail from "./details";
import usePagination from "../../hooks/usePagination";
import StatusPills from "../status-pills";

const ProductsDashboard = () => {

    const [activeTab, setActiveTab] = useState('all');
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // from usePagination hook

    const pagination = usePagination(page, itemsPerPage, PRODUCT_DATA);

    const totalPages = pagination.totalPages; // sets total pages


    const handleItemsPerPage = (e) => setItemsPerPage(e.target.value); // set items per page when selected from select dropdown
    const handleActiveTab = (activeTab) => setActiveTab(activeTab); // controls styles for all, active, pending and draft filters
    const handlePage = (activePage) => setPage(activePage); // sets page when pagination button is clicked
    const prevPage = () => page > 1 ? setPage(page - 1) : null; // goes to previous page
    const nextPage = () => page < totalPages ? setPage(page + 1) : null; // goes to next page

    const filters = ["all", "active", "pending", "drafts"];

    const filterWidth = (filter) => {
        switch (filter) {
            case "all":
                return "w-[49px]"
            case "active":
                return "w-[72px]"
            case "pending":
                return "w-[84px]"
            case "drafts":
                return "w-[72px]"
            default:
                return null
        }
    }


    return (
        <div className="bg-[#F2F2F2] w-full py-6 px-4">

            <div className="flex items-center gap-8 mb-6">
                <p className="text-[rgba(48,48,48,0.4)] font-medium text-[14px] leading-[16.8px] -tracking[16%] font-['Lato']">...</p>
                <p className="text-[13px] leading-[23px] text-[#186F3D]">Products</p>
            </div>
            <div className="bg-[#ffffff] w-[277px] h-[32px] flex items-center rounded">

                {filters.map((filter, key) => {
                    return (
                        <p key={key}
                            className={`${activeTab === filter ? "text-[#333333] font-semibold" : "text-[#999999]"} text-[13px] leading-[23px] h-full ${filterWidth(filter)} capitalize flex items-center justify-center cursor-pointer`}
                            onClick={() => handleActiveTab(filter)}
                        >
                            {filter}
                        </p>
                    )
                })}
            </div>

            <div className="bg-[#ffffff] rounded-2xl mt-1 flex">
                {
                    filters.map((filter, key) => {
                        return <div key={key} className={`h-[4px] ${filterWidth(filter)} rounded-2xl ${activeTab === filter ? "bg-[#FCAE17]" : "bg-[#ffffff]"}`}></div>
                    })
                }
            </div>

            {/******************************************************* * filter section  **************************************************************/}

            <div className="pt-4 mt-4">

                <div className="bg-[#FFFFFF]">
                    <div className="pl-4 border-b border-1 border-[#F2F2F2]">
                        <p className="text-[20px] leading-[32px] text-[#186F3D] font-bold py-4">Products</p>
                    </div>

                    <div className="w-full flex justify-end px-4 py-4">
                        <button className="bg-[#186F3D] text-[#ffffff] w-[216px] py-2 rounded">Add New Product</button>
                    </div>

                    <div className="flex justify-between items-center px-4 py-6">
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

                {/******************************************************* * table section  **************************************************************/}

                <div className="w-full">
                    <table className="w-full border-collapse">
                        <thead className="h-[56px] uppercase text-left text-[13px] leading-[23px] text-[#186F3D] font-semibold bg-[#F2F2F2]">
                            <tr>
                                <th className="w-[6.5%] text-center">
                                    <input type="checkbox" name="order" id="" className=" w-[24px] h-[24px] rounded border border-1 border-[#CCCCCC] mt-2 accent-[#186F3D] " />
                                </th>
                                <th className="w-[14.5%]">product name</th>
                                <th className=" w-[14.5%] pl-8">SKU</th>
                                <th className="w-[14.5%]">date added</th>
                                <th className="w-[14.5%]">sales price ($)</th>
                                <th className="w-[14.5%]">availability</th>
                                <th className="w-[14.5%]">status</th>
                                <th className="w-[6.5%]"></th>
                            </tr>

                        </thead>

                        <tbody className="bg-[#ffffff]">
                            {pagination.currentData.map(({ productName, SKU, dateAdded, salesPrice, availabilty, status }, key) => {
                                return (
                                    <tr key={key} className="text-[13px] leading-[23px] text-[#333333] border border-1 border-[#E6E6E6]">
                                        <td className="text-center">
                                            <input type="checkbox" name={productName} id="" className=" w-[24px] h-[24px] rounded border border-1 border-[#CCCCCC] mt-2 accent-[#186F3D]" />
                                        </td>
                                        <td className="py-2">{productName}</td>
                                        <td className="pl-8 py-2">{SKU}</td>
                                        <td className="py-2">{dateAdded}</td>
                                        <td className="py-2">{salesPrice}</td>
                                        <td className="py-2">{availabilty}</td>
                                        <td className="capitalize py-4">
                                            <StatusPills status={status} name="products" />
                                        </td>
                                        <td className="py-4">
                                            <Detail />
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-between px-4 py-4 text-[13px] leading-[23px] items-center bg-[#FFFFFF]">
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

                        <p>Showing {pagination.count.start} to {pagination.count.stop} of {PRODUCT_DATA.length} orders</p>
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
                                        <p key={key}
                                            className={`${page === number ? "bg-[#FFE0B2]" : null} ${number === "..." ? "text-[#CCCCCC]" : "text-[#333333]"} text-[13px] leading-[23px] mr-1 flex justify-center items-center h-[31px] w-[31px] rounded cursor-pointer transition-all duration-200 ease-in`} onClick={() => number !== "..." ? handlePage(number) : null}>{number}</p>
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


export default ProductsDashboard;