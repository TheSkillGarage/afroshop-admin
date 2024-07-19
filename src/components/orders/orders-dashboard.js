import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import usePagination from "../../hooks/usePagination";
import Filters from "../filters";
import useFilter from "../../hooks/useFilter";
import TableFooter from "../table-footer/table-footer";
import Search from "../search";
import BaseTable from "../shared/table";
import useTableData from "../../hooks/useTableData";
import { useSelector } from "react-redux";

const OrdersDashboard = () => {

  const filters = ["all", "processing", "pending", "ready for pickup", "picked up", "shipped", "delivered", "cancelled"];
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('all');
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);


  const [searchTerm, setSearchTerm] = useState('');
  const [filterObject, setFilterObject] = useState({});

  const handleSearch = (searchWord) => setSearchTerm(searchWord);
  const handleFilterObject = (filterObject) => setFilterObject(filterObject);


  const ordersData = useSelector((state) => state.ordersData);

  // using custom  hooks
  const data = useFilter("orders", activeTab, ordersData, searchTerm, filterObject).filteredData;
  const pagination = usePagination(page, itemsPerPage, data);
  const totalPages = pagination.totalPages; // sets total 

  //functions
  const handleItemsPerPage = (e) => setItemsPerPage(parseInt(e.target.value)); // set items per page when selected
  const handleActiveTab = (activeTab) => setActiveTab(activeTab); // controls styles for all, active, pending and draft filters
  const handlePage = (activePage) => setPage(activePage); // sets page when pagination button is clicked
  const prevPage = () => page > 1 ? setPage(page - 1) : null; // goes to previous page
  const nextPage = () => page < totalPages ? setPage(page + 1) : null; // goes to next page

  const handleViewOrder = (orderID) => navigate(`/view-order/${orderID}`);


  let headersArray = [
    "selection",
    "order ID",
    "order Date",
    "customer",
    "price",
    "items",
    "status",
    "detail"]


  const tableData = useTableData("orders", headersArray, pagination.currentData, handleViewOrder);

  const headers = tableData.headers
  const results = tableData.results


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
          <div className="pl-4 border-b border-1 border-[#F2F2F2]">
            <p className="text-[20px] leading-[32px] text-[#186F3D] font-bold h-[64px] flex items-center">Orders</p>
          </div>

          <Search handleSearch={handleSearch} name="orders" DATA={ordersData} handleFilterObject={handleFilterObject} />

        </div>

        {/**************************************************************  table section *****************************************************/}
        <BaseTable tableHeaders={headers} data={results} name="orders" />



        <TableFooter
          pagination={pagination}
          data={data}
          itemsPerPage={itemsPerPage}
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


export default OrdersDashboard;