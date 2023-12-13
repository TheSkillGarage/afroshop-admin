import React from 'react';

const SummaryCards = ({ cardTitle, backgroundColor, cardNumber, arrowImage, percentage }) => {
  return (
    <div
      className="w-[280px] h-[172px] px-4 py-6 flex flex-col gap-5"
      style={{backgroundColor}}
    >
      <p className="text-base font-normal text-[#7F7F7F]">{cardTitle}</p>
      <p className='text-3xl font-bold text-[#333333]'>{cardNumber}</p>
      
      <div className='w-[75px] h-10 px-2 py-3 bg-white border rounded-[30px] flex gap-2 justify-center items-center'>
        <img src={arrowImage} alt="Arrow"/>
        <p className='text-[13px] font-semibold text-[#34C759]'>{percentage}</p>
      </div>
    </div>
  );
};

export default SummaryCards;
