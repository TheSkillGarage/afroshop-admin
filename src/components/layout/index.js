import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdminNavbar from "../navbar";
import AdminSidebar from "../sidebar";
import { getTokenFromCookie, removeTokenFromCookie } from "../../utils";
import useIdleActivityTimer from "../../hooks/useIdleTimer";
import {
  getOrdersData,
  getStoreData,
  logOutUser,
  setStoreExistStatus,
  getProductData,
} from "../../redux/action";
// import { logOutUser, setStoreExistStatus } from "../../redux/action";

const PageLayout = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  //  handling API calls
  const token = getTokenFromCookie();
  const user = useSelector((state) => state.user);
  const storeData = useSelector((state) => state.store);

  useEffect(() => {
    if (user && user.id) {
      dispatch(getStoreData(user?.id, token));
    }
  }, [user, token, location.pathname, dispatch]);

  useEffect(() => {
    if (storeData && storeData.id) {
      if (location.pathname === "/products") {
        dispatch(getProductData(storeData.id, token));
      }
      if (location.pathname === "/orders") {
        dispatch(getOrdersData(storeData.id, token));
      }
    }
  }, [storeData, location.pathname, token, dispatch, user]);

  useEffect(() => {
    if (Object.keys(storeData).length > 0) {
      dispatch(setStoreExistStatus(true));
    } else {
      dispatch(setStoreExistStatus(false));
    }
  }, [storeData, dispatch]);
  /*

    This section handles user Inactivity after 20mins

  */

  // idle logout during idle state
  const handleIdle = () => {
    removeTokenFromCookie();
    console.log("logged out because of inactivity");
    dispatch(logOutUser());
  };

  const handleActive = () => {
    idleTimer.reset();
  };

  const idleTimer = useIdleActivityTimer(handleIdle, handleActive, 20);

  /*

  This section handles Token expiry after 1hour
  This section handles redirect for authenticated pages

  */
  useEffect(() => {
    if (isAuthenticated) {
      const intervalId = setInterval(() => {
        const token = getTokenFromCookie();
        const isCookieExpired = !token;
        if (isCookieExpired) {
          console.log("logged out because token expired");
          dispatch(logOutUser()); // Dispatch the logout action when the cookie expires
        }
      }, 60000);
      return () => {
        clearInterval(intervalId); // Clear the interval on component unmount
      };
    } else {
      navigate("/login");
    }
  }, [isAuthenticated, dispatch, navigate]);

  return (
    <section className="bg-[#F2F2F2] h-[100vh]">
      <AdminNavbar name={"layout"} />

      <div className="flex ">
        <AdminSidebar />
        <div className="bg-white w-full h-full overflow-auto no-scrollbar flex flex-col gap-[60px] md:gap-[80px] large-screen">
          {children}
        </div>
      </div>
    </section>
  );
};

export default PageLayout;
