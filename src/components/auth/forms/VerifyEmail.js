import React, { useState } from "react";
import { MessageIcon } from "../../../images";
import { Link } from "react-router-dom";
import Button from "../../shared/button";

const VerifyEmail = () => {
  const [otp, setOtp] = useState(new Array(4).fill(""));

  const handleOtp = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([
      ...otp.map((value, idx) => (index === idx ? element.value : value)),
    ]);
    
    if (element.value === "" && index > 0) {
      element.previousSibling.focus();
    } else if (element.value !== "" && element.nextSibling) {
      element.nextSibling.focus();
    }

    otp.join("");
  };

  return (
    <div className="text-center flex flex-col justify-center items-center">
      <img src={MessageIcon} alt="message icon" />
      <div>
        <p className="text-center font-bold py-[24px]">Verify your email</p>
        <p className="text-center text-[16px] text-[#ccc] pb-[24px]">
          Please enter the 4 digit code sent to <br /> greenranger@gmail.com
        </p>
        <div className="flex flex-row justify-center gap-[10px] sm:gap-[10px]">
          {otp.map((data, index) => {
            return (
              <input
                type="text"
                maxLength="1"
                name="otp"
                key={index}
                value={data}
                onChange={(event) => handleOtp(event.target, index)}
                onFocus={(event) => event.target.select()}
                className="w-[64px] h-[64px] text-2xl font-bold border border-[#CCCCCC] focus:outline-none focus:ring-0 focus:border-[#186F3D] px-5 py-3 rounded-[4px]"
              />
            );
          })}
        </div>
        <p className="text-center text-[16px] text-green py-[24px] cursor-pointer">Resend Code</p>
        <Link to="/#">
          <Button icon="white" className="w-[400px]">
            Verify
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default VerifyEmail;
