import React from 'react';
import SummaryCards from './summaryCards';
import ProductCard from './productCard';
import CustomerCard from './customerCard';
import BaseTable from '../shared/table';
import StatusPills from '../status-pills';
import SelectDropdown from '../shared/dropdownInput/dropdown';
import Button from '../shared/button';
import ORDERS_SUMMARY from '../../data/orderSummary';
import { LineChart } from './lineChart';
import SELECT_OPTIONS from '../../data/dashboardTimeOptions';
import DASHBOARD_ORDERS_HEADERS from '../../data/dashboardHeaders';
import DASHBOARD_SUMMARY_CARDS from '../../data/dashboardSummaryCards';
import DASHBOARD_PRODUCT_CARD from '../../data/dashboardProductCard';
import DASHBOARD_CUSTOMER_CARD from '../../data/dashboardCustomerCard';

const Dashboard = () => {
  const results = ORDERS_SUMMARY.map((data) => ({
    ...data,
    id: data.id,
    status: (
      <div className="capitalize">
        <StatusPills status={data.status} name="orders" />
      </div>
    ),
  }));

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
          <div className="flex justify-between">
            <div className="flex flex-col gap-1 w-[343px]">
              <h5 className="text-xl font-bold leading-8">Welcome, Ini!</h5>
              <p className="text-base text-[#7F7F7F]">
                Here’s what’s happening in your store today
              </p>
            </div>

            <div className="flex gap-4 items-end">
              <SelectDropdown options={SELECT_OPTIONS} placeholder="2023" />
              <Button variant="primary" className="text-[13px] w-[118px]">
                View All Time
              </Button>
            </div>
          </div>

          <div className="flex gap-4">
            {DASHBOARD_SUMMARY_CARDS.map((data) => (
              <SummaryCards
                cardTitle={data.cardTitle}
                cardNumber={data.cardNumber}
                arrowImage={data.arrowImage}
                percentage={data.percentage}
                backgroundColor={data.backgroundColor}
              />
            ))}
          </div>

          <div className="flex justify-between h-[332px]">
            <div className="border-[0.5px] border-solid border-[#B3B3B3] rounded w-[830px] p-4 flex flex-col gap-4">
              <div className="flex justify-between h-10">
                <p className="font-semibold text-base">Summary</p>
                <SelectDropdown
                  options={SELECT_OPTIONS}
                  placeholder="Last 7 Days"
                />
              </div>
              <div className="h-[250px]">
                <LineChart />
              </div>
            </div>

            <div className="border-[0.5px] border-solid border-[#B3B3B3] rounded w-[320px] flex flex-col gap-4 p-4 ">
              <p className="font-semibold text-base">Top Selling Products</p>
              {DASHBOARD_PRODUCT_CARD.map((data)=>
              <ProductCard productImage={data.productImage} productName={data.productName} salesData={data.salesData}/>)}
            </div>
          </div>

          <div className="flex justify-between h-[332px]">
            <div className="border-[0.5px] border-solid border-[#B3B3B3] rounded w-[830px] py-6 px-4 flex flex-col gap-4">
              <div className="flex justify-between h-10">
                <p className="font-semibold text-base">Recent Orders</p>
                <Button variant="tertiary" className="h-[40px] w-[109px]">
                  View All
                </Button>
              </div>

              <BaseTable
                tableHeaders={DASHBOARD_ORDERS_HEADERS}
                data={results}
              />
            </div>

            <div className="border-[0.5px] border-solid border-[#B3B3B3] rounded w-[320px] flex flex-col gap-4 p-6 ">
              <p className="font-semibold text-base">Weekly Top Customers</p>
              {DASHBOARD_CUSTOMER_CARD.map((data)=>
              <CustomerCard
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
