import React from "react";
import { AfroshopLogo, LogoImage } from "../../images";
import SidebarTab from "./sidebar-tab";
import SIDEBAR_TABS from "../../data/sidebar-tabs";
import { useSelector } from "react-redux";


const AdminSidebar = () => {

    const isSidebarToggled = useSelector((state) => state.isSidebarToggled)

    return (
        <aside className={`px-6 flex flex-col ${isSidebarToggled ? "w-[92px]" : "w-[266px]"} min-h-[620px] h-full border-r border-1 border-[#E6E6E6] justify-between bg-[#ffffff] pb-4`}>
            <div className="mt-10 flex flex-col gap-1">
                {
                    SIDEBAR_TABS.map(({ name, path }, index) => {
                        return (
                            <SidebarTab key={index} name={name} path={path} isSidebarToggled={isSidebarToggled} />
                        )
                    })
                }
            </div>

            {isSidebarToggled ? <img src={LogoImage} className="w-10 h-10 mx-auto mb-4" alt="afroshop-logo" />
                :
                <img src={AfroshopLogo} className="w-[124px] h-[33px] mx-auto mb-4" alt="afroshop-logo" />
            }
        </aside>
    )
}


export default AdminSidebar;