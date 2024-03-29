import React from "react";
import { Store, AfroshopLogo } from "../../images";

const AuthLayout = ({ children }) => {

  const backgroundImageStyle = {
    backgroundImage: `url(${Store})`,
  };

  return (
    <div className="w-[100%] bg-[#FFFFFF]">
      <div className="flex w-full">
        <div
          className="w-1/2 min-h-screen bg-center bg-scroll"
          style={backgroundImageStyle}
        ></div>

        <div className="w-1/2 flex justify-center items-center p-20">
          <div className="w-[585px]">
            <div className="flex justify-center">
              <img
                src={AfroshopLogo}
                alt="logo"
                className="w-[124px] h-[33px]"
              />
              <p className="font-bold text-[20px] leading-[32px] text-[#0C4D26] gap-2">
                Seller Center
              </p>
            </div>

            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
