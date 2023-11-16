import React, { useState } from "react";
import { AfroshopLogo } from "../../images";
import SidebarTab from "./sidebar-tab";


const AdminSidebar = ({ handleTabs }) => {
    const [isSelected, setIsSelected] = useState('overview');

    const handleSelection = (tab) => {
        setIsSelected(tab);
        handleTabs(tab);
    }
    return (
        <aside className="pt-6 px-6 flex flex-col w-[266px] border-r border-1 border-[#E6E6E6] justify-between bg-[#ffffff] mb-6">
            <div className="mt-8">
                {
                    ["overview", "orders", "products", "payments", "profile", "roles & permissions", "support"].map((item, index) => {
                        return (
                            <SidebarTab key={index} name={item} isSelected={isSelected} handleSelection={handleSelection} />
                        )
                    })
                }
            </div>

            <img src={AfroshopLogo} className="w-[124px] h-[33px] mx-auto mb-4" alt="afroshop-logo"/>
        </aside>
    )
}


export default AdminSidebar;