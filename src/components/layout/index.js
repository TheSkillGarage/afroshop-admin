import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdminNavbar from "../navbar";
import AdminSidebar from "../sidebar";
import { getTokenFromCookie, removeTokenFromCookie } from "../../utils";
import useIdleActivityTimer from "../../hooks/useIdleTimer";
import {
  getOrdersData,
  getStoresData,
  logOutUser,
  setStoreExistStatus,
  getProductData,
  getProductCategoryData,
  getProductsDatabase,
} from "../../redux/action";
import ErrorScreen from "../error-screen";

const PageLayout = ({ children, pageName = "layout" }) => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const loadingStates = useSelector(state => state.loadingStates)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  //  handling API calls
  const token = getTokenFromCookie();
  const user = useSelector((state) => state.user);
  const storeID = useSelector((state) => state.storeID);
  const stores = useSelector((state) => state.stores);
  const storeData = useSelector((state) => (state.stores && state.stores.length > 0) ? state.stores[state.storeID] : {});
  const [error, setError] = useState(false)

  useEffect(() => {
    if (user && user.id) {
      dispatch(getStoresData(user?.id, token));
      dispatch(getProductCategoryData(token));
    }
  }, [user, token, location.pathname, dispatch]);

  useEffect(() => {
    if (storeData && storeData.id) {
      if (location.pathname === "/products") {
        dispatch(getProductData(storeData.id, token));
      }
      if (location.pathname === "/orders" || location.pathname === "/") {
        dispatch(getOrdersData(storeData.id, token));
      }
      if (location.pathname === "/products/new") {
        dispatch(getProductsDatabase(token));
      }
    }
  }, [storeData, location.pathname, token, dispatch, user]);

  useEffect(() => {
    if (loadingStates !== null && !loadingStates?.stores) {
      if (storeData?.id && !stores?.status) {
        setError(false)
        dispatch(setStoreExistStatus(true));
      }
      else if (stores?.status === 404 || storeID === -1) {
        setError(false)
        dispatch(setStoreExistStatus(false));
      }
      else {
        setError(true)
      }
    }
  }, [stores, dispatch]);
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
      const checkLoginStatus = () => {
        try {
          const token = getTokenFromCookie();
          if (!token) {
            console.log("Logged out because token expired or missing");
            dispatch(logOutUser());
            navigate("/login");
          }
        } catch (error) {
          console.error("Error checking login status:", error);
          dispatch(logOutUser());
          navigate("/login");
        }
      };

      // Perform the initial check
      // checkLoginStatus();

      // Set up periodic checks
      const intervalId = setInterval(checkLoginStatus, 60000);

      return () => {
        clearInterval(intervalId); // Clean up on unmount
      };
    } else {
      navigate("/login");
    }
  }, [isAuthenticated, dispatch, navigate]);

  return (
    <section className="bg-[#F2F2F2] h-[100vh]">
      <AdminNavbar name={pageName} />

      {
        error ?
          <ErrorScreen />
          :
          <div className="flex content-height">
            {
              pageName === "layout" && <AdminSidebar />
            }
            <div className="bg-white w-full h-full overflow-auto no-scrollbar flex flex-col gap-[60px] md:gap-[80px] large-screen">
              {children}
            </div>
          </div>
      }

    </section>
  );
};

export default PageLayout;
