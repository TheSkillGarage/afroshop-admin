import React from "react";
import { SupportIllustration } from "../../images";
import { SUPPORT_DATA } from "../../data/supportData";

const Support = () => {
  return (
    <div className="w-[100%] mx-auto bg-[#F2F2F2] pt-6 pb-8">
      <div className="px-[20px]">
        <div className="flex items-center gap-8 mb-6 h-[39px]">
          <p className="text-[rgba(48,48,48,0.4)] font-medium text-[14px] leading-[16.8px] -tracking[16%] font-['Lato']">
            ...
          </p>
          <p className="text-[13px] leading-[23px] text-[#186F3D]">Support</p>
        </div>
      </div>
      <div className="flex items-center bg-white rounded-[6px] px-[24px] py-[50px] mx-[20px] h-screen mb-[20px]">
        <div className="w-[100%] py-[50px]">
          <div className="w-[50%] mx-auto text-center">
            <div>
              <div className="text-[#186F3D] text-[31px] font-bold">
                Need Help?
              </div>
              <div className="text-[#333333] text-[16px] ">
                Reach our to us on the following channels?
              </div>
              <div className="flex justify-center items-center pt-[24px]">
                <img src={SupportIllustration} alt="icon" />
              </div>
            </div>
          </div>
          <div className="flex mt-[24px] gap-[24px] w-[100%] justify-center">
            {SUPPORT_DATA.map(({ icon, heading, desc }, key) => {
              return (
                <div
                  key={key}
                  className="w-[33%] py-[16px] px-[24px] flex flex-wrap gap-[24px] rounded-[4px] shadow-lg"
                >
                  <div>
                    <img src={icon} alt="icon" />
                  </div>
                  <div>
                    <p className="font-bold text-[#333333]">{heading}</p>
                    <p className="text-[#7F7F7F]">{desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Support;
