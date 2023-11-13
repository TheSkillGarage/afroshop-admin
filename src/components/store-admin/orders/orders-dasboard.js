import React, { useEffect, useState } from "react";
import { EyeIcon, FilterIcon, NextIcon, PrevIcon, SearchIcon } from "../../../images";
// import PRODUCT_DATA from "../../../data/products";
import Detail from "../products/details";
import ORDERS_DATA from "../../../data/orders";
import StatusPills from "../status-pills";
// import Detail from ".products/details";

const OrdersDashboard = () => {

    const [activeTab, setActiveTab] = useState('all');
    const [page, setPage] = useState(1);
    const [startCount, setStartCount] = useState(0);
    const [stopCount, setStopCount] = useState(0);
    const [currentData, setCurrentData] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [pageButtons, setPageButtons] = useState([]);


    const totalPages = Math.ceil(ORDERS_DATA.length / itemsPerPage); // sets total 


    const handleItemsPerPage = (e) => setItemsPerPage(e.target.value); // set items per page when selected
    const handleActiveTab = (activeTab) => setActiveTab(activeTab); // controls styles for all, active, pending and draft filters
    const handlePage = (activePage) => setPage(activePage); // sets page when pagination button is clicked
    const prevPage = () => page > 1 ? setPage(page - 1) : null; // goes to previous page
    const nextPage = () => page < totalPages ? setPage(page + 1) : null; // goes to next page



    // handles number of items displayed in a table depending on Items per page
    const handleProductsDisplayed = () => {
        const start = (page - 1) * itemsPerPage;
        const end = parseInt(start) + parseInt(itemsPerPage);
        setCurrentData(ORDERS_DATA.slice(start, end));

        setStartCount(start);

        if (end <= ORDERS_DATA.length) {
            setStopCount(end);
        } else {
            setStopCount(ORDERS_DATA.length)
        }
    }


    // handles pagination buttons displayed
    const handlePageButtons = () => {
        let a = []

        for (let i = 1; i <= totalPages; i++) {
            a.push(i);
        }

        let b = [...a.slice(page - 1, a.length)]

        if (a.length <= 5) {
            setPageButtons(a)
        } else if (b.length <= 5) {
            b = [...a.slice(a.length - 6, a.length)]
            setPageButtons(b);
        } else if (page !== 1) {
            setPageButtons([...b.slice(0, 4), "...", b[b.length - 1]])
        } else {
            setPageButtons([...b.slice(0, 4), "...", b[b.length - 1]])
        }

    }


    // calls functions when page or item per page updates
    useEffect(() => {
        handleProductsDisplayed();
        handlePageButtons();
    }, [page, itemsPerPage]);


    return (
        <div className="bg-[#F2F2F2] w-full py-6 px-4">

            <div className="flex items-center gap-8 mb-8 mt-2">
                <p className="text-[rgba(48,48,48,0.4)] font-medium text-[14px] leading-[16.8px] -tracking[16%] font-['Lato']">...</p>
                <p className="text-[13px] leading-[23px] text-[#186F3D]">Orders</p>
            </div>
            <div className="bg-[#ffffff] w-[403px] h-[32px] flex items-center rounded">
                <p
                    className={`${activeTab === "all" ? "text-[#333333] font-semibold" : "text-[#999999]"} text-[13px] leading-[23px] h-full w-[49px] flex items-center justify-center cursor-pointer`}
                    onClick={() => handleActiveTab("all")}
                >
                    All
                </p>
                <p
                    className={`${activeTab === "pending" ? "text-[#333333] font-semibold" : "text-[#999999]"} text-[13px] leading-[23px] h-full w-[84px] flex items-center justify-center cursor-pointer`}
                    onClick={() => handleActiveTab("pending")}
                >
                    Pending
                </p>
                <p
                    className={`${activeTab === "shipped" ? "text-[#333333] font-semibold" : "text-[#999999]"} text-[13px] leading-[23px] h-full w-[84px] flex items-center justify-center cursor-pointer`}
                    onClick={() => handleActiveTab("shipped")}
                >
                    Shipped
                </p>
                <p
                    className={`${activeTab === "delivered" ? "text-[#333333] font-semibold" : "text-[#999999]"} text-[13px] leading-[23px] h-full w-[92px] flex items-center justify-center cursor-pointer`}
                    onClick={() => handleActiveTab("delivered")}
                >
                    Delivered
                </p>
                <p
                    className={`${activeTab === "cancelled" ? "text-[#333333] font-semibold" : "text-[#999999]"} text-[13px] leading-[23px] h-full w-[94px] flex items-center justify-center cursor-pointer`}
                    onClick={() => handleActiveTab("cancelled")}
                >
                    Cancelled
                </p>
            </div>

            <div className="bg-[#ffffff] rounded-2xl mt-1 flex">
                <div className={`h-[4px] w-[47px] mr-[2px] rounded-2xl ${activeTab === "all" ? "bg-[#FCAE17]" : "bg-[#ffffff]"}`}></div>
                <div className={`h-[4px] w-[82px] mr-[2px] rounded-2xl ${activeTab === "pending" ? "bg-[#FCAE17]" : "bg-[#ffffff]"}`}></div>
                <div className={`h-[4px] w-[82px] mr-[2px] rounded-2xl ${activeTab === "shipped" ? "bg-[#FCAE17]" : "bg-[#ffffff]"}`}></div>
                <div className={`h-[4px] w-[92px] mr-[2px] rounded-2xl ${activeTab === "delivered" ? "bg-[#FCAE17]" : "bg-[#ffffff]"}`}></div>

                <div className={`h-[4px] w-[92px] mr-[2px] rounded-2xl ${activeTab === "cancelled" ? "bg-[#FCAE17]" : "bg-[#ffffff]"}`}></div>
            </div>

            {/******************************************************* * table section  **************************************************************/}

            <div className="pt-6 mt-8 w-full">

                <div className="bg-[#ffffff] ">
                    <div className="pl-4">
                        <p className="text-[20px] leading-[32px] text-[#186F3D] font-bold py-4">Orders</p>
                    </div>

                    <div className="border-t border-1 border-[##F2F2F2] flex justify-between items-center px-4 py-8">
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
                            {currentData.map(({ orderID, orderDate, customer, price, items, status }, key) => {
                                return (
                                    <tr key={key} className="text-[13px] leading-[23px] text-[#333333] border border-1 border-[#E6E6E6]">
                                        <td className="text-center"><input type="checkbox" name={orderID} id="" className=" w-[24px] h-[24px] rounded border border-1 border-[#CCCCCC] mt-2 accent-[#186F3D]" /></td>
                                        <td className="py-4">{orderID}</td>
                                        <td className="py-4">{orderDate}</td>
                                        <td className="py-4">{customer}</td>
                                        <td className="py-4 pl-8">
                                            <p>{price.price}</p>
                                            <p className="text-[#186F3D] text-[10px] leading-[15px]">{price.paymentMethod}</p>
                                        </td>
                                        <td className="py-4 pl-8">{items}</td>
                                        <td className="capitalize py-4">
                                            <StatusPills status={status}/>
                                        </td>
                                        <td className="py-4">
                                            <EyeIcon className="cursor-pointer"/>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-between py-4 px-6 text-[13px] leading-[23px] items-center bg-[#ffffff] w-full ">
                    <div className="flex gap-8 text-[#CCCCCC] items-center">
                        <p className="flex gap-4 items-center">
                            <span>Show</span>
                            <select name="lines" id=""
                                className="w-[56px] h-[33px] border border-1 border-[#CCCCCC] rounded focus:outline-none font-medium text-[#333333] text-[14px] leading-[16.8px]"
                                onChange={(e) => handleItemsPerPage(e)}>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="25">25</option>
                                <option value="30">30</option>
                            </select>
                            <span>Lines</span>
                        </p>

                        <p>Showing {startCount} to {stopCount} of {ORDERS_DATA.length} orders</p>
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
                                pageButtons.map((number, key) => {
                                    return (
                                        <p key={key} className={`${page === number ? "bg-[#FFE0B2]" : null} ${pageButtons === "..." ? "text-[#CCCCCC]" : "text-[#333333]"} text-[13px] leading-[23px] mr-1 flex justify-center items-center h-[31px] w-[31px] rounded cursor-pointer transition-all duration-200 ease-in`} onClick={() => number !== "..." ? handlePage(number) : null}>{number}</p>
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