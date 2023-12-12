import React from "react";
import {
  SupportIllustration,
  WhatsAppSupport,
  PhoneSupport,
  EmailSupport,
} from "../../images";
import { Link } from "react-router-dom";

const Support = () => {
  return (
    <div className="w-[100%] mx-auto bg-[#F2F2F2]">
      <div className="py-[12px]">
        <div className="py-[8px] text-[13px] px-[30px] text-[#186F3D]">
          <Link to="/support">Support</Link>
        </div>
      </div>
      <div className="bg-white px-[24px] py-[50px] mx-[12px]">
        <div className="w-[50%] mx-auto text-center">
          <div>
            <div className="text-[#186F3D] text-[31px] font-bold">
              Need Help?
            </div>
            <div className="text-[#333333] text-[16px] ">
              Reach our to us on the following channels?
            </div>
            <div className="flex justify-center items-center pt-[20px]">
              <img src={SupportIllustration} />
            </div>
          </div>
        </div>
        <div className="flex mt-[20px] gap-[24px] w-[100%] justify-center">
          <div className="w-[30%] py-[16px] px-[24px] flex flex-wrap gap-[24px] rounded-[4px] shadow-lg">
            <div>
              <img src={WhatsAppSupport} />
            </div>
            <div>
              <p className="font-bold text-[#333333]">Email us</p>
              <p className="text-[#7F7F7F]">sales@afroshop.com</p>
            </div>
          </div>
          <div className="w-[30%] py-[16px] px-[24px] flex flex-wrap gap-[24px] rounded-[4px] shadow-lg">
            <div>
              <img src={EmailSupport} />
            </div>
            <div>
              <p className="font-bold text-[#333333]">Phone Number</p>
              <p className="text-[#7F7F7F]">+127 000 000 1111</p>
            </div>
          </div>
          <div className="w-[30%] py-[16px] px-[24px] flex flex-wrap gap-[24px] rounded-[4px] shadow-lg">
            <div>
              <img src={PhoneSupport} />
            </div>
            <div>
              <p className="font-bold text-[#333333]">WhatsApp</p>
              <p className="text-[#7F7F7F]">+127 000 000 1111</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Support;
