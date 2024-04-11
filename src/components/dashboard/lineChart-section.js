import React, { useEffect, useState } from "react";
import SelectDropdown from "../shared/dropdownInput/dropdown";
import { LineChart } from "./lineChart";
import { useSelector } from "react-redux";
import EmptyState from "./empty-state";
import { getLineChartData } from "../../utils/OrderSummaryFunctions";
import { BeatLoader } from "react-spinners";


const LineChartComponent = ({ years, ordersData, storeData }) => {

    const [selectedYear, setSelectedYear] = useState("week");

    const [dataFilter, setDataFilter] = useState(null);

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
                {dataFilter && dataFilter.length !== 0 && <SelectDropdown
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
                    dataFilter === null &&
                    <div className="h-full">
                        <div className="w-full h-full flex justify-center items-center">
                            <BeatLoader color={'#186F3D'} loading={true} size={15} speedMultiplier={1} />
                        </div>
                    </div>
                }

                {
                    dataFilter && dataFilter.length !== 0 &&

                    <LineChart DATA={dataFilter} selectedYear={selectedYear} />
                }
                {
                    dataFilter && dataFilter.length === 0 && <EmptyState caps={"summary"} />
                }
            </div>
        </div>
    )
}


export default LineChartComponent;