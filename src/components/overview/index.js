import React from "react";
import Welcome from "../dashboard/welcome";
import Dashboard from "../dashboard/dashboard";
import { useSelector } from "react-redux";

const Overview = () => {
  const storeExists = useSelector((state) => state.storeExists);
 
  return (
    <div>{!storeExists ? <Welcome /> : <Dashboard />}</div>
  );
};

export default Overview;
