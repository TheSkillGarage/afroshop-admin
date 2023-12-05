import React, { useState } from "react";
import { EyeIcon } from "../../images";
import ORDERS_DATA from "../../data/orders";
import StatusPills from "../status-pills";
import { useNavigate } from "react-router";
import usePagination from "../../hooks/usePagination";
import Filters from "../filters";
import useFilter from "../../hooks/useFilter";
import TableFooter from "../table-footer/table-footer";
import Search from "../search";
import useTableSelect from "../../hooks/useTableSelect";
import Checkbox from "../shared/checkbox";
import BaseTable from "../shared/table";

const OrdersDashboard = () => {

    const filters = ["all", "pending", "shipped", "delivered", "cancelled"];
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('all');
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);


    const [searchTerm, setSearchTerm] = useState('');
    const [filterObject, setFilterObject] = useState({});

    const handleSearch = (searchWord) => setSearchTerm(searchWord)
    const handleFilterObject = (filterObject) => setFilterObject(filterObject)


    // using custom  hooks
    const data = useFilter("orders", activeTab, ORDERS_DATA, searchTerm, filterObject).filteredData;
    const pagination = usePagination(page, itemsPerPage, data);
    const totalPages = pagination.totalPages; // sets total 

    //functions
    const handleItemsPerPage = (e) => setItemsPerPage(parseInt(e.target.value)); // set items per page when selected
    const handleActiveTab = (activeTab) => setActiveTab(activeTab); // controls styles for all, active, pending and draft filters
    const handlePage = (activePage) => setPage(activePage); // sets page when pagination button is clicked
    const prevPage = () => page > 1 ? setPage(page - 1) : null; // goes to previous page
    const nextPage = () => page < totalPages ? setPage(page + 1) : null; // goes to next page

    const handleViewOrder = (orderID) => navigate(`/view-order/${orderID}`);



    const { selectedRows, handleSelectAllRows, handleSelectRow } = useTableSelect(
        { rows: pagination.currentData }
      );
    
      const headers = [
        {
          id: "selection",
          name: (
            <Checkbox
              name="all"
              handleChange={handleSelectAllRows}
              value={
                selectedRows.length === pagination.currentData.length ? "all" : ""
              }
              valueOnChecked="all"
            />
          ),
          width: "6.5%",
        },
        {
          id: "orderID",
          name: "Order ID",
          width: "14.5%",
        },
        {
          id: "orderDate",
          name: "order Date",
          width: "14.5%",
        },
        {
          id: "customer",
          name: "customer",
          width: "14.5%",
        },
        {
          id: "price",
          name: "price",
          width: "14.5%",
        },
        {
          id: "items",
          name: "items",
          width: "14.5%",
        },
        {
          id: "status",
          name: "Status",
          width: "14.5%",
        },
        { 
            id: "detail",
            name: "",
            width: "6.5%"
        }
      ];


      const results = pagination.currentData.map((data) => ({
        ...data,
        id: data.id,
        selection: (
          <Checkbox
            name={data}
            handleChange={(payload) => {
              handleSelectRow(data.id);
            }}
            value={selectedRows.includes(data.id) ? data.id : ""}
            valueOnChecked={data.id}
          />
        ),
        status: (
          <div className="capitalize">
            <StatusPills status={data.status} name="orders" />
          </div>
        ),
        detail: (
            <EyeIcon className="cursor-pointer" onClick={() => handleViewOrder(data.orderID)}/>
        )
      }));



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

                    <Search handleSearch={handleSearch} name="orders" DATA={ORDERS_DATA} handleFilterObject={handleFilterObject}/>

                </div>

                {/**************************************************************  table section *****************************************************/}

                <BaseTable tableHeaders={headers} data={results} />

                <TableFooter pagination={pagination} data={data} handleItemsPerPage={handleItemsPerPage} prevPage={prevPage} page={page} handlePage={handlePage} nextPage={nextPage} totalPages={totalPages} />

            </div>


        </div>
    )
}


export default OrdersDashboard;