import React from 'react';

const CustomerCard = ({
  customerImage,
  customerName,
  customerEmail,
  numberOrders,
}) => {
  return (
    <div className="flex gap-4">
      <img src={customerImage} alt="Customer Image" className='w-[50px] h-[50px]'/>

      <div className="flex gap-4 justify-between w-full">
        <div className="flex flex-col gap-1 flex-wrap">
          <p className="w-full font-semibold text-[13px] text-[#186F3D] ">
            {customerName}
          </p>
          <p className="w-full font-normal text-[13px] text-[#7F7F7F] break-all">
            {customerEmail}
          </p>
        </div>

        <p className="font-normal text-[13px] text-[#7F7F7F] pt-[15px] break-all">
          {numberOrders}
        </p>
      </div>
    </div>
  );
};

export default CustomerCard;
