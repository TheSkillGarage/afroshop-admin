import React, { useEffect, useRef, useState } from "react";
import { getTokenFromCookie } from "../../utils";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersData, putRequest } from "../../redux/action";


const StatusPills = ({ name, status, id, deliveryOption }) => {

    const [isSelected, setIsSelected] = useState(false);
    const dropdownRef = useRef(null);

    const options = deliveryOption === null || deliveryOption === undefined ?
        []
        :
        deliveryOption ?
            ["Pending", "Shipped", "Delivered", "Cancelled"]
            :
            ["Pending", "Ready for Pickup", "Picked Up", "Cancelled"]


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
            case "ready for pickup":
                return "text-[#007AFF] bg-[rgba(0,122,255,0.1)]"
            case "picked up":
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

    const handleIsSelected = (event) => {
        event.stopPropagation();
        setIsSelected(true)
    };

    const dispatch = useDispatch()
    const token = getTokenFromCookie();
    const storeData = useSelector((state) => state.store);

    const handleStatus = async (status, currentStatus) => {
        setIsSelected(false)

        const allowedTransitions = {
            Pending: ['Shipped', 'Ready for Pickup', 'Cancelled'],
            'Ready for Pickup': ['Picked Up'],
            Shipped: ['Delivered'],
            'Picked Up': [],
            Delivered: [],
            Cancelled: []
        };

        try {
            if (!allowedTransitions[currentStatus].includes(status)) {
                toast.error(`Invalid status transition from ${currentStatus} to ${status}`, { autoClose: 2000 });
                return;
            }

            const [success, responseData] = await putRequest(`/api/orders/${id}`, { status: status }, token);

            if (!success || responseData?.error) {
                toast.error(
                    `${responseData?.error?.message || "An error occurred, please try again"
                    }`,
                    { autoClose: 2000 }
                );

                throw new Error(responseData?.error);
            } else {
                dispatch(getOrdersData(storeData.id, token));
                toast.success(`Order status updated successfully`, { autoClose: 2000 });
            }
        } catch (error) {
            console.error(error);
        }
    };


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
            <p className={`w-fit py-1 px-6 rounded-[30px] ${colorOfPills(status)} cursor-pointer`} onClick={handleIsSelected}>
                {
                    (["Ready for Pickup", "Picked Up"].includes(status))
                        ?
                        status === "Ready for Pickup"
                            ?
                            "Ready"
                            :
                            "Picked"
                        :
                        status
                }
            </p>
            {(name === "orders" && isSelected) &&
                <div className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.1)] z-[9] flex justify-center items-center">
                    <div className="w-[327px] bg-[#ffffff] max-h-[192px] rounded absolute top-[40%] right-[120px] z-[10] shadow-md status-dropdown" ref={dropdownRef}>
                        {
                            options.map((item, key) => {
                                return (
                                    <p
                                        key={key}
                                        className="w-full h-[48px] text-[16px] leading-[24px] text-[#333333] bg-[#ffffff] hover:bg-[#F2F2F2] hover:text-[#186F3D] px-4 flex items-center rounded cursor-pointer"
                                        onClick={() => handleStatus(item, status)}>
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
