import React, { useEffect, useState } from "react";
import SelectDropdown from "../shared/dropdownInput/dropdown";
import SELECT_OPTIONS from "../../data/dashboardTimeOptions";
import { LineChart } from "./lineChart";
import { OVERVIEW_DATA } from "../../data";
import { useSelector } from "react-redux";

const LineChartComponent = () => {

    const ordersData = useSelector(state => state.ordersData);

    const [selectedYear, setSelectedYear] = useState("week");
    const [dataFilter, setDataFilter] = useState([]);

    const handleSelectedYear = (val) => {
        setSelectedYear(val);
    }

    useEffect(() => {
        if (selectedYear === "week") {
            const currentDate = new Date();

            // Calculating the date 7 days ago
            const sevenDaysAgo = new Date(currentDate);
            sevenDaysAgo.setDate(currentDate.getDate() - 7);

            // Filtering the data for the last 7 days
            const last7DaysData = ordersData.filter(entry => {
                const entryDate = new Date(entry.createdAt);
                return entryDate >= sevenDaysAgo && entryDate <= currentDate;
            });

            setDataFilter(last7DaysData.reverse());
        } else {
            let yearData = ordersData.filter(entry => {
                const entryYear = new Date(entry.createdAt).getFullYear();
                return entryYear === parseInt(selectedYear);
            })

            setDataFilter(yearData.reverse());
        }
    }, [selectedYear, ordersData])


    return (
        <div className="border-[0.5px] border-solid border-[#B3B3B3] rounded w-[68%] p-4 flex flex-col gap-4">
            <div className="flex justify-between h-10">
                <p className="font-semibold text-base">Summary</p>
                <SelectDropdown
                    name="line-chart"
                    color="green"
                    handleSelectedYear={handleSelectedYear}
                    options={SELECT_OPTIONS}
                    placeholder="Last 7 Days"
                    className="w-[127px]"
                />
            </div>
            <div className="h-[250px]">
                <LineChart DATA={dataFilter} selectedYear={selectedYear}/>
            </div>
        </div>
    )
}


export default LineChartComponent;