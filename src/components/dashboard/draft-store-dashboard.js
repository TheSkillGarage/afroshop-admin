import React from "react";
import { CautionImage } from "../../images";

const DraftView = () => {
  return (
    <div className="bg-[#F2F2F2] w-full pt-6 pb-8 px-4">
      <div className="flex items-center gap-8 mb-6 h-[39px]">
        <p className="text-[rgba(48,48,48,0.4)] font-medium text-[14px] leading-[16.8px] -tracking[16%] font-['Lato']">
          ...
        </p>
        <p className="text-[13px] leading-[23px] text-[#186F3D]">Overview</p>
      </div>

      <div className="bg-[#ffffff] h-[840px] border rounded-md flex items-center justify-center flex-col gap-6">
        <img
          src={CautionImage}
          className="w-full h-[200px]"
          alt="caution-image"
        />
        <h5 className="text-xl font-bold leading-8 text-[#186F3D]">
          Store Submission Received
        </h5>

        <div className="flex flex-col gap-0 text-base leading-6 text-[#333333] w-[490px] text-center">
          <p>
            Thanks for submitting your store to Afroshop! 🎉 Your submission is
            now under review. We'll notify you once it's been approved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DraftView;
