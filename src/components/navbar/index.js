import React from "react";
import {
  GreenRangerPic,
  LeftArrow,
  MenuIcon,
  NotificationIcon,
  ProfilePic,
  SettingsIcon,
} from "../../images";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sidebarToggle } from "../../redux/action";

const AdminNavbar = ({ name }) => {

  const dispatch = useDispatch()
  const isSidebarToggled = useSelector((state) => state.isSidebarToggled)

  const toggleSidebar = () => {
    dispatch(sidebarToggle({toggle: isSidebarToggled}))
  }

  const navigate = useNavigate();

  return (
    <nav className="flex justify-between p-6 border-b border-1 border-[#E6E6E6] min-h-[69px] max-h-[69px] bg-[#ffffff]">
      {name === "layout" ? (
        <div className="flex items-center gap-6">
          <MenuIcon alt="menu" className="w-[20px] h-[20px] cursor-pointer" onClick={() => toggleSidebar()}/>
          <div className="flex">
                <img src={GreenRangerPic} className="h-[32px] w-[32px]"/>
              <p className="font-bold text-[20px] leading-[32px] text-[#186F3D] ml-2">
                Green Ranger
              </p>
              </div>
        </div>
      ) : (
        <div className="flex items-center">
          {name === "viewOrders" ? (
            <div className="flex items-center gap-6">
              <LeftArrow
                alt="menu"
                className="w-[20px] h-[20px] cursor-pointer"
                onClick={() => navigate("/orders")}
              />
              <div className="flex">
                <img src={GreenRangerPic} className="h-[32px] w-[32px]"/>
              <p className="font-bold text-[20px] leading-[32px] text-[#186F3D] ml-2">
                All Stores
              </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-[24px]">
              <LeftArrow
                alt="menu"
                className="w-[20px] h-[20px] cursor-pointer"
                onClick={() => navigate("/products")}
              />
             <div className="flex">
                <img src={GreenRangerPic} className="h-[32px] w-[32px]"/>
              <p className="font-bold text-[20px] leading-[32px] text-[#186F3D] ml-2">
                Green Ranger
              </p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex gap-4 items-center">
        <NotificationIcon className="w-[20px] h-[20px]" />
          <div  className="flex gap-4 items-center">
            <SettingsIcon className="w-[20px] h-[20px]" />
            <ProfilePic className="w-[24px] h-[24px]" />
            <p className="font-semibold text-[13px] leading-[23px] text-[#186F3D]">
              Ini James
            </p>
          </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
