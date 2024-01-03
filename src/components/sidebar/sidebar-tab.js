import React from "react";
import { CardIcon, OrdersIcon, OrdersIconWhite, OverviewIcon, OverviewIconWhite, PaymentsIconWhite, ProductIcon, ProductIconWhite, RolesIcon, RolesIconWhite, SupportIcon, SupportIconWhite, UserIcon, UserIconWhite } from "../../images";
import { Link, useLocation } from "react-router-dom";


const SidebarTab = ({ name, path }) => {

    const location = useLocation()

    const selectImage = (name) => {
        switch (name) {
            case "overview":
                return OverviewIcon
            case "orders":
                return OrdersIcon
            case "products":
                return ProductIcon
            case "payments":
                return CardIcon
            case "profile":
                return UserIcon
            case "roles & permissions":
                return RolesIcon
            case "support":
                return SupportIcon
            default:
                return null
        }
    }
    const isSelectedImage = (name) => {
        switch (name) {
            case "overview":
                return OverviewIconWhite
            case "orders":
                return OrdersIconWhite
            case "products":
                return ProductIconWhite
            case "payments":
                return PaymentsIconWhite
            case "profile":
                return UserIconWhite
            case "roles & permissions":
                return RolesIconWhite
            case "support":
                return SupportIconWhite
            default:
                return null
        }
    }

    return (
        <Link to={path}>
            <div
                className={`flex gap-2 mb-4 cursor-pointer py-4 px-2 rounded max-h-[47px] min-h[47px] items-center ${(location.pathname === path || location.pathname === `${path}/`) ? "bg-[#186F3D] text-[#ffffff]" : "text-[#999999]"}`}>
                <img src={(location.pathname === path || location.pathname === `${path}/`) ? isSelectedImage(name) : selectImage(name)} alt="icon" />
                <p className={`text-[13px] leading-[23px] capitalize`}>{name}</p>
            </div>
        </Link>
    )
}

export default SidebarTab;