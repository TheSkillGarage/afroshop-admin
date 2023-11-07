import React, { useState } from "react";
import { AfroshopLogo, CardIcon, OrdersIcon, OrdersIconWhite, OverviewIcon, OverviewIconWhite, PaymentsIconWhite, ProductIcon, ProductIconWhite, RolesIcon, RolesIconWhite, SupportIcon, SupportIconWhite, UserIcon, UserIconWhite } from "../../images";
import SidebarTab from "./sidebar-tab";


const AdminSidebar = ({handleTabs}) => {
    const [isSelected, setIsSelected] = useState('overview');

    const handleSelection = (tab) => {
        setIsSelected(tab);
        handleTabs(tab);
    }
    return (
        <aside className="pt-6 px-6 flex flex-col w-[266px] border-r border-1 border-[#E6E6E6] justify-between bg-[#ffffff] mb-6">
            <div className="mt-8">

                <SidebarTab name="overview" image={OverviewIcon} selectedImage={OverviewIconWhite} isSelected={isSelected} handleSelection={handleSelection}/>
                <SidebarTab name="orders" image={OrdersIcon} selectedImage={OrdersIconWhite}  isSelected={isSelected} handleSelection={handleSelection}/>
                <SidebarTab name="products" image={ProductIcon} selectedImage={ProductIconWhite} isSelected={isSelected} handleSelection={handleSelection}/>
                <SidebarTab name="payments" image={CardIcon} selectedImage={PaymentsIconWhite} isSelected={isSelected} handleSelection={handleSelection}/>
                <SidebarTab name="profile" image={UserIcon} selectedImage={UserIconWhite} isSelected={isSelected} handleSelection={handleSelection}/>
                <SidebarTab name="roles & permissions" image={RolesIcon} selectedImage={RolesIconWhite} isSelected={isSelected} handleSelection={handleSelection}/>
                <SidebarTab name="support" image={SupportIcon} selectedImage={SupportIconWhite} isSelected={isSelected} handleSelection={handleSelection}/>
            </div>

            <img src={AfroshopLogo} className="w-[124px] h-[33px] mx-auto mb-4" />
        </aside>
    )
}


export default AdminSidebar;