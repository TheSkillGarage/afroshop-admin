import React, { useEffect, useRef, useState } from "react";
import { LeftArrow } from "../../../images";
import Filter from "./filter";
import CustomScrollbar from "./filter.styles";


const FilterModal = ({ setOpenFilter, name, DATA, openFilter, handleFilterObject }) => {


    //functions for toggling filters
    const [toggleFilters, setToggleFilters] = useState({});

    const filters = name === "orders" ? Object.keys(DATA[0]).slice(0, -1) : Object.keys(DATA[0])

    useEffect(() => {
        let num = {}

        for (let i = 0; i < filters.length; i++) {
            if (i === 0) {
                num[i] = true;
            } else {
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
        setOpenFilter(false);

        // document.querySelector(".filter-modal").classList.add("slide-out");
        // setTimeout(() => {
        //     setOpenFilter(false);
        // }, 500);
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


    const [formData, setFormData] = useState({});



    const handleChange = (e, item) => {
        const selectedValue = e.target.name;
    
        setFormData((prevFormData) => ({
            ...prevFormData,
            [item]: {
                ...(prevFormData[item] || {}),
                [selectedValue]: !prevFormData[item]?.[selectedValue],
            },
        }));
    };
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Create an object to store the selected filter values
        const selectedFilters = {};
    
        // Loop through each filter item and add selected values to the array
        filters.forEach((item) => {
            const itemFormData = formData[item] || {};
            const selectedValues = Object.keys(itemFormData).filter((key) => itemFormData[key]);
    
            if (selectedValues.length > 0) {
                selectedFilters[item] = selectedValues;
            }
        });
    
        handleFilterObject(selectedFilters);
        setOpenFilter(false);
    };


    const handleReset = () => {
        handleFilterObject({});
        setOpenFilter(false);
    }
    
    


    return (
        <div className={`flex justify-end fixed inset-0 bg-[rgba(0,0,0,0.2)] z-50 ${openFilter ? "" : "hidden"}`}>
            <CustomScrollbar className="w-[595px] p-6 min-h-screen rounded shadow-lg bg-[#ffffff] filter-modal slide-in" ref={dropdownRef}>
                <form action="" onSubmit={(e) => handleSubmit(e)} onReset={handleReset}>
                    <div className="flex gap-3 items-center">
                        <LeftArrow className="cursor-pointer" onClick={() => setOpenFilter(false)} />
                        <p className="font-bold py-1 text-[#186F3D] text-[20px] leading-[32px]">Filter(s)</p>
                    </div>

                    {
                        filters.map((item, key) => {
                            return <Filter key={key} item={item} index={key} toggleFilters={toggleFilters} handleToggleFilters={handleToggleFilters} DATA={DATA} handleChange={handleChange} />
                        })
                    }
                    <div className="flex justify-end gap-4 mt-20">
                        <button type="reset" className="h-[40px] w-[145px] border border-1 border-[#186F3D] rounded text-[#186F3D]">Clear All</button>
                        <button type="submit" className="h-[40px] w-[145px] border border-1 border-[#186F3D] bg-[#186F3D] rounded text-[#FFFFFF]">Apply</button>
                    </div>
                </form>
            </CustomScrollbar>
        </div>
    )
}


export default FilterModal;