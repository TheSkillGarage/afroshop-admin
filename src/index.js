import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import "./index.css";
import MyRoutes from "./Routes";
import { store } from './redux/store';
import DetectMobile from "./components/detect-mobile";
import axios from "axios";

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
        {!isMobile ? <MyRoutes /> : <DetectMobile />}
      </React.StrictMode>
    </Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);
