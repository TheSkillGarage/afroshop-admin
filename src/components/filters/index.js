import React from "react";


const Filters = ({ filters, activeTab, handleActiveTab }) => {


    const filterWidth = (filter) => {
        switch (filter) {
            case "all":
                return "w-[49px]"
            case "shipped":
                return "w-[84px]"
            case "pending":
                return "w-[84px]"
            case "processing":
                return "w-[92px]"
            case "ready for pickup":
                return "w-[125px]"
            case "picked up":
                return "w-[92px]"
            case "delivered":
                return "w-[92px]"
            case "cancelled":
                return "w-[94px]"
            case "active":
                return "w-[72px]"
            case "draft":
                return "w-[72px]"
            default:
                return null
        }
    }

    return (
        <div>
            <div className="bg-[#ffffff] w-fit h-[32px] flex items-center rounded">
                {filters.map((filter, key) => {
                    return (
                        <p key={key}
                            className={`${activeTab === filter ? "text-[#333333] font-semibold" : "text-[#999999]"} capitalize text-[13px] leading-[23px] h-full ${filterWidth(filter)} flex items-center justify-center cursor-pointer`}
                            onClick={() => handleActiveTab(filter)}
                        >
                            {filter !== "draft" ? filter : "drafts"}
                        </p>
                    )
                })}
            </div>

            <div className="bg-[#ffffff] rounded-2xl mt-1 flex">
                {
                    filters.map((filter, key) => {
                        return <div key={key} className={`h-[4px] ${filterWidth(filter)} rounded-2xl ${activeTab === filter ? "bg-[#FCAE17]" : "bg-[#ffffff]"}`}></div>
                    })
                }
            </div>
        </div>
    )
}


export default Filters;