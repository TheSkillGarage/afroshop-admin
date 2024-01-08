import React from "react";
import { Tick, SellerCenter } from "../../images";
import { Link } from "react-router-dom";
import Button from "../shared/button";

const ResetSuccessful = () => {
  return (
    <div className="text-center flex flex-col justify-center items-center">
      <div>
        <div>
          <img src={SellerCenter} alt="logo" />
        </div>
        <div>
          <img src={Tick} alt="tick illustation" />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="text-center font-bold py-[24px]">
          Password Change Successful!
        </div>
        <Link to="/dashboard"> <Button icon="white" className="w-[400px]">Go to dashboard</Button></Link>
      </div>
    </div>
  );
};

export default ResetSuccessful;
