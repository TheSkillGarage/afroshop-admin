import React from "react";
import { Link } from "react-router-dom";
import { Tick} from "../../images";
import Button from "../shared/button";
import Formheader from "./forms/helper/Formheader";

const ResetSuccessful = () => {
  return (
    <div className="text-center flex flex-col justify-center items-center">
      <Formheader icon={Tick}/>
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
