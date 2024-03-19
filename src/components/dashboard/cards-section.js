import React, { useEffect, useState } from "react";
import SelectDropdown from "../shared/dropdownInput/dropdown";
import Button from "../shared/button";
import SummaryCards from "./summaryCards";
import { useSelector } from "react-redux";
import { extractYears } from "../../utils/extract-years";
import { calculatePercentageChanges, calculateTotals } from "../../utils/calculate-totals";

const BusinessSummary = () => {

    const ordersData = useSelector((state) => state.ordersData);
    const user = useSelector((state) => state.user);
;
   
    const [totalSales, setTotalSales] = useState(0);
    const [totalCustomers, setTotalCustomers] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const [years] = useState(extractYears(ordersData));
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [percentageChanges, setPercentageChanges] = useState({
        sales: 0,
        customers: 0,
        orders: 0,
        products: 0
    });

    const handleSelectedYear = val => setSelectedYear(val);
    

    const calculateTotal = calculateTotals(selectedYear, ordersData);

    useEffect(() => {
        setTotalSales(calculateTotal.sales);
        setTotalCustomers(calculateTotal.customers.size);
        setTotalOrders(calculateTotal.orders);
        setTotalProducts(calculateTotal.products.size);
        setPercentageChanges(calculatePercentageChanges(ordersData, selectedYear, years))
    }, [selectedYear, ordersData]);


     return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div className="flex flex-col gap-1 w-[343px]">
                    <h5 className="text-xl font-bold leading-8">{`Welcome, ${user?.firstName}!`}</h5>
                    <p className="text-base text-[#7F7F7F]">
                        Here’s what’s happening in your store today
                    </p>
                </div>

                <div className="flex gap-4 items-center">
                    <SelectDropdown name="summary" options={years} placeholder={years?.[0]?.value} handleSelectedYear={handleSelectedYear} color="green" />
                    <Button variant="primary" className="text-[13px] w-[118px] h-[40px]" onClick={() => setSelectedYear("all")}>
                        View All Time
                    </Button>
                </div>
            </div>

            {/* --------------Summary Cards--------------------------- */}
            <div className="flex gap-4">
                <SummaryCards
                    cardTitle="Total Sales"
                    cardNumber={totalSales}
                    percentage={percentageChanges.sales}
                    backgroundColor="#FF950026"
                />
                <SummaryCards
                    cardTitle="Customers"
                    cardNumber={totalCustomers}
                    percentage={percentageChanges.customers}
                    backgroundColor="#007AFF26"
                />
                <SummaryCards
                    cardTitle="Total Orders"
                    cardNumber={totalOrders}
                    percentage={percentageChanges.orders}
                    backgroundColor="#FFD60A26"
                />
                <SummaryCards
                    cardTitle="Total Products"
                    cardNumber={totalProducts}
                    percentage={percentageChanges.products}
                    backgroundColor="#34C75926"
                />
            </div>
        </div>
    )
}

export default BusinessSummary;