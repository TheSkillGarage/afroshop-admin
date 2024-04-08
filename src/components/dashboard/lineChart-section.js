import React, { useEffect, useState } from "react";
import SelectDropdown from "../shared/dropdownInput/dropdown";
import { LineChart } from "./lineChart";
import { useSelector } from "react-redux";
import EmptyState from "./empty-state";
import { getLineChartData } from "../../utils/OrderSummaryFunctions";


const LineChartComponent = ({ years, ordersData }) => {

    const storeData = useSelector(state => state.storeData);

    const [selectedYear, setSelectedYear] = useState("week");

    const [dataFilter, setDataFilter] = useState([]);

    const handleSelectedYear = (val) => {
        setSelectedYear(val);
    }

    useEffect(() => {
        const lineData = getLineChartData(selectedYear, ordersData, storeData?.createdAt);
        setDataFilter(lineData);
      
      }, [selectedYear, ordersData, storeData?.createdAt]);
      

    return (
        <div className="border-[0.5px] border-solid border-[#B3B3B3] rounded w-[68%] px-6 py-8 flex flex-col gap-4">
            <div className="flex justify-between h-10">
                <p className="font-semibold text-base">Summary</p>
                  {dataFilter.length !== 0 && <SelectDropdown
                    name="line-chart"
                    color="green"
                    handleSelectedYear={handleSelectedYear}
                    options={[{ value: "week", label: "Last 7 days" }, ...years]}
                    placeholder="Last 7 Days"
                    className="w-[127px]"
                />}
            </div>
            <div className="h-[250px]">
                {
                    dataFilter.length !== 0 ?

                        <LineChart DATA={dataFilter} selectedYear={selectedYear} />
                        :
                        <EmptyState caps={"summary"}/>
                }
            </div>
        </div>
    )
}


export default LineChartComponent;