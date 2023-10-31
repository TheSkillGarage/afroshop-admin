import React, { useState } from "react";
import { AfroshopLogo, CardIcon, OrdersIcon, OrdersIconWhite, OverviewIcon, ProductIcon, ProductIconWhite, RolesIcon, SupportIcon, UserIcon } from "../../images";
import SidebarTab from "./sidebar-tab";


const AdminSidebar = () => {
    const [isSelected, setIsSelected] = useState('');

    const handleSelection = (tab) => {
        setIsSelected(tab)
    }
    return (
        <aside className="pt-6 px-6 flex flex-col w-[266px] border-r border-1 border-[#E6E6E6] justify-between min-h-[calc(100vh-69px)] fixed">
            <div className="">

                <SidebarTab name="overview" image={OverviewIcon} isSelected={isSelected} handleSelection={handleSelection}/>
                <SidebarTab name="orders" image={isSelected === "orders" ? OrdersIconWhite : OrdersIcon} isSelected={isSelected} handleSelection={handleSelection}/>
                <SidebarTab name="products" image={isSelected === "products" ? ProductIconWhite : ProductIcon} isSelected={isSelected} handleSelection={handleSelection}/>
                <SidebarTab name="payments" image={CardIcon} isSelected={isSelected} handleSelection={handleSelection}/>
                <SidebarTab name="profile" image={UserIcon} isSelected={isSelected} handleSelection={handleSelection}/>
                <SidebarTab name="roles & permissions" image={RolesIcon} isSelected={isSelected} handleSelection={handleSelection}/>
                <SidebarTab name="support" image={SupportIcon} isSelected={isSelected} handleSelection={handleSelection}/>
            </div>

            <img src={AfroshopLogo} className="w-[124px] h-[33px] mx-auto mb-6" />
        </aside>
    )
}


export default AdminSidebar;