import React from "react";
import { EarningsIllustration } from "../../images";

const Earnings = () => {
  return (
    <div className="w-[100%] mx-auto bg-[#F2F2F2] pt-6 pb-8">
      <div className="px-[20px]">
        <div className="flex items-center gap-8 mb-6 h-[39px]">
          <p className="text-[rgba(48,48,48,0.4)] font-medium text-[14px] leading-[16.8px] -tracking[16%] font-['Lato']">
            ...
          </p>
          <p className="text-[13px] leading-[23px] text-[#186F3D]">Earnings</p>
        </div>
      </div>
      <div className="flex items-center bg-white rounded-[6px] px-[24px] py-[50px] mx-[20px] h-screen mb-[20px]">
        <div className="w-[100%] py-[50px]">
          <div className="w-[50%] mx-auto text-center">
            <div className="border-black">
              <div className="flex justify-center items-center pt-[24px]">
                <img src={EarningsIllustration} alt="icon" />
              </div>
              <div className="text-[#186F3D] text-[20px] font-bold my-[24px]">
                Earnings Feature Coming Soon
              </div>
              <div className="text-[#333333] text-[16px] text-center">
                Our earnings feature is on its way!
                <br />
                Stay tuned for updates and get ready to track your progress
                <br /> like never before.
               
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Earnings;
