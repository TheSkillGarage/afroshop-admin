import React, { useEffect, useState } from "react";
import SelectDropdown from "../shared/dropdownInput/dropdown";
import Button from "../shared/button";
import SummaryCards from "./summaryCards";
import { useSelector } from "react-redux";

const BusinessSummary = () => {

    const ordersData = useSelector((state) => state.ordersData);
    const user = useSelector((state) => state.user);
;
    const [selectedYear, setSelectedYear] = useState(2024);
    const [totalSales, setTotalSales] = useState(0);
    const [totalCustomers, setTotalCustomers] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);

    const handleSelectedYear = (val) => {
        setSelectedYear(val);
    }

    const calculateTotals = (selectedYear) => {
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

    useEffect(() => {
        calculateTotals(selectedYear);
    }, [selectedYear, ordersData]);

    const [percentageChanges, setPercentageChanges] = useState({
        sales: 0,
        customers: 0,
        orders: 0,
        products: 0
    });

    const [years, setYears] = useState([
        { value: 2024, label: 2024 },
        { value: 2023, label: 2023 },
        { value: 2022, label: 2022 },
    ]);

    useEffect(() => {
        // Function to calculate percentage change for each metric
        const calculatePercentageChanges = () => {
            let ordersForSelectedYear;
            let ordersForPreviousYear;
      
            if (selectedYear === "all") {
              ordersForSelectedYear = ordersData.filter(order => new Date(order.createdAt).getFullYear() === Math.max(...years.map(year => year.value)));
              ordersForPreviousYear = ordersData.filter(order => new Date(order.createdAt).getFullYear() === Math.min(...years.map(year => year.value)));
            } else {
              ordersForSelectedYear = ordersData.filter(order => new Date(order.createdAt).getFullYear() === parseInt(selectedYear));
              ordersForPreviousYear = ordersData.filter(order => new Date(order.createdAt).getFullYear() === parseInt(selectedYear) - 1);
            }

            const calculatePercentageChange = (currentValue, previousValue) => {
                if (previousValue > 0) {
                    return parseFloat(((currentValue - previousValue) / previousValue) * 100).toFixed(2);
                } else {
                    return parseFloat(((currentValue) / 1) * 100).toFixed(2);
                }
            };

            const percentageChanges = {
                sales: calculatePercentageChange(
                    ordersForSelectedYear.reduce((sum, order) => sum + order.grandTotal, 0),
                    ordersForPreviousYear.reduce((sum, order) => sum + order.grandTotal, 0)
                ),
                customers: calculatePercentageChange(
                    new Set(ordersForSelectedYear.map(order => order.customer)).size,
                    new Set(ordersForPreviousYear.map(order => order.customer)).size
                ),
                orders: calculatePercentageChange(
                    ordersForSelectedYear.length,
                    ordersForPreviousYear.length
                ),
                products: calculatePercentageChange(
                    new Set(ordersForSelectedYear.flatMap(order => order.products.map(product => product.productID))).size,
                    new Set(ordersForPreviousYear.flatMap(order => order.products.map(product => product.productID))).size
                )
            };

            setPercentageChanges(percentageChanges);
        };

        // Call the function to calculate percentage changes
        calculatePercentageChanges();
    }, [ordersData, selectedYear]);

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
                    <SelectDropdown name="summary" options={years} placeholder="2024" handleSelectedYear={handleSelectedYear} color="green" />
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