import React from "react";


const StatusPills = ({status}) => {

    const colorOfPills = (status) => {
        switch (status) {
            case "pending":
                return "text-[#FF9500] bg-[rgba(255,149,0,0.1)]"
            case "shipped" || "draft":
                return "text-[#007AFF] bg-[rgba(0,122,255,0.1)]"
            case"delivered" || "active":
                return "text-[#34C759] bg-[rgba(52,199,89,0.1)]"
            default:
                return "text-[#FF3B30] bg-[rgba(255,59,48,0.1)]"
        }
    }

    return (
        <p
            className={`w-fit py-1 px-6 rounded-[30px] ${colorOfPills(status)} cursor-pointer`}>{status}</p>
    )
}

export default StatusPills;