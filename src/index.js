import React, { useEffect, useState } from "react";
import axios from 'axios'
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import "./index.css";
import MyRoutes from "./Routes";
import { store } from './redux/store';
import DetectMobile from "./components/detect-mobile";
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
const Root = () => {

  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 868);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Provider store={store}>
      <React.StrictMode>
        <ToastContainer/>
        {!isMobile ? <MyRoutes /> : <DetectMobile />}
      </React.StrictMode>
    </Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);
