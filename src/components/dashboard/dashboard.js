import React from 'react';
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
import ORDERS_DATA from '../../data/orders';

const Dashboard = () => {
  const results = ORDERS_DATA.slice(-3).map((data) => ({
    ...data,
    id: data.id,
    status: (
      <div className="capitalize">
        <StatusPills status={data.status} name="orders" />
      </div>
    ),
  }));

  const navigate = useNavigate();

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
              {DASHBOARD_PRODUCT_CARD.map((data, key) =>
                <ProductCard productImage={data.productImage} productName={data.productName} salesData={data.salesData} key={key}/>)}
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
                tableHeaders={DASHBOARD_ORDERS_HEADERS}
                data={results}
              />
            </div>

            <div className="border-[0.5px] border-solid border-[#B3B3B3] rounded w-[30%] flex flex-col gap-4 p-4 ">
              <p className="font-semibold text-base">Weekly Top Customers</p>
              {DASHBOARD_CUSTOMER_CARD.map((data, key) =>
                <CustomerCard key={key}
                  customerImage={data.customerImage}
                  customerName={data.customerName}
                  customerEmail={data.customerEmail}
                  numberOrders={data.numberOrders}
                />)}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
