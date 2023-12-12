import React, { useEffect, useMemo, useRef, useState } from "react";
import { LeftArrow } from "../../images";
import Filter from "./filter";
import CustomScrollbar from "./filter.styles";


const FilterModal = ({ setOpenFilter, name, DATA, openFilter, handleFilterObject }) => {

    const filters = name === "orders" ? Object.keys(DATA[0]).slice(1, -1) : Object.keys(DATA[0]).slice(1) // sets DATA keys as filter criterias

    const [toggleFilters, setToggleFilters] = useState({});
    const [formData, setFormData] = useState({});
    const [uniqueValues, setUniqueValues] = useState({});

   //functions for toggling filters
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
    }, [filters.length])


    const handleToggleFilters = (index) => {

        setToggleFilters((prevToggleFilters) => ({
            ...prevToggleFilters,
            [index]: !prevToggleFilters[index],
        }));

    }


    // functions for updating individual filters based on search
    const uniqueArrays = useMemo(() => {
        const updatedUniqueValues = {};

        filters.forEach((filter) => {
            const uniqueArray = Array.from(
                new Set(
                    DATA.map((obj) => {
                        if (filter === 'price' && obj[filter] && typeof obj[filter] === 'object') {
                            return obj[filter].price;
                        }
                        return obj[filter];
                    }).filter((value) => value !== undefined)
                )
            );

            updatedUniqueValues[filter] = uniqueArray;
        });

        return updatedUniqueValues;
    }, [DATA, filters]);

    useEffect(() => {
        setUniqueValues(uniqueArrays);
    }, []);
    
    

    const searchUniqueValues = (e, item) => {
        let val = e.target.value;
    
        let filteredUniqueValues = uniqueArrays[item].filter(value => {
            if (typeof value === 'string') {
                return value.toLowerCase().includes(val.toLowerCase());
            } else {
                // Check if val is an empty string or value is equal to val
                return val === '' || value == val; // Use loose equality for potential type coercion
            }
        });
    
        setUniqueValues(prevUniqueValues => ({
            ...prevUniqueValues,
            [item]: filteredUniqueValues,
        }));
    };

// function for closing filter modal
    const closeFilter = () => {
        setOpenFilter(false);
    }


    //functions for handling filter modal animation and outside click events
    const dropdownRef = useRef(null);

    const handleClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            closeFilter();
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);


    

    // functions for handling filter application
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

        const selectedFilters = {};

        filters.forEach((item) => {
            const itemFormData = formData[item] || {};
            const selectedValues = Object.keys(itemFormData).filter((key) => itemFormData[key]);

            if (selectedValues.length > 0) {
                selectedFilters[item] = selectedValues;
            }
        });

        handleFilterObject(selectedFilters);
        closeFilter();
    };


    const handleReset = () => {
        handleFilterObject({});
        closeFilter();
        setUniqueValues(uniqueArrays);
    }


    return (
        <div className={`flex justify-end fixed inset-0 bg-[rgba(0,0,0,0.2)] z-50 ${openFilter ? "" : "hidden"}`}>
            <CustomScrollbar className="w-[595px] p-6 min-h-screen rounded shadow-lg bg-[#ffffff] filter-modal slide-in" ref={dropdownRef}>
                <form action="" onSubmit={(e) => handleSubmit(e)} onReset={handleReset}>
                    <div className="flex gap-3 items-center">
                        <LeftArrow className="cursor-pointer" onClick={() => closeFilter()} />
                        <p className="font-bold py-1 text-[#186F3D] text-[20px] leading-[32px]">Filter(s)</p>
                    </div>

                    {
                        filters.map((item, key) => {
                            return <Filter key={key} item={item} index={key} toggleFilters={toggleFilters} handleToggleFilters={handleToggleFilters} handleChange={handleChange} uniqueValues={uniqueValues} searchUniqueValues={searchUniqueValues} />
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