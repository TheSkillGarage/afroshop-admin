import React, { useEffect, useRef, useState } from "react";
import { LeftArrow } from "../../../images";
import Filter from "./filter";


const FilterModal = ({ setOpenFilter }) => {
    const [isOpen, setIsOpen] = useState(0);

    const handleOpen = (key) => setIsOpen(key);

    const dropdownRef = useRef(null);

    const handleClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setOpenFilter(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    return (
        <div className="flex justify-end fixed inset-0 bg-[rgba(0,0,0,0.2)] z-50">
            <div className="w-[595px] p-6 min-h-screen rounded shadow-lg bg-[#ffffff] filter-modal" ref={dropdownRef}>
                <div className="flex gap-3 items-center">
                    <LeftArrow />
                    <p className="font-bold py-1 text-[#186F3D] text-[20px] leading-[32px]">Filter(s)</p>
                </div>

                {
                    [1, 2, 3, 4, 5].map((item, key) => {
                        return <Filter key={key} id={item} isOpen={isOpen === key} handleOpen={handleOpen} item={key} />
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