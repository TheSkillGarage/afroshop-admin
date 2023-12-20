import React from 'react';

const CustomerCard = ({
  customerImage,
  customerName,
  customerEmail,
  numberOrders,
}) => {
  return (
    <div className="flex gap-2">
      <img src={customerImage} alt="Customer Image" className='w-[50px] h-[50px]'/>

      <div className="flex justify-between w-full items-center">
        <div className="flex flex-col gap-1 flex-wrap w-[134px]">
          <p className="w-full font-semibold text-[13px] text-[#186F3D] ">
            {customerName}
          </p>
          <p className="w-full font-normal text-[13px] text-[#7F7F7F]">
            {customerEmail}
          </p>
        </div>

        <p className="font-normal text-[13px] text-[#7F7F7F] w-[70px]">
          {numberOrders}
        </p>
      </div>
    </div>
  );
};

export default CustomerCard;
