import React from "react";
import {
  SellerCenter,
  WhiteArrowRight,
  IconMessage,
} from "../../../images";

const ResetPassword = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <div>
          <img src={SellerCenter} alt="logo" />
        </div>
      </div>
      <div >
        <div className="text-center font-bold pt-[40px]">Reset Password</div>
        <div className="text-center text-[16px] text-[#ccc] pb-[24px]">
          We’ll email you a password reset link
        </div>
        <div className="pb-[24px] relative">
          <label className="text-[13px] text-[#b3b3b3] pb-2" htmlFor="password">
            Email
          </label>
          <p className="absolute top-[35px] left-[20px]">
            <img src={IconMessage} alt="" />
          </p>
          <input
            className="py-[10px] pl-[54px] block border border-[#186F3D] bg-[#f2f2f2] focus:outline-green rounded-[4px] w-[400px]"
            type="password"
            name="password"
            id="password"
            placeholder="enter new password"
          />
        </div>
        <button className="py-[10px] flex justify-center px-[20px] border border-[#186F3D] bg-[#186F3D] text-[#ffffff] rounded-[4px] w-[400px]">
          <span className="pr-2"> Reset</span>
          <span>
            <img src={WhiteArrowRight} alt="arrow" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
