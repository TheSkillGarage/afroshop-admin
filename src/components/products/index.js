import React, { useState } from "react";
import PRODUCT_DATA from "../../data/products";
import Detail from "./details";
import usePagination from "../../hooks/usePagination";
import StatusPills from "../status-pills";
import Filters from "../filters";
import useFilter from "../../hooks/useFilter";
import TableFooter from "../table-footer/table-footer";
import Search from "../search";

const ProductsDashboard = () => {

    const [activeTab, setActiveTab] = useState('all');
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const [searchTerm, setSearchTerm] = useState('');
    // from usePagination hook
    let data = useFilter("products", activeTab, PRODUCT_DATA, searchTerm).filteredData;

    const pagination = usePagination(page, itemsPerPage, data);

    const totalPages = pagination.totalPages; // sets total pages


    const handleItemsPerPage = (e) => setItemsPerPage(e.target.value); // set items per page when selected from select dropdown
    const handleActiveTab = (activeTab) => setActiveTab(activeTab); // controls styles for all, active, pending and draft filters
    const handlePage = (activePage) => setPage(activePage); // sets page when pagination button is clicked
    const prevPage = () => page > 1 ? setPage(page - 1) : null; // goes to previous page
    const nextPage = () => page < totalPages ? setPage(page + 1) : null; // goes to next page

    const handleSearch = (searchWord) => {
        setSearchTerm(searchWord)
    }


    const filters = ["all", "active", "pending", "draft"];


    return (
        <div className="bg-[#F2F2F2] w-full py-6 px-4">

            <div className="flex items-center gap-8 mb-6 h-[39px]">
                <p className="text-[rgba(48,48,48,0.4)] font-medium text-[14px] leading-[16.8px] -tracking[16%] font-['Lato']">...</p>
                <p className="text-[13px] leading-[23px] text-[#186F3D]">Products</p>
            </div>

            <Filters filters={filters} activeTab={activeTab} handleActiveTab={handleActiveTab} />

            {/******************************************************* * filter section  **************************************************************/}

            <div className="pt-4 mt-4">

                <div className="bg-[#FFFFFF] pt-4">
                    <div className="pl-4 border-b border-1 border-[#F2F2F2] h-[64px] flex items-center">
                        <p className="text-[20px] leading-[32px] text-[#186F3D] font-bold">Products</p>
                    </div>

                    <div className="w-full flex justify-end items-center px-4 h-[60px]">
                        <button className="bg-[#186F3D] text-[#ffffff] w-[216px] h-[40px] flex items-center justify-center rounded">Add New Product</button>
                    </div>

                    <Search  handleSearch={handleSearch}/>
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
                                    <tr key={key} className="text-[13px] leading-[23px] text-[#333333] border-b border-1 border-[#E6E6E6] min-h-[47px]">
                                        <td className="text-center">
                                            <input type="checkbox" name={productName} id="" className=" w-[24px] h-[24px] rounded border border-1 border-[#CCCCCC] mt-2 accent-[#186F3D]" />
                                        </td>
                                        <td className="py-2">{productName}</td>
                                        <td className="pl-8 py-2">{SKU}</td>
                                        <td className="py-2">{dateAdded}</td>
                                        <td className="py-2">{salesPrice}</td>
                                        <td className="py-2">{availabilty}</td>
                                        <td className="capitalize py-2">
                                            <StatusPills status={status} name="products" />
                                        </td>
                                        <td className="py-2">
                                            <Detail />
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                <TableFooter pagination={pagination} data={data} handleItemsPerPage={handleItemsPerPage} prevPage={prevPage} page={page} handlePage={handlePage} nextPage={nextPage} totalPages={totalPages} />
            </div>


        </div>
    )
}


export default ProductsDashboard;