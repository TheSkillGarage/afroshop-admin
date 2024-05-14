import React from "react";
import { DeleteIcon, LocationIcon } from "../../../images";
import { format } from "date-fns";

const DeliveryCard = ({ card, icon, type, handleDelete, editProfile, storeExists }) => {

  return (
    <div className="w-full flex gap-3 shadow-lg p-3 rounded items-center">
      {icon ?? (
        <div className="bg-[#186F3D1A] rounded p-3">
          <LocationIcon />
        </div>
      )}

      <div>
        <p className="font-bold text-[#186F3D]">
          {card?.label ?? "Within 5 km"}
        </p>
        <p className="text-[#333333]">
          {(type === "holiday" ? format(new Date(card?.value), 'EE, MMM d, yyyy') : `$${card?.value}`) ?? "$15"}
        </p>
      </div>
      {(editProfile || !storeExists) && (
        <div
          className="bg-[#FF3B301A] rounded p-2 align ml-auto cursor-pointer"
          onClick={() => handleDelete()}
        >
          <DeleteIcon />
        </div>
      )}
    </div>
  );
};

export default DeliveryCard;
