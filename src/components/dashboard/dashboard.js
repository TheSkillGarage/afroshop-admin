import React, { useState } from 'react';
import DropdownSelect from '../shared/dropdown';
import SummaryCards from './summaryCards';
import { ArrowDown, ArrowUp, BonelessChicken, CustomerImage1, CustomerImage2, CustomerImage3, Fruit, PeachMilk } from '../../images';
import ProductCard from './productCard';
import CustomerCard from './customerCard';
import BaseTable from '../shared/table';
import StatusPills from '../status-pills';
import SelectDropdown from '../shared/dropdown';
import Button from '../shared/button';
import ORDERS_SUMMARY from '../../data/orderSummary';
import {LineChart} from './lineChart';


const Dashboard = () => {
  
  const options = [
    { value: 2023, label: 2023 },
    { value: 2022, label: 2022 },
    { value: 2021, label: 2021 },
  ];

  const headers = [
    {
      id: "orderID",
      name: "order ID",
      width: "15%",
    },
    {
      id: "orderDate",
      name: "order Date",
      width: "15%",
    },
    {
      id: "customer",
      name: "customer",
      width: "15%",
    },
    {
      id: "price",
      name: "price",
      width: "15%",
    },
    {
      id: "items",
      name: "items",
      width: "15%",
    },
    {
      id: "status",
      name: "Status",
      width: "15%",
    },
  ];

  const results = ORDERS_SUMMARY.map((data) => ({
    ...data,
    id: data.id,
    status: (
      <div className="capitalize">
        <StatusPills status={data.status} name="orders" />
      </div>
    )
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
              <DropdownSelect options={options} placeholder="2023" />
              <Button variant= "primary" className="text-[13px] w-[118px]">
                View All Time
              </Button>
            </div>
          </div>

          <div className="flex gap-4">
            <SummaryCards
              cardTitle="Total Sales"
              cardNumber="$320,235"
              arrowImage={ArrowUp}
              percentage="15%"
              backgroundColor="#FF950026"
            />
            <SummaryCards
              cardTitle="Customers"
              cardNumber="1,010"
              arrowImage={ArrowUp}
              percentage="30%"
              backgroundColor="#007AFF26"
            />
            <SummaryCards
              cardTitle="Total Orders"
              cardNumber="459"
              arrowImage={ArrowDown}
              percentage="15%"
              backgroundColor="#FFD60A26"
            />
            <SummaryCards
              cardTitle="Total Products"
              cardNumber="123"
              arrowImage={ArrowUp}
              percentage="1.2%"
              backgroundColor="#34C75926"
            />
          </div>

          <div className='flex justify-between h-[332px]'>
            <div className='border-[0.5px] border-solid border-[#B3B3B3] rounded w-[830px] p-4 flex flex-col gap-4'>
              <div className='flex justify-between h-10'>
                  <p className='font-semibold text-base'>Summary</p>
                  <SelectDropdown options={options} field="summary" placeholder= "Last 7 Days" />
              </div>
              <div className='h-[250px]'>
                <LineChart />
              </div>                          
            </div>

            <div className='border-[0.5px] border-solid border-[#B3B3B3] rounded w-[320px] flex flex-col gap-4 p-4 '>
               <p className='font-semibold text-base'>Top Selling Products</p>
               <ProductCard productImage={PeachMilk} productName= "Peak Milk Full Cream Powder Pouch" salesData= "124 Sales"/>
               <ProductCard productImage={BonelessChicken} productName= "Boneless Chicken Breasts with Rib Meat" salesData= "124 Sales"/>
               <ProductCard productImage={Fruit} productName= "Palm Fruit (Kernel)" salesData= "124 Sales"/>
            </div>
          </div>

          <div className='flex justify-between h-[332px]'>
          <div className='border-[0.5px] border-solid border-[#B3B3B3] rounded w-[830px] py-6 px-4 flex flex-col gap-4'>
              <div className='flex justify-between h-10'>
                  <p className='font-semibold text-base'>Recent Orders</p>
                  <Button variant= "tertiary" className="h-[40px] w-[109px]">
                    View All
                  </Button>                  
              </div>

              <BaseTable tableHeaders={headers} data={results} />
          </div>

            <div className='border-[0.5px] border-solid border-[#B3B3B3] rounded w-[320px] flex flex-col gap-4 p-6 '>
               <p className='font-semibold text-base'>Weekly Top Customers</p>
               <CustomerCard customerImage= {CustomerImage1} customerName= "Paityn Dokidis" customerEmail = "paitynd@gmail.com" numberOrders= "54 orders"/>
               <CustomerCard customerImage= {CustomerImage2} customerName= "Skylar Dowarts" customerEmail = "skyd@gmail.com" numberOrders= "43 orders"/>
               <CustomerCard customerImage= {CustomerImage3} customerName= "Jacob Vetrovs" customerEmail = "jacobv@gmail.com" numberOrders= "22 orders"/>
          </div>          
        </div>

      </div>
      </div>
    </div>
  );
};

export default Dashboard;
