import React from "react";
import { NextIcon, SearchIcon } from "../../../images";

const Filter = ({isOpen, handleOpen, item}) => {
   
    return (
        <div className="mt-6">
            <div className="flex justify-between mb-6 cursor-pointer" onClick={() => handleOpen(item)} >
                <p className="font-bold text-4 leading-[25px] text-[#333333]">Filter by Order ID</p>
                <NextIcon />
            </div>

            {isOpen && <div className="border border-1 border-[#E6E6E6] rounded px-8 py-6">
                <div className="relative">
                    <SearchIcon className="absolute top-[10px] left-[18px] " />
                    <input type="text" name="search" id="tableSearch" placeholder="Text" className="bg-[#F2F2F2] w-full h-[45px] rounded-[30px] text-[#999999] px-12 focus:outline-none" />
                </div>

                <div className="mt-6">
                    <div className="flex gap-3 items-center mb-4">
                        <div>
                            <input type="checkbox" name="order" id="" className=" w-[24px] h-[24px] rounded border border-1 border-[#CCCCCC] mt-2 accent-[#186F3D] " />
                        </div>
                        <p className="text-4 leading-6 text-[#000000]">ORD-123</p>
                    </div>

                    <div className="flex gap-3 items-center mb-4">
                        <div>
                            <input type="checkbox" name="order" id="" className=" w-[24px] h-[24px] rounded border border-1 border-[#CCCCCC] mt-2 accent-[#186F3D] " />
                        </div>
                        <p className="text-4 leading-6 text-[#000000]">ORD-123</p>
                    </div>
                    <div className="flex gap-3 items-center mb-4">
                        <div>
                            <input type="checkbox" name="order" id="" className=" w-[24px] h-[24px] rounded border border-1 border-[#CCCCCC] mt-2 accent-[#186F3D] " />
                        </div>
                        <p className="text-4 leading-6 text-[#000000]">ORD-123</p>
                    </div>
                    <div className="flex gap-3 items-center mb-4">
                        <div>
                            <input type="checkbox" name="order" id="" className=" w-[24px] h-[24px] rounded border border-1 border-[#CCCCCC] mt-2 accent-[#186F3D] " />
                        </div>
                        <p className="text-4 leading-6 text-[#000000]">ORD-123</p>
                    </div>

                </div>
            </div>}
        </div>
    )
}


export default Filter;