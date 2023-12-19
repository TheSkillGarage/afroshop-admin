import React from 'react';

const CustomerCard = ({
  customerImage,
  customerName,
  customerEmail,
  numberOrders,
}) => {
  return (
    <div className="flex gap-4">
      <img src={customerImage} alt="Customer Image" className='w-[20%]' />

      <div className="flex gap-4 justify-between w-[70%]">
        <div className="flex flex-col gap-1 flex-wrap w-full">
          <p className="font-semibold text-[13px] text-[#186F3D] ">
            {customerName}
          </p>
          <p className="font-normal text-[13px] text-[#7F7F7F] truncate">
            {customerEmail}
          </p>
        </div>

        <p className="font-normal text-[13px] text-[#7F7F7F] pt-[15px] truncate">
          {numberOrders}
        </p>
      </div>
    </div>
  );
};

export default CustomerCard;
