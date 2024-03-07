import React, { useEffect, useState } from 'react';
import ProductCard from './productCard';
import CustomerCard from './customerCard';
import BaseTable from '../shared/table';
import StatusPills from '../status-pills';
import Button from '../shared/button';
import DASHBOARD_ORDERS_HEADERS from '../../data/dashboardHeaders';
import DASHBOARD_PRODUCT_CARD from '../../data/dashboardProductCard';
import DASHBOARD_CUSTOMER_CARD from '../../data/dashboardCustomerCard';
import { useNavigate } from 'react-router-dom';

import BusinessSummary from './cards-section';
import LineChartComponent from './lineChart-section';
import { getOrdersData } from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';

const Dashboard = () => {

  const ordersData = useSelector((state) => state.ordersData);
  const [topCustomers, setTopCustomers] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  const results = ordersData.slice(0, 3).map((data) => ({
    ...data,
    id: data.id,
    status: (
      <div className="capitalize">
        <StatusPills status={data.status} name="orders" />
      </div>
    ),
  }));

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOrdersData(1))
  }, [])

  const navigate = useNavigate();


  useEffect(() => {

    // Function for aggregating top products
    const getTopProducts = () => {
      const productSalesMap = {};

      // Loop through each object in the array and aggregate product sales
      ordersData.forEach(data => {
        const { products } = data;
        products.forEach(product => {
          const { productID, name, image, price, amount } = product;

          if (!productSalesMap[productID]) {
            productSalesMap[productID] = {
              productID,
              productName: name,
              productImage: image,
              totalSales: amount
            };
          } else {
            productSalesMap[productID].totalSales += amount;
          }
        });
      });

      // Converting the aggregated product sales into a sorted array of objects
      const topProductsArray = Object.values(productSalesMap).sort((a, b) => b.totalSales - a.totalSales);

      setTopProducts(topProductsArray)
    }

    // Function to filter and aggregate customer data
    const getTopCustomers = () => {

      const currentDate = new Date();
      const sevenDaysAgo = new Date(currentDate);
      sevenDaysAgo.setDate(currentDate.getDate() - 7);

      // Filter ordersData to include only orders within the last 7 days
      const weeklyData = ordersData.filter(data => {
        const orderDate = new Date(data.createdAt);
        return orderDate >= sevenDaysAgo && orderDate <= currentDate;
      });

      // Creating an array of top customers
      const customerDetails = {};

      weeklyData.forEach(data => {

        const { customer, firstName, lastName, email, customerProfileURL } = data;

        if (!customerDetails[customer]) {
          customerDetails[customer] = {
            customerID: customer,
            name: `${firstName} ${lastName}`,
            email: email,
            image: customerProfileURL,
            orders: 1
          };
        } else {
          customerDetails[customer].orders++;
        }
      });

      // Converting the aggregated customer data into an array of objects
      const customerArray = Object.values(customerDetails).sort((a, b) => b.orders - a.orders);

      setTopCustomers(customerArray);
    };

    getTopProducts();
    getTopCustomers();
  }, [ordersData]);

  return (
    <div className="bg-[#F2F2F2] w-full pt-6 pb-8 px-4">
      <div className="flex items-center gap-8 mb-6 h-[39px]">
        <p className="text-[rgba(48,48,48,0.4)] font-medium text-[14px] leading-[16.8px] -tracking[16%] font-['Lato']">
          ...
        </p>
        <p className="text-[13px] leading-[23px] text-[#186F3D]">Overview</p>
      </div>

      <div className="bg-[rgb(255,255,255)] h-[1100px] border rounded-md py-8 px-5 ">
        <div className=" w-[98%] flex flex-col gap-8 ">

          <BusinessSummary />

          {/* --------------Line chart and Top products-------------- */}
          <div className="flex justify-between h-[332px]">

            <LineChartComponent />

            <div className="border-[0.5px] border-solid border-[#B3B3B3] rounded w-[30%] flex flex-col gap-4 p-4 ">
              <p className="font-semibold text-base">Top Selling Products</p>
              {topProducts.slice(0, 3).map((data, key) =>
                <ProductCard data={data} key={key} />)}
            </div>
          </div>

          {/* --------------Table and Top customers---------------- */}
          <div className="flex justify-between h-[332px]">
            <div className="border-[0.5px] border-solid border-[#B3B3B3] rounded w-[68%] py-6 px-4 flex flex-col gap-4">
              <div className="flex justify-between h-10">
                <p className="font-semibold text-base">Recent Orders</p>
                <Button variant="tertiary" className="h-[40px] w-[109px]" onClick={() => navigate("/orders")}>
                  View All
                </Button>
              </div>

              <BaseTable
                name="orders"
                tableHeaders={DASHBOARD_ORDERS_HEADERS}
                data={results}
              />
            </div>

            <div className="border-[0.5px] border-solid border-[#B3B3B3] rounded w-[30%] flex flex-col gap-4 p-4 ">
              <p className="font-semibold text-base">Weekly Top Customers</p>
              {topCustomers.slice(0, 3).map((data, key) =>
                <CustomerCard key={key} data={data} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
