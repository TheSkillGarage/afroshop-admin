import React from "react";
import { Tick, SellerCenter, WhiteArrowRight } from "../../images";

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
        <button className="py-[10px] flex justify-center px-[20px] border border-[#186F3D] bg-[#186F3D] text-[#ffffff] rounded-[4px] w-[400px]">
          <span className="pr-2"> Go to Dashboard</span>
          <span>
            <img src={WhiteArrowRight} alt="arrow" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default CreateStore;
