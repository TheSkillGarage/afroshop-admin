import React from "react";
import SelectDropdown from "../shared/dropdownInput/dropdown";
import { LineChart } from "./lineChart";
import EmptyState from "./empty-state";


const LineChartComponent = ({ years, selectedYear, handleSelectedYear, dataFilter }) => {

    return (
        <div className="border-[0.5px] border-solid border-[#B3B3B3] rounded w-[68%] px-6 py-8 flex flex-col gap-4">
            <div className="flex justify-between h-10">
                <p className="font-semibold text-base">Summary</p>
                {dataFilter && <SelectDropdown
                    name="line-chart"
                    color="green"
                    handleSelectedYear={handleSelectedYear}
                    options={[{ value: "week", label: "Last 7 days" }, ...years]}
                    placeholder="Last 7 Days"
                    className="w-[150px]"
                />}
            </div>
            <div className="h-[250px]">
                {
                    dataFilter ?
                        <LineChart {...dataFilter} selectedYear={selectedYear} />
                        :
                        <EmptyState caps={"summary"} />
                }
            </div>
        </div>
    )
}


export default LineChartComponent;