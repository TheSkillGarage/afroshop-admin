import React, { useEffect, useState } from "react";
import { GreenRightArrow } from "../../images";
import StatusPills from "../status-pills";
import { useNavigate, useParams } from "react-router-dom";
import useFilter from "../../hooks/useFilter";
import Search from "../search";
import Button from "../shared/button";
import { useSelector } from "react-redux";
import { formatPrice } from "../../utils/order-utils";
import { exportOrderWithProductsToCSV } from "../../utils/generateCSV";

const ViewOrders = () => {

    const { orderID } = useParams();

    const navigate = useNavigate();

    const orderData = useSelector((state) => state.ordersData);

    const order = orderData.find((order) => order.orderID === orderID);
    const orderAddress = order?.address?.formattedAddress ??
        [order?.address?.streetAddress, order?.address?.city, order?.address?.state, order?.address?.country]
            .filter(Boolean)
            .join(", ");

    const [searchTerm, setSearchTerm] = useState('');
    const [filterObject, setFilterObject] = useState({});

    const handleSearch = (searchWord) => setSearchTerm(searchWord)
    const handleFilterObject = (filterObject) => setFilterObject(filterObject)


    // using custom  hooks
    const data = useFilter("products", "all", order?.["products"], searchTerm, filterObject).filteredData;
    const date = new Date(order?.createdAt);


    useEffect(() => {
        if (!order) {
            navigate('/404');
        }
    }, [order, navigate]);

    const [loadingCSV, setLoading] = useState(false)
    const storeName = useSelector((state) => (state.stores && state.stores.length > 0) ? state.stores[state.storeID].name : {});
    const handleCSVDownload = (e) => {
        e.stopPropagation()
        if (!loadingCSV) {
            try {
                setLoading(true)
                exportOrderWithProductsToCSV(order, storeName)
            }
            catch (e) {
                console.error(e)
            }
            finally {
                setLoading(false)
            }
        }
    }

    if (!order) {
        return null;
    }

    return (
        <div className="bg-[#F2F2F2] w-full py-6 px-4">

            <div className="flex items-center gap-8 mb-6">
                <p className="text-[rgba(48,48,48,0.4)] font-medium text-[14px] leading-[16.8px] -tracking[16%] font-['Lato']">...</p>
                <p className="text-[13px] leading-[23px] text-[#999999] cursor-pointer" onClick={() => navigate("/orders")}>Orders</p>
                <GreenRightArrow alt="" />
                <p className="text-[13px] leading-[23px] text-[#186F3D]">View Orders</p>

                <Button loading={loadingCSV} variant="tertiary" className="ml-auto" onClick={handleCSVDownload}>Download as CSV</Button>

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
                                    <p>{order?.orderID}</p>
                                    <p>{date.toLocaleDateString('en-CA')}</p>
                                    <p>{order?.products.length}</p>
                                    <p>{formatPrice(order?.grandTotal)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="w-1/2 border border-1 border-[#E6E6E6] p-4 rounded">
                            <p className="font-semibold test-[16px] leading-[24px] uppercase text-[#186F3D] mb-4">shopper info</p>

                            <div className="flex">
                                <div className="text-[13px] leading-[23px] text-[#333333] w-[30%]">
                                    <p>Name:</p>
                                    <p>
                                        {
                                            order.deliveryOption ? "Delivery Address:" : "Pickup Address:"
                                        }
                                    </p>
                                    <p>Phone:</p>
                                    <p>Email:</p>
                                </div>

                                <div className="text-[13px] leading-[23px] text-[#7F7F7F] w-[70%]">
                                    <p>{`${order?.firstName} ${order?.lastName}`}</p>
                                    <p>{orderAddress || "N/A"}</p>
                                    <p>{order?.phoneNumber}</p>
                                    <p>{order?.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>



                    {/**************************************************************** * table section ***************************************************************/}

                    <Search handleSearch={handleSearch} name="view-orders" DATA={order?.products} handleFilterObject={handleFilterObject} />

                    <div className="w-full">
                        <table className="w-full border-collapse">
                            <thead className="text-left bg-[#F2F2F2] h-[56px] font-semibold text-[13px] leading-[23px] text-[#186F3D] uppercase">
                                <tr>
                                    <th className="w-[4.3%]"></th>
                                    <th className="w-[17.5%]">items</th>
                                    <th className="w-[17.5%]">SKU</th>
                                    <th className="w-[17.5%]">price ($)</th>
                                    <th className="w-[17.5%]">status</th>
                                    <th className="w-[4.3%]"></th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    data.map(({ name, SKU, price, percentMarkup, percentDiscount }, key) => {
                                        return (
                                            <tr key={key} className="border-b border-1 border-[#E6E6E6] text-[13px] leading-[23px] text-[#333333]">
                                                <td className="py-2 pr-8"></td>
                                                <td className="py-2 pr-8" >{name}</td>
                                                <td className="py-2 pr-8">{SKU}</td>
                                                <td className="py-2 pr-8">{formatPrice(price * (1 + (percentMarkup ?? 0) / 100) * (1 - (percentDiscount ?? 0) / 100))}</td>
                                                <td className="py-4 pr-8 capitalize">
                                                    <StatusPills status={order?.status} />
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
    )
}


export default ViewOrders;