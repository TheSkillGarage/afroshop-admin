import React from 'react';

const CustomerCard = ({
  customerImage,
  customerName,
  customerEmail,
  numberOrders,
}) => {

  return (
    <div className="flex gap-2">
      <img
        src={customerImage}
        alt="Customer Profile Pic"
        className="w-[50px] h-[50px]"
      />

      <div className="flex flex-col gap-1 w-full">
        <div className="flex flex-col gap-1 flex-wrap">
          <p className="w-full font-semibold text-[13px] text-[#186F3D]">
            {customerName}
          </p>
          <p className='w-full font-normal text-[13px] text-[#7F7F7F] leading-[23px] break-all'>{customerEmail}</p>
        </div>

        <p className="font-normal text-[13px] text-[#7F7F7F]">
          {numberOrders}
        </p>
      </div>
    </div>
  );
};

export default CustomerCard;
