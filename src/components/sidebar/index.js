import React from "react";
import { AfroshopLogo } from "../../images";
import SidebarTab from "./sidebar-tab";
import SIDEBAR_TABS from "../../data/sidebar-tabs";


const AdminSidebar = () => {

    return (
        <aside className="px-6 flex flex-col w-[266px] min-h-screen max-h-screen border-r border-1 border-[#E6E6E6] justify-between bg-[#ffffff] sticky top-0 pb-4">
            <div className="mt-10 flex flex-col gap-1">
                {
                    SIDEBAR_TABS.map(({name, path}, index) => {
                        return (
                            <SidebarTab key={index} name={name} path={path}  />
                        )
                    })
                }
            </div>

            <img src={AfroshopLogo} className="w-[124px] h-[33px] mx-auto mb-4" alt="afroshop-logo"/>
        </aside>
    )
}


export default AdminSidebar;