import React, { useState } from "react";
import SelectDropdown from "../shared/dropdownInput/dropdown";
import Button from "../shared/button";
import SummaryCards from "./summaryCards";
import SELECT_OPTIONS from "../../data/dashboardTimeOptions";
import { OVERVIEW_DATA } from "../../data";

const BusinessSummary = () => {

    const [selectedYear, setSelectedYear] = useState(2023);

    const calculateTotals = (property, year) => {
        return OVERVIEW_DATA.reduce((total, data) => {
            if (selectedYear === "all" || new Date(data.date).getFullYear() === parseInt(year)) {
                total += data[property];
            }
            return total;
        }, 0);
    };

    const totalSales = calculateTotals('income', parseInt(selectedYear));
    const totalCustomers = calculateTotals('customers', parseInt(selectedYear));
    const totalOrders = calculateTotals('orders', parseInt(selectedYear));
    const totalProducts = calculateTotals('products', parseInt(selectedYear));

    const percentChangeInMetric = (metric, param) => {
        const uniqueYears = [...new Set(OVERVIEW_DATA.map(item => new Date(item.date).getFullYear()))];

        const startYear = Math.min(...uniqueYears);
        const currentYear = Math.max(...uniqueYears);


        if (selectedYear === "all") {

            let leastYearTotal = OVERVIEW_DATA.reduce((total, data) => {
                if (new Date(data.date).getFullYear() === parseInt(startYear)) {
                    total += data[param];
                }
                return total;
            }, 0);

            let greaterYearTotal = OVERVIEW_DATA.reduce((total, data) => {
                if (new Date(data.date).getFullYear() === parseInt(currentYear)) {
                    total += data[param];
                }
                return total;
            }, 0);

            let percentChange = Math.round(
                ((greaterYearTotal - leastYearTotal) /
                    leastYearTotal) * 100
            );
            return percentChange
        }
        else if (parseInt(selectedYear) > startYear) {
            let prevYear = selectedYear - 1;
            let percentChange = Math.round(
                ((metric - calculateTotals(param, prevYear)) /
                    calculateTotals(param, prevYear)) * 100
            );
            return percentChange
        } else {
            return 0
        }
    }


    const percentChangeInSales = percentChangeInMetric(totalSales, 'income');
    const percentChangeInCustomers = percentChangeInMetric(totalCustomers, 'customers');
    const percentChangeInOrders = percentChangeInMetric(totalOrders, 'orders');
    const percentChangeInProducts = percentChangeInMetric(totalProducts, 'products');


    const handleSelectedYear = (val) => {
        setSelectedYear(val);

    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div className="flex flex-col gap-1 w-[343px]">
                    <h5 className="text-xl font-bold leading-8">Welcome, Ini!</h5>
                    <p className="text-base text-[#7F7F7F]">
                        Here’s what’s happening in your store today
                    </p>
                </div>

                <div className="flex gap-4 items-center">
                    <SelectDropdown name="summary" options={SELECT_OPTIONS.slice(1)} placeholder="2023" handleSelectedYear={handleSelectedYear} color="green"/>
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
                    percentage={percentChangeInSales}
                    backgroundColor="#FF950026"
                />
                <SummaryCards
                    cardTitle="Customers"
                    cardNumber={totalCustomers}
                    percentage={percentChangeInCustomers}
                    backgroundColor="#007AFF26"
                />
                <SummaryCards
                    cardTitle="Total Orders"
                    cardNumber={totalOrders}
                    percentage={percentChangeInOrders}
                    backgroundColor="#FFD60A26"
                />
                <SummaryCards
                    cardTitle="Total Products"
                    cardNumber={totalProducts}
                    percentage={percentChangeInProducts}
                    backgroundColor="#34C75926"
                />


                {/* {DASHBOARD_SUMMARY_CARDS.map((data) => (
              <SummaryCards
                cardTitle={data.cardTitle}
                cardNumber={data.cardNumber}
                arrowImage={data.arrowImage}
                percentage={data.percentage}
                backgroundColor={data.backgroundColor}
              />
            ))} */}
            </div>
        </div>
    )
}

export default BusinessSummary;