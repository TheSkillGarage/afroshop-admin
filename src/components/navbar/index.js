import React, { useEffect, useRef, useState } from "react";
import {
  LeftArrow,
  LogoutIcon,
  MenuIcon,
  NotificationIcon,
  SettingsIcon,
  DefaultUserImage
} from "../../images";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser, sidebarToggle } from "../../redux/action";
import { renderValidUrl } from "../../utils/constants";
import OutSideClick from "../../hooks/useHandleClickOutside";
import { removeTokenFromCookie } from "../../utils";
import { sidebarToggle } from "../../redux/action";

const AdminNavbar = ({ name }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const store = useSelector((state) => state.storeData);
  const [open, setOpen] = useState(false);
  const modalRef = useRef(null);
  const isSidebarToggled = useSelector((state) => state.isSidebarToggled);
  const locationClickOutside = OutSideClick(modalRef);
  const toggleSidebar = () => {
    dispatch(sidebarToggle({ toggle: isSidebarToggled }));
  };

  useEffect(() => {
    if (locationClickOutside) {
      setOpen(false);
    }
  }, [locationClickOutside]);

  const handleLogout = () => {
    removeTokenFromCookie();
    setOpen(false);
    dispatch(logOutUser());
    navigate("/");
    dispatch(sidebarToggle({ toggle: isSidebarToggled }))
  }


  // const user = useSelector((state) => state.user)
  // const store = useSelector((state) => state.storeData)

  return (
    <nav className="flex justify-between p-6 border-b border-1 border-[#E6E6E6] min-h-[69px] max-h-[69px] bg-[#ffffff]">
      {name === "layout" ? (
        <div className="flex items-center gap-6">
          <MenuIcon
            alt="menu"
            className="w-[20px] h-[20px] cursor-pointer"
            onClick={() => toggleSidebar()}
          />
          <div className="flex">
            {store && (
              <img
                src={store ? renderValidUrl(store?.image) : ""}
                className="rounded-full h-[36px] w-[36px]"
              />
            )}
            <p className="font-bold text-[20px] leading-[32px] text-[#186F3D] ml-2">
              {store?.name ?? "--"}
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
                <img src={renderValidUrl(store?.image)} className="h-[32px] w-[32px] rounded-full"/>
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
                <img src={renderValidUrl(store?.image)} className="h-[32px] w-[32px] rounded-full"/>
              <p className="font-bold text-[20px] leading-[32px] text-[#186F3D] ml-2">
                {store?.name}
              </p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex gap-4 items-center">
        <NotificationIcon className="w-[20px] h-[20px]" />
        <div className="flex gap-4 items-center">
          <SettingsIcon className="w-[20px] h-[20px]" />
          <ProfilePic className="w-[24px] h-[24px]" />
          <div className="relative cursor-pointer">
            <p
              className="font-semibold text-[13px] leading-[23px] cursor-pointer text-[#186F3D]"
              onClick={() => setOpen(!open)}
            >
              {`${user?.firstName} ${user?.lastName}` ?? " Ini James"}
            </p>
          </div>
          {open && (
            <ul ref={modalRef} className="absolute top-14 right-7 text-[13px] bg-white text-black z-[20] rounded-lg space-y-3 w-[150px] py-2 px-4">
              <li className="cursor-pointer" onClick={() => navigate("/profile")}>Go to Profile</li>
              <li className="flex justify-between cursor-pointer">
                <p className="text-[#FF3B30]" onClick={handleLogout}>Logout</p>
                <LogoutIcon className="w-4 h-4" />
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
