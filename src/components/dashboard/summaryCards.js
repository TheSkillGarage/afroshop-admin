import React from 'react';
import { ArrowDownTriangle, ArrowUp } from '../../images';

const SummaryCards = ({ cardTitle, backgroundColor, cardNumber, percentage }) => {
  return (
    <div
      className="w-[45%] h-[172px] px-4 py-6 flex flex-col gap-5"
      style={{backgroundColor}}
    >
      <p className="text-base font-normal text-[#7F7F7F]">{cardTitle}</p>
      <p className='text-3xl font-bold text-[#333333]'>{cardTitle === "Total Sales" ? `$${cardNumber.toLocaleString()}` : cardNumber.toLocaleString()}</p>
      
      <div className='w-[75px] h-10 px-2 py-3 bg-white border rounded-[30px] flex gap-2 justify-center items-center'>
        <img src={(percentage >= 0) ? ArrowUp : ArrowDownTriangle} alt="Arrow"/>
        <p className={`text-[13px] font-semibold ${(percentage >= 0 )? "text-[#34C759]" : "text-[#FF3B30]"}`}>{`${percentage}%`}</p>
      </div>
    </div>
  );
};

export default SummaryCards;
