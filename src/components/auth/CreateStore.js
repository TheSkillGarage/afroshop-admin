import React from "react";
import { Tick, SellerCenter} from "../../images";
import Button from "../shared/button";
import { Link } from "react-router-dom";

const CreateStore = () => {
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
      <div>
        <div className="text-center font-bold py-[24px]">
          Store Account Created Successfully!
        </div>
      <Link to="/dashboard"> <Button icon="white" className="w-[400px]">Go to dashboard</Button></Link>
      </div>
    </div>
  );
};

export default CreateStore;
