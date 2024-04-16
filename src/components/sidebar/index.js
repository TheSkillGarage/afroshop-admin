import React from "react";
import { useDispatch } from "react-redux";
import { AfroshopLogo, LogoImage, LogoutIcon } from "../../images";
import SidebarTab from "./sidebar-tab";
import SIDEBAR_TABS from "../../data/sidebar-tabs";
import { useSelector } from "react-redux";
import { logOutUser } from "../../redux/action";
import { removeTokenFromCookie } from "../../utils";

const AdminSidebar = () => {
  const isSidebarToggled = useSelector((state) => state.isSidebarToggled);
  const dispatch = useDispatch();

  const handleUserLogOut = () => {
    removeTokenFromCookie();
    dispatch(logOutUser());
  };

  return (
    <aside
      className={`px-6 flex flex-col ${
        isSidebarToggled ? "w-[92px]" : "w-[266px]"
      } min-h-[620px] h-full border-r border-1 border-[#E6E6E6] justify-between bg-[#ffffff] pb-4`}
    >
      <div className="mt-10 flex flex-col gap-1">
        {SIDEBAR_TABS.map(({ name, path }, index) => {
          return (
            <SidebarTab
              key={index}
              name={name}
              path={path}
              isSidebarToggled={isSidebarToggled}
            />
          );
        })}
      </div>
      <div>
        <div
          className="w-full flex items-center justify-between mb-12 cursor-pointer"
          onClick={handleUserLogOut}
        >
          {!isSidebarToggled && (
            <p className="text-[13px] text-[#FF3B30]">Log Out</p>
          )}
          <img src={LogoutIcon} alt="log-out-icon" />
        </div>
        <img
          src={isSidebarToggled ? LogoImage : AfroshopLogo}
          className={
            isSidebarToggled
              ? "w-10 h-10 mx-auto mb-4"
              : "w-[124px] h-[33px] mx-auto mb-4"
          }
          alt="afroshop-logo"
        />
      </div>
    </aside>
  );
};

export default AdminSidebar;
