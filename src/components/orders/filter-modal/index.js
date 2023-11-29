import React, { useEffect, useRef, useState } from "react";
import { LeftArrow } from "../../../images";
import Filter from "./filter";


const FilterModal = ({ setOpenFilter, name, DATA }) => {


//functions for toggling filters
    const [toggleFilters, setToggleFilters] = useState({});

    const filters = name === "orders" ? Object.keys(DATA[0]).slice(0, -1) : Object.keys(DATA[0])

    useEffect(() => {
        let num = {}

        for (let i = 0; i < filters.length; i++) {
            if(i === 0){
                num[i] = true;
            }else{
                num[i] = false;
            }
        }
        
        setToggleFilters(num);
    }, [])

    const handleToggleFilters = (index) => {

        setToggleFilters((prevToggleFilters) => ({
            ...prevToggleFilters,
            [index]: !prevToggleFilters[index],
        }));

    }


//functions for handling filter modal animation and outside click events
    const dropdownRef = useRef(null);

    const handleHideModal = () => {
        document
            .querySelector(".filter-modal")
            .classList.add("slide-out");
        setTimeout(() => {
            setOpenFilter(false);
        }, 500);
    };

    const handleClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setOpenFilter(false);
            handleHideModal()
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);


    return (
        <div className="flex justify-end fixed inset-0 bg-[rgba(0,0,0,0.2)] z-50 filter-modals">
            <div className="w-[595px] p-6 min-h-screen rounded shadow-lg bg-[#ffffff] filter-modal slide-in overflow-y-scroll" ref={dropdownRef}>
                <div className="flex gap-3 items-center">
                    <LeftArrow className="cursor-pointer" onClick={() => setOpenFilter(false)}/>
                    <p className="font-bold py-1 text-[#186F3D] text-[20px] leading-[32px]">Filter(s)</p>
                </div>

                {
                    filters.map((item, key) => {
                        return <Filter key={key} item={item} index={key} toggleFilters={toggleFilters} handleToggleFilters={handleToggleFilters} DATA={DATA}/>
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