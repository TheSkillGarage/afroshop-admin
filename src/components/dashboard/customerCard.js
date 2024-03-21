import React from 'react';
import { renderValidUrl } from '../../utils/constants';

const CustomerCard = ({ data }) => {
  const { name, email, image, orders } = data;
  return (
    <div className="flex gap-2">
      <img
        src={renderValidUrl(image)}
        alt="Customer Profile Pic"
        className="w-[50px] h-[50px] rounded-[100%]"
      />

      <div className="flex flex-col gap-1 w-full">
        <div className="flex flex-col gap-1 flex-wrap">
          <p className="w-full font-semibold text-[13px] text-[#186F3D]">
            {name}
          </p>
          <p className='w-full font-normal text-[13px] text-[#7F7F7F] leading-[23px] break-all'>{email}</p>
        </div>

        <p className="font-normal text-[13px] text-[#7F7F7F]">
          {`${orders} Orders`}
        </p>
      </div>
    </div>
  );
};

export default CustomerCard;
