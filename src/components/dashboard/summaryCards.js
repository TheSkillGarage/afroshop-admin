import React from 'react';
import { ArrowDownTriangle, ArrowUp } from '../../images';
import { formatPrice } from '../../utils/formatPrice';

const SummaryCards = ({ cardTitle, backgroundColor, cardNumber, percentage, selectedYear }) => {
  return (
    <div
      className="w-[45%] h-[172px] px-4 py-6 flex flex-col gap-5"
      style={{ backgroundColor }}
    >
      <p className="text-base font-normal text-[#7F7F7F]">{cardTitle}</p>
      <p className='text-3xl font-bold text-[#333333]'>
        {(cardTitle === "Total Sales" && cardNumber > 0)
          ? `$${formatPrice(cardNumber)}`
          : (cardTitle === "Total Sales" && cardNumber === 0)
            ? `$${cardNumber}`
            : cardNumber.toLocaleString()}
      </p>

      {(percentage && selectedYear !== "all") && <div className='min-w-[73px] w-fit h-10 px-2 py-3 bg-white border rounded-[30px] flex gap-2 justify-center items-center'>
        <img src={(percentage > 0) ? ArrowUp : ArrowDownTriangle} alt="Arrow" />
        <p className={`text-[13px] font-semibold ${(percentage >= 0) ? "text-[#34C759]" : "text-[#FF3B30]"}`}>{`${Math.abs(percentage)}%`}</p>
      </div>}
    </div>
  );
};

export default SummaryCards;
