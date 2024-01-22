import React, { useState } from 'react';
import { TruncateWord } from '../../utils/truncate';

const CustomerCard = ({
  customerImage,
  customerName,
  customerEmail,
  numberOrders,
}) => { 

  const [hover, setHover] = useState(false)
  const showFullText =() =>{
      setHover(!hover)
  }
  return (
    <div className="flex gap-2">
      <img
        src={customerImage}
        alt="Customer Image"
        className="w-[50px] h-[50px]"
      />

      <div className="flex flex-col gap-1 w-full">
        <div className="flex flex-col gap-1 flex-wrap">
          <p className="w-full font-semibold text-[13px] text-[#186F3D]">
            {customerName}
          </p>
          {hover ? <p className='w-full font-normal text-[13px] text-[#7F7F7F]' onMouseLeave={showFullText}>{customerEmail}</p> 
          : <p className="w-full font-normal text-[13px] text-[#7F7F7F]" onMouseEnter={showFullText} >
            {window.innerWidth < 1200 || customerEmail.length > 25
              ? TruncateWord(customerEmail, 24)
              : customerEmail}              
          </p>}          
         </div>
         
        {hover && customerEmail.length >20 ? " " : <p className="font-normal text-[13px] text-[#7F7F7F]">
          {window.innerWidth < 1100
            ? TruncateWord(numberOrders, 3)
            : numberOrders}
        </p>}
      </div>      
    </div>
  );
};

export default CustomerCard;
