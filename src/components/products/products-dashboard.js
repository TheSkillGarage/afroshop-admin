import React, { useEffect, useState } from "react";
import usePagination from "../../hooks/usePagination";
import { Link, useNavigate } from "react-router-dom";
import Filters from "../filters";
import useFilter from "../../hooks/useFilter";
import TableFooter from "../table-footer/table-footer";
import Search from "../search";
import BaseTable from "../shared/table";
import useTableData from "../../hooks/useTableData";


const ProductsDashboard = ({ productsData }) => {

    const [activeTab, setActiveTab] = useState('all');
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(productsData.length >= 10 ? 10 : 5);
    const [loading, setLoading] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');

    const [filterObject, setFilterObject] = useState({});

    // from usePagination hook
    let data = useFilter("products", activeTab, productsData, searchTerm, filterObject).filteredData;

    const pagination = usePagination(page, itemsPerPage, data);

    const totalPages = pagination.totalPages; // sets total pages

    const filters = ["all", "active", "pending", "draft"];

    const navigate = useNavigate();

    const handleItemsPerPage = (e) => setItemsPerPage(e.target.value); // set items per page when selected from select dropdown
    const handleActiveTab = (activeTab) => setActiveTab(activeTab); // controls styles for all, active, pending and draft filters
    const handlePage = (activePage) => setPage(activePage); // sets page when pagination button is clicked
    const prevPage = () => page > 1 ? setPage(page - 1) : null; // goes to previous page
    const nextPage = () => page < totalPages ? setPage(page + 1) : null; // goes to next page

    //search and filter modal
    const handleSearch = (searchWord) => setSearchTerm(searchWord)
    const handleFilterObject = (filterObject) => setFilterObject(filterObject)

    const goToEdit = (sku) => navigate(`/products/edit/${sku}`)

    // generating table values with tableData Hook
    let headersArray = [
        "selection",
        "product Name",
        "SKU",
        "date Added",
        "sales Price",
        "availability",
        "status",
        "detail"]

    const tableData = useTableData("products", headersArray, pagination.currentData, goToEdit);

    const headers = tableData.headers
    const results = tableData.results

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
                        <Link to='/products/new'><button className="bg-[#186F3D] text-[#ffffff] w-[216px] h-[40px] flex items-center justify-center rounded">Add New Product</button></Link>
                    </div>

                    <Search handleSearch={handleSearch} name="products" DATA={productsData} handleFilterObject={handleFilterObject} />
                </div>

                {/******************************************************* * table section  **************************************************************/}

                <BaseTable tableHeaders={headers} data={results} loading={loading} />


                <TableFooter
                    pagination={pagination}
                    itemsPerPage={itemsPerPage}
                    data={data}
                    handleItemsPerPage={handleItemsPerPage}
                    prevPage={prevPage}
                    page={page}
                    handlePage={handlePage}
                    nextPage={nextPage}
                    totalPages={totalPages} />
            </div>


        </div>
    )
}


export default ProductsDashboard;
