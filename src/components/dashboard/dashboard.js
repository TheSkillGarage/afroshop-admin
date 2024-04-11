import React, { useEffect, useState } from 'react';
import ProductCard from './productCard';
import CustomerCard from './customerCard';
import BaseTable from '../shared/table';
import StatusPills from '../status-pills';
import Button from '../shared/button';
import DASHBOARD_ORDERS_HEADERS from '../../data/dashboardHeaders';
import { useNavigate } from 'react-router-dom';

import BusinessSummary from './cards-section';
import LineChartComponent from './lineChart-section';
import { useSelector } from 'react-redux';
import { extractYears } from '../../utils/extract-years';
import EmptyState from './empty-state';
import { getLineChartData, getTopCustomers, getTopProducts } from '../../utils/OrderSummaryFunctions';
import { BeatLoader } from 'react-spinners';

const Dashboard = () => {
  const ordersData = useSelector((state) => state.ordersData);
  const storeData = useSelector((state) => state.storeData);

  const [topCustomers, setTopCustomers] = useState(null);
  const [topProducts, setTopProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataFilter, setDataFilter] = useState(null);
  const [selectedYear, setSelectedYear] = useState("week");


  const handleSelectedYear = (val) => {
    setSelectedYear(val);
  }
  const years = extractYears(storeData?.createdAt);

  const navigate = useNavigate();

  let results = [];
  if (Array.isArray(ordersData)) {
    results = ordersData.slice(0, 3).map((data) => ({
      ...data,
      id: data.id,
      status: (
        <div className="capitalize">
          <StatusPills status={data.status} name="orders" />
        </div>
      ),
    }));
  }


  useEffect(() => {
    setTopProducts(getTopProducts(ordersData));
    setTopCustomers(getTopCustomers(ordersData));
  }, [ordersData, storeData]);

  useEffect(() => {
    if (topCustomers !== null && topProducts !== null && ordersData !== null && dataFilter !== null) {
      setLoading(false);
    }
  }, [topCustomers, topProducts, ordersData, dataFilter]);


  useEffect(() => {
    const lineData = getLineChartData(selectedYear, ordersData, storeData?.createdAt);
    setDataFilter(lineData);

  }, [selectedYear, ordersData, storeData?.createdAt]);

  return (
    <>
      {!loading ?
        <div className="bg-[#F2F2F2] w-full pt-6 pb-8 px-4">
          <div className="flex items-center gap-8 mb-6 h-[39px]">
            <p className="text-[rgba(48,48,48,0.4)] font-medium text-[14px] leading-[16.8px] -tracking[16%] font-['Lato']">
              ...
            </p>
            <p className="text-[13px] leading-[23px] text-[#186F3D]">Overview</p>
          </div>

          <div className="bg-[rgb(255,255,255)] border rounded-md py-8 px-5 ">
            <div className=" w-[98%] flex flex-col gap-8 ">

              <BusinessSummary years={years} ordersData={ordersData} />

              {/* --------------Line chart and Top products-------------- */}
              <div className={`flex justify-between ${ordersData?.length > 0 ? "min-h-[332px]" : "min-h-[343px]"}`}>

                <LineChartComponent years={years} ordersData={ordersData} storeData={storeData} selectedYear={selectedYear} handleSelectedYear={handleSelectedYear} dataFilter={dataFilter} />

                <div className="border-[0.5px] border-solid border-[#B3B3B3] rounded w-[30%] flex flex-col gap-4 px-6 py-8">
                  <p className="font-semibold text-base">Top Selling Products</p>
                  {topProducts?.length !== 0 ? topProducts?.slice(0, 3).map((data, key) =>
                    <ProductCard data={data} key={key} />)
                    :
                    <EmptyState caps={"top selling products"} />
                  }
                </div>
              </div>

              {/* --------------Table and Top customers---------------- */}
              <div className={`flex justify-between ${ordersData?.length > 0 ? "min-h-[332px]" : "min-h-[343px]"}`}>
                <div className="border-[0.5px] border-solid border-[#B3B3B3] rounded w-[68%] py-8 px-6 flex flex-col gap-4">
                  <div className="flex justify-between h-10">
                    <p className="font-semibold text-base">Recent Orders</p>
                    {ordersData?.length > 0 &&
                      <Button variant="tertiary" className="h-[40px] w-[109px]" onClick={() => navigate("/orders")}>
                        View All
                      </Button>}
                  </div>

                  {ordersData?.length > 0 ?
                    <BaseTable
                      name="orders"
                      tableHeaders={DASHBOARD_ORDERS_HEADERS}
                      data={results}
                    />
                    :
                    <EmptyState caps={"recent orders"} />
                  }
                </div>

                <div className="border-[0.5px] border-solid border-[#B3B3B3] rounded w-[30%] flex flex-col gap-4 px-6 py-8">
                  <p className="font-semibold text-base">Weekly Top Customers</p>
                  {topCustomers?.length > 0 ? topCustomers.slice(0, 3).map((data, key) =>
                    <CustomerCard key={key} data={data} />)
                    :
                    <EmptyState caps={"weekly top customers"} />
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        :
        <div className="h-screen bg-[#ffffff] flex justify-center items-center">
          <div className='h-full w-full flex justify-center items-center mb-6'>
            <div className="w-full flex justify-center items-center">
              <BeatLoader color={'#186F3D'} loading={true} size={25} speedMultiplier={1} />
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Dashboard;
