import React from "react";
import { LocationIcon } from "../../images";

const DeliveryCard = ({title, subtitle}) => {
  return (
    <div className="w-full flex gap-3 shadow-lg p-3 rounded">
      <div className="bg-[#186F3D1A] rounded p-3">
        <LocationIcon />
      </div>
      <div>
        <p className="font-bold text-[#186F3D]">{title ?? "Within 5 km"}</p>
        <p className="text-[#333333]">{subtitle ?? "$15"}</p>
      </div>
    </div>
  );
};

export default DeliveryCard;
