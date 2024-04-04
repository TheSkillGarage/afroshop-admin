import React from "react";
import { NextIcon, PrevIcon } from "../../images";

const TableFooter = ({
  pagination,
  data,
  itemsPerPage,
  handleItemsPerPage,
  prevPage,
  page,
  handlePage,
  nextPage,
  totalPages,
}) => {
  return data && data.length !== 0 ? (
    <div className=" pt-4 pb-6 px-6 text-[13px] leading-[23px] bg-[#ffffff] w-full ">
     {data.length > 5 && 
     <div className="flex justify-between items-center">
      <div className="flex gap-8 text-[#CCCCCC] items-center">
        <p className="flex gap-4 items-center">
          <span>Show</span>
          <select
            name="lines"
            id=""
            value={itemsPerPage}
            className="w-[56px] h-[33px] border border-1 border-[#CCCCCC] rounded focus:outline-none font-medium text-[#333333] text-[14px] leading-[16.8px]"
            onChange={(e) => handleItemsPerPage(e)}
          >
            {["5", "10", "15", "20", "25", "30"].map((num, key) => {
              return (
                <option value={num} key={key}>
                  {num}
                </option>
              );
            })}
          </select>
          <span>Lines</span>
        </p>

        <p>
          Showing {pagination.count.start + 1} to {pagination.count.stop} of{" "}
          {data.length} orders
        </p>
      </div>

      <div className="flex gap-1 text-[#333333]">
        <p
          className="h-[31px] w-[31px] rounded cursor-pointer flex justify-center items-center"
          onClick={prevPage}
        >
          {page === 1 ? <PrevIcon /> : <NextIcon className="rotate-180" />}
        </p>

        <div className="flex gap-1">
          {pagination.pageButtons.map((number, key) => {
            return (
              <p
                key={key}
                className={`${page === number ? "bg-[#FFE0B2]" : null} ${
                  number === "..." ? "text-[#CCCCCC]" : "text-[#333333]"
                } text-[13px] leading-[23px] mr-1 flex justify-center items-center h-[31px] w-[31px] rounded cursor-pointer transition-all duration-200 ease-in`}
                onClick={() => (number !== "..." ? handlePage(number) : null)}
              >
                {number}
              </p>
            );
          })}
        </div>

        <p
          className="h-[31px] w-[31px] rounded cursor-pointer flex justify-center items-center"
          onClick={nextPage}
        >
          {page !== totalPages ? (
            <NextIcon />
          ) : (
            <PrevIcon className="rotate-180" />
          )}
        </p>
      </div>
      </div>}
    </div>
  ) : (
    ""
  );
};

export default TableFooter;
