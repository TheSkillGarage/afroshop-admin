import React from "react";
import { CardIcon, Earnings, EarningsGrey, OrdersIcon, OrdersIconWhite, OverviewIcon, OverviewIconWhite, PaymentsIconWhite, ProductIcon, ProductIconWhite, RolesIcon, RolesIconWhite, SupportIcon, SupportIconWhite, UserIcon, UserIconWhite } from "../../images";
import { Link, useLocation } from "react-router-dom";


const SidebarTab = ({ name, path, isSidebarToggled }) => {

    const location = useLocation()

    const selectImage = (name) => {
        switch (name) {
            case "overview":
                return OverviewIcon
            case "orders":
                return OrdersIcon
            case "products":
                return ProductIcon
            case 'earnings':
                return EarningsGrey
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
            case "earnings":
                return Earnings
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
                className={`${isSidebarToggled ? "justify-center" : ''} flex gap-2 mb-4 cursor-pointer py-4 px-2 rounded max-h-[47px] min-h[47px] items-center ${(location.pathname === path || location.pathname === `${path}/`) ? "bg-[#186F3D] text-[#ffffff]" : "text-[#999999]"}`}>
                <img src={(location.pathname === path || location.pathname === `${path}/`) ? isSelectedImage(name) : selectImage(name)} alt="icon" />
                {!isSidebarToggled && <span className={`text-[13px] leading-[23px] capitalize text-nowrap`}>{name}</span>}
            </div>
        </Link>
    )
}

export default SidebarTab;