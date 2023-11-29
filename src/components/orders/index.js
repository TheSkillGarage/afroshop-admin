import React, { useEffect, useState } from "react";
import { EyeIcon } from "../../images";
import ORDERS_DATA from "../../data/orders";
import StatusPills from "../status-pills";
import { useNavigate } from "react-router";
import usePagination from "../../hooks/usePagination";
import Filters from "../filters";
import useFilter from "../../hooks/useFilter";
import TableFooter from "../table-footer/table-footer";
import Search from "../search";

const OrdersDashboard = () => {

    const filters = ["all", "pending", "shipped", "delivered", "cancelled"];
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('all');
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);


    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (searchWord) => {
        setSearchTerm(searchWord)
    }



    // using custom  hooks
    const data = useFilter("orders", activeTab, ORDERS_DATA, searchTerm).filteredData;
    const pagination = usePagination(page, itemsPerPage, data);
    const totalPages = pagination.totalPages; // sets total 

    //functions
    const handleItemsPerPage = (e) => setItemsPerPage(parseInt(e.target.value)); // set items per page when selected
    const handleActiveTab = (activeTab) => setActiveTab(activeTab); // controls styles for all, active, pending and draft filters
    const handlePage = (activePage) => setPage(activePage); // sets page when pagination button is clicked
    const prevPage = () => page > 1 ? setPage(page - 1) : null; // goes to previous page
    const nextPage = () => page < totalPages ? setPage(page + 1) : null; // goes to next page

    const handleViewOrder = (orderID) => navigate(`/view-order/${orderID}`);


    const [checkbox, setCheckbox] = useState({});
    const [checkAll, setCheckAll] = useState(false);


    useEffect(() => {
        let keys = Array.from(Array(itemsPerPage).keys());
        let checkboxes = {};

        for (const key of keys) {
            checkboxes[key] = false;
        }

        setCheckbox(checkboxes);

    }, [itemsPerPage])


    const handleCheckbox = (key) => {
        setCheckbox((prevCheckbox) => ({
            ...prevCheckbox,
            [key]: !prevCheckbox[key],
        }));
    };




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

                    <Search handleSearch={handleSearch} name="orders" DATA={ORDERS_DATA}/>

                </div>

                {/**************************************************************  table section *****************************************************/}

                <div className="w-full">
                    <table className="w-full border-collapse">
                        <thead className="h-[56px] uppercase text-left text-[13px] leading-[23px] text-[#186F3D] font-semibold bg-[#F2F2F2]">
                            <tr>
                                <th className="w-[6.5%] text-center">
                                    <input type="checkbox" name="order" id="" checked={checkAll} onChange={() => setCheckAll(!checkAll)}
                                    className=" w-[24px] h-[24px] rounded border border-1 border-[#CCCCCC] mt-2 accent-[#186F3D] " />
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
                                        <td className="text-center ">
                                            <input type="checkbox" name={orderID} id="" checked={checkbox[key] || checkAll} onChange={() => handleCheckbox(key)}
                                                className=" w-[24px] h-[24px] rounded border border-1 border-[#CCCCCC] mt-2 accent-[#186F3D]" />
                                        </td>
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

                <TableFooter pagination={pagination} data={data} handleItemsPerPage={handleItemsPerPage} prevPage={prevPage} page={page} handlePage={handlePage} nextPage={nextPage} totalPages={totalPages} />

            </div>


        </div>
    )
}


export default OrdersDashboard;