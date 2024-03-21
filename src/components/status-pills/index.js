import React, { useEffect, useRef, useState } from "react";


const StatusPills = ({ name, status }) => {

    const [isStatus, setIsStatus] = useState(status)
    const [isSelected, setIsSelected] = useState(false);
    const dropdownRef = useRef(null);


    const colorOfPills = (status) => {
        switch (status?.toLowerCase()) {
            case "pending":
                return "text-[#FF9500] bg-[rgba(255,149,0,0.1)]"
            case "shipped":
                return "text-[#007AFF] bg-[rgba(0,122,255,0.1)]"
            case "draft":
                return "text-[#007AFF] bg-[rgba(0,122,255,0.1)]"
            case "delivered":
                return "text-[#34C759] bg-[rgba(52,199,89,0.1)]"
            case "active":
                return "text-[#34C759] bg-[rgba(52,199,89,0.1)]"
            case "inactive":
                return "text-[#FF3B30] bg-[#FF3B301A]"
            case "cancelled":
                return "text-[#FF3B30] bg-[rgba(255,59,48,0.1)]"
            default:
                return null
        }
    }

    useEffect(() => {
        setIsStatus(status)
    }, [status])

    const handleIsSelected = (event) => {
        event.stopPropagation();
        setIsSelected(true)
    };

    const handleStatus = (text) => {
        setIsStatus(text);
        setIsSelected(false)
    }

    const handleClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsSelected(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);


    return (
        <div className="relative">
            <p className={`w-fit py-1 px-6 rounded-[30px] ${colorOfPills(isStatus)} cursor-pointer`} onClick={handleIsSelected}>{isStatus}</p>
            {(name === "orders" && isSelected) &&
                <div className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.1)] z-[9] flex justify-center items-center">
                    <div className="w-[327px] bg-[#ffffff] max-h-[192px] rounded absolute top-[40%] right-[120px] z-[10] shadow-md status-dropdown" ref={dropdownRef}>
                        {
                            ["Pending", "Shipped", "Delivered", "Cancelled"].map((item, key) => {
                                return (
                                    <p
                                        key={key}
                                        className="w-full h-[48px] text-[16px] leading-[24px] text-[#333333] bg-[#ffffff] hover:bg-[#F2F2F2] hover:text-[#186F3D] px-4 flex items-center rounded"
                                        onClick={() => handleStatus(item.toLowerCase())}>
                                        {item}
                                    </p>
                                )
                            })
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default StatusPills;