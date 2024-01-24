import React, { useEffect, useState } from "react";
import SelectDropdown from "../shared/dropdownInput/dropdown";
import SELECT_OPTIONS from "../../data/dashboardTimeOptions";
import { LineChart } from "./lineChart";
import { OVERVIEW_DATA } from "../../data";

const LineChartComponent = () => {

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
            const last7DaysData = OVERVIEW_DATA.filter(entry => {
                const entryDate = new Date(entry.date);
                return entryDate >= sevenDaysAgo && entryDate <= currentDate;
            });

            setDataFilter(last7DaysData);
        } else {
            let yearData = OVERVIEW_DATA.filter(entry => {
                const entryYear = new Date(entry.date).getFullYear();
                return entryYear === parseInt(selectedYear);
            })

            setDataFilter(yearData);
        }
    }, [selectedYear])


    return (
        <div className="border-[0.5px] border-solid border-[#B3B3B3] rounded w-[68%] p-4 flex flex-col gap-4">
            <div className="flex justify-between h-10">
                <p className="font-semibold text-base">Summary</p>
                <SelectDropdown
                    name="line-chart"
                    handleSelectedYear={handleSelectedYear}
                    options={SELECT_OPTIONS}
                    placeholder="Last 7 Days"
                    className="w-[127px]"
                />
            </div>
            <div className="h-[250px]">
                <LineChart DATA={dataFilter} />
            </div>
        </div>
    )
}


export default LineChartComponent;