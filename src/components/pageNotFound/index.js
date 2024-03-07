import React from "react";
import Button from "../shared/button";
import { Link } from "react-router-dom";
import { NotFoundImage } from "../../images";

const NotFoundHeader = () => {
  return (
    <div className="flex flex-col gap-8 md:flex-row-reverse md:pl-12 h-[476px] mb-[80px] md:w-full">
      <NotFoundImage className="w-full [h-[220px]" />
      <div className="flex flex-col gap-3 w-[98%] pl-4 text-center md:text-start md:justify-center">
        <h3 className="font-bold text-[#186F3D] text-[31px] md:text-[48px]">
          Ooops!
        </h3>
        <h5 className="font-bold text-[#333333] text-[20px] md:text-[31px]">
          Page not found
        </h5>
        <p className="text-base  text-[#696969] px-6 md:text-[25px] md:leading-10 md:w-[70%] md:px-0">
          We searched everywhere, this page does not exist or was removed!
        </p>
        <Link to="/">
          <Button className="w-[98%] h-[40px] md:w-[62%] md:ml-0 mt-5">
            Go Back
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundHeader;
