import React, { useEffect, useState } from "react";
import { NextIcon, SearchIcon } from "../../images";
import CustomScrollbar from "./filter.styles";

const Filter = ({ toggleFilters, index, item, handleToggleFilters, handleChange, uniqueValues, searchUniqueValues }) => {

    return (
        <div className="mt-6">
            <div className="flex justify-between mb-6 cursor-pointer" onClick={() => handleToggleFilters(index)}>
                <p className="font-bold text-4 leading-[25px] text-[#333333]">Filter by <span className="capitalize">{item.replace(/([a-z])([A-Z])/g, '$1 $2')}</span></p>
                <NextIcon className={`${toggleFilters[index] ? "rotate-90" : ""}`} />
            </div>

                <div className={`p-6 border border-1 border-[#E6E6E6] rounded h-fit ${toggleFilters[index] ? "" : "hidden"}`}>
                    <div className="relative mb-2">
                        <SearchIcon className="absolute top-[10px] left-[18px] " />
                        <input type="text" name={`search-${item}`} placeholder="Text" className="bg-[#F2F2F2] w-full h-[45px] rounded-[30px] text-[#999999] px-12 focus:outline-none" onChange={(e) => searchUniqueValues(e, item)}/>
                    </div>
                    <CustomScrollbar className="max-h-[393px]">
                        <div className="mb-4">
                            {uniqueValues[item] && uniqueValues[item].map((val, key) => {
                                return (
                                    <div className="flex gap-3 items-center mb-4" key={key}>
                                        <div>
                                            <input type="checkbox" name={val} id={val} className=" w-[24px] h-[24px] rounded border border-1 border-[#CCCCCC] mt-2 accent-[#186F3D]" onChange={(e) => handleChange(e, item)}/>
                                        </div>
                                        <label htmlFor={val} className="text-4 leading-6 text-[#000000] capitalize">{val}</label>
                                    </div>
                                )
                            })}

                        </div>
                    </CustomScrollbar>
                </div>
        </div>
    )
}


export default Filter;