import React, { useState } from "react";
import { FilterIcon, SearchIcon } from "../../images";
import FilterModal from "../orders/filter-modal";


const Search = ({ handleSearch }) => {

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleChange = (e) => {
        handleSearch(e.target.value);
    }

    const [openFilter, setOpenFilter] = useState(false);

    return (
        <div className="flex justify-between items-center px-4 py-6 h-[93px]">
           {openFilter && <FilterModal setOpenFilter={setOpenFilter}/>}
            <form action="" className="w-[514px] relative" onSubmit={handleSubmit}>
                <SearchIcon className="absolute top-[10px] left-[18px] " />
                <input type="text" name="search" id="tableSearch" placeholder="Text" className="bg-[#F2F2F2] w-full h-[45px] rounded-[30px] text-[#999999] px-12 focus:outline-none" onChange={(e) => handleChange(e)} />
            </form>

            <div className="w-[108px] h-[44px] rounded border border-[0.5px] flex items-center justify-center gap-2 cursor-pointer" onClick={(e) => {e.stopPropagation(); setOpenFilter(!openFilter);}}>
                <p className="text-[16px] leading-[24px] text-[#333333]">Filter</p>
                <FilterIcon />
            </div>
        </div>
    )
}


export default Search;