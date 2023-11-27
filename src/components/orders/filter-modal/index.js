import React, { useState } from "react";
import { LeftArrow } from "../../../images";
import Filter from "./filter";


const FilterModal = () => {
    const [isOpen, setIsOpen] = useState(0);

    const handleOpen = (key) => setIsOpen(key);

    return (
        <div className="flex justify-end fixed inset-0 bg-[rgba(0,0,0,0.2)] z-50">
            <div className="w-[595px] p-6 min-h-screen rounded shadow-lg bg-[#ffffff]">
                <div className="flex gap-3 items-center">
                    <LeftArrow />
                    <p className="font-bold py-1 text-[#186F3D] text-[20px] leading-[32px]">Filter(s)</p>
                </div>

                {
                    [1, 2, 3, 4, 5].map((item, key) => {
                        return <Filter key={key} id={item} isOpen={isOpen === key} handleOpen={handleOpen} item={key}/>
                    })
                }
                <div className="flex justify-end gap-4 mt-20">
                    <button className="h-[40px] w-[145px] border border-1 border-[#186F3D] rounded text-[#186F3D]">Clear All</button>
                    <button className="h-[40px] w-[145px] border border-1 border-[#186F3D] bg-[#186F3D] rounded text-[#FFFFFF]">Apply</button>
                </div>
            </div>
        </div>
    )
}


export default FilterModal;