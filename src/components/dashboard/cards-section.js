import React, { useEffect, useState } from "react";
import SelectDropdown from "../shared/dropdownInput/dropdown";
import Button from "../shared/button";
import SummaryCards from "./summaryCards";
import SELECT_OPTIONS from "../../data/dashboardTimeOptions";
import { OVERVIEW_DATA } from "../../data";
import { useSelector } from "react-redux";

const BusinessSummary = () => {

    // const [selectedYear, setSelectedYear] = useState(2024);

    const ordersData = useSelector((state) => state.ordersData);

    const calculateTotals = (property, year) => {
        return OVERVIEW_DATA.reduce((total, data) => {
            if (selectedYear === "all" || new Date(data.date).getFullYear() === parseInt(year)) {
                total += data[property];
            }
            return total;
        }, 0);
    };


    const [selectedYear, setSelectedYear] = useState(2024);
    const [totalSales, setTotalSales] = useState(0);
    const [totalCustomers, setTotalCustomers] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
  
    useEffect(() => {
        const calculateTotals = () => {
          let sales = 0;
          let customers = new Set();
          let orders = 0;
          let products = new Set();
    
          ordersData.forEach(order => {
            const orderYear = new Date(order.createdAt).getFullYear();
    
            if (selectedYear === "all" || orderYear === selectedYear) {
              sales += order.grandTotal;
              customers.add(order.customerId);
              orders++;
              order.products.forEach(product => {
                products.add(product.productID);
              });
            }
          });
    
          setTotalSales(sales);
          setTotalCustomers(customers.size);
          setTotalOrders(orders);
          setTotalProducts(products.size);
        };
    
        calculateTotals();
      }, [selectedYear, ordersData]);
  


    const percentChangeInMetric = (metric, param) => {
        
        const uniqueYears = [...new Set(ordersData.map(item => new Date(item.createdAt).getFullYear()))];

        const startYear = Math.min(...uniqueYears);
        const currentYear = Math.max(...uniqueYears);


        if (selectedYear === "all") {

            let leastYearTotal = ordersData.reduce((total, data) => {
                if (new Date(data.createdAt).getFullYear() === parseInt(startYear)) {
                    total += data[param];
                }
                return total;
            }, 0);

            let greaterYearTotal = ordersData.reduce((total, data) => {
                if (new Date(data.createdAt).getFullYear() === parseInt(currentYear)) {
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


    const percentChangeInSales = percentChangeInMetric(totalSales, 'grandTotal');
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
                    <SelectDropdown name="summary" options={SELECT_OPTIONS.slice(1)} placeholder="2023" handleSelectedYear={handleSelectedYear} color="green" />
                    <Button variant="primary" className="text-[13px] w-[118px] h-[40px]" onClick={() => setSelectedYear("all")}>
                        View All Time
                    </Button>
                </div>
            </div>

            {/* --------------Summary Cards--------------------------- */}
            <div className="flex gap-4">
                <SummaryCards
                    cardTitle="Total Sales"
                    cardNumber={totalSales.toFixed(2)}
                    percentage={percentChangeInSales}
                    backgroundColor="#FF950026"
                />
                <SummaryCards
                    cardTitle="Customers"
                    cardNumber={totalCustomers}
                    percentage={"5"}
                    backgroundColor="#007AFF26"
                />
                <SummaryCards
                    cardTitle="Total Orders"
                    cardNumber={totalOrders}
                    percentage={"2"}
                    backgroundColor="#FFD60A26"
                />
                <SummaryCards
                    cardTitle="Total Products"
                    cardNumber={totalProducts}
                    percentage={"2"}
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