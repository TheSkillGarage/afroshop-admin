import React, { useEffect, useState } from "react";
import SelectDropdown from "../shared/dropdownInput/dropdown";
import Button from "../shared/button";
import SummaryCards from "./summaryCards";
import { useSelector } from "react-redux";
import { calculatePercentageChanges, calculateTotals } from "../../utils/OrderSummaryFunctions";

const BusinessSummary = ({ years, ordersData }) => {

    const user = useSelector((state) => state.user);
    ;
    const [totals, setTotals] = useState({
        sales: 0,
        customers: 0,
        orders: 0,
        products: 0,
    });


    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [percentageChanges, setPercentageChanges] = useState({
        sales: 0,
        customers: 0,
        orders: 0,
        products: 0
    });

    const handleSelectedYear = val => setSelectedYear(val);


    useEffect(() => {
        const calculateTotal = calculateTotals(selectedYear, ordersData);
        const percentageChanges = calculatePercentageChanges(ordersData, selectedYear);
      
        setTotals(prevTotals => ({
          ...prevTotals,
          sales: calculateTotal.sales,
          customers: calculateTotal.customers.size,
          orders: calculateTotal.orders,
          products: calculateTotal.products.size,
        }));
      
        setPercentageChanges(percentageChanges);
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
                    {
                        years.length !== 1 ?
                            <SelectDropdown name="summary" options={years} placeholder={years?.[0]?.value} handleSelectedYear={handleSelectedYear} color="green" />
                            :
                            <p className="p-3 border border-[#186F3D] rounded w-[78px] h-[40px] text-center flex items-center justify-center text-[13px] leading-[23px] text-[#186F3D]">{years[0].value}</p>
                    }
                    {
                        years.length > 1 &&
                        <Button variant="primary" className="text-[13px] w-[118px] h-[40px]" onClick={() => setSelectedYear("all")}>
                            View All Time
                        </Button>
                    }
                </div>
            </div>

            {/* --------------Summary Cards--------------------------- */}
            <div className="flex gap-4">
                <SummaryCards
                    cardTitle="Total Sales"
                    cardNumber={totals.sales}
                    percentage={percentageChanges.sales}
                    selectedYear={selectedYear}
                    backgroundColor="#FF950026"
                />
                <SummaryCards
                    cardTitle="Customers"
                    cardNumber={totals.customers}
                    percentage={percentageChanges.customers}
                    selectedYear={selectedYear}
                    backgroundColor="#007AFF26"
                />
                <SummaryCards
                    cardTitle="Total Orders"
                    cardNumber={totals.orders}
                    percentage={percentageChanges.orders}
                    selectedYear={selectedYear}
                    backgroundColor="#FFD60A26"
                />
                <SummaryCards
                    cardTitle="Total Products"
                    cardNumber={totals.products}
                    percentage={percentageChanges.products}
                    selectedYear={selectedYear}
                    backgroundColor="#34C75926"
                />
            </div>
        </div>
    )
}

export default BusinessSummary;