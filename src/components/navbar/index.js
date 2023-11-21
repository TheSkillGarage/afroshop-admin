import React from "react";
import { MenuIcon, NotificationIcon, ProfilePic, SettingsIcon } from "../../images";


const AdminNavbar = () => {
    return (
        <nav className="flex justify-between p-6 border-b border-1 border-[#E6E6E6] min-h-[69px] max-h-[69px] bg-[#ffffff]">
            <div className="flex items-center gap-6">
                <MenuIcon alt="menu" className="w-[20px] h-[20px]"/>
                <p className="font-bold text-[20px] leading-[32px] text-[#186F3D]">Green Ranger</p>
            </div>

            <div className="flex gap-4 items-center">
                <NotificationIcon className="w-[20px] h-[20px]"/>
                <SettingsIcon className="w-[20px] h-[20px]"/>
                <ProfilePic className="w-[24px] h-[24px]"/>
                <p className="font-semibold text-[13px] leading-[23px] text-[#186F3D]">Ini James</p>
            </div>
        </nav>
    )
}

export default AdminNavbar;