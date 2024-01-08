import React from "react";
import { Store } from "../../images";

const AuthLayout = ({ children }) => {
  return (
    <div className="w-[100%] bg-[#F2F2F2]">
      <div className="flex">
        <div className="w-[50%]">
          <img className="h-screen w-full" src={Store} alt="store" />
        </div>
        <div className="mx-auto w-[50%] h-screen flex flex-col justify-center">
          <div className="flex flex-col justify-center items-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
