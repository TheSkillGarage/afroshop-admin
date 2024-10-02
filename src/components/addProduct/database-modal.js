import React, { useEffect, useMemo, useRef, useState } from "react";
import CustomScrollbar from "../filter-modal/filter.styles";
import { useSelector } from "react-redux";
import { LeftArrow, SearchIcon } from "../../images";
import RadioButton from "../shared/radioBtn";
import Button from "../shared/button";
import SelectDropdown from "../shared/dropdownInput/dropdown";
import { capitalize } from "lodash";



const DatabaseModal = ({ openModal, closeModal, handleDatabaseInfo }) => {

    const categories = useSelector((state) => state.productCategories);
    const productCategories = [
        { label: "All", value: "" },
        ...categories?.map((c) => {
            return { label: c?.name, value: c?.name };
        }),
    ];

    const [isDisabled, setDisable] = useState(true);

    // handle close modal on outside click
    const dropdownRef = useRef(null);
    const handleClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            closeModal(false);
        }
    };

    useEffect(() => {
        if (openModal) {
            document.addEventListener("mousedown", handleClick);
        }

        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, [openModal]);

    const productTemplates = useSelector((state) => state?.productTemplates ? state?.productTemplates?.sort((a, b) => a.name.localeCompare(b.name)) : []);

    const [filteredProducts, setFilterProducts] = useState([]);

    const [selectedProduct, setSelectedProduct] = useState(-1);

    const [filters, setFilters] = useState({
        selectedCategory: "",
        searchTerm: ""
    })

    const handleFilterChange = (filter, value) => {
        setFilters({
            ...filters,
            [filter]: value
        })
    }

    useEffect(() => {
        // Reset state
        setSelectedProduct(-1);
        setDisable(true);

        const { selectedCategory, searchTerm } = filters;
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const isCategoryEmpty = selectedCategory === "";
        const isSearchEmpty = searchTerm === "";

        // Filter products
        const filteredProducts = productTemplates.filter(({ productCategory, name }) => {
            const categoryMatches = isCategoryEmpty || productCategory === selectedCategory;
            const searchMatches = isSearchEmpty || name.toLowerCase().includes(lowerCaseSearchTerm);
            return categoryMatches && searchMatches;
        });

        // Update state with filtered products
        setFilterProducts(filteredProducts);

    }, [productTemplates, filters]);


    const handleUseSelectedProduct = () => {
        closeModal(false);
        handleDatabaseInfo(filteredProducts[selectedProduct]);
    };

    return (
        <div className={`flex justify-end fixed inset-0 bg-[rgba(0,0,0,0.2)] z-50 ${openModal ? "" : "hidden"}`}>
            <CustomScrollbar className="w-[595px] p-6 min-h-screen rounded shadow-lg bg-[#ffffff] filter-modal slide-in" ref={dropdownRef}>
                <div className="flex gap-[12px] items-center">
                    <LeftArrow className="cursor-pointer" onClick={() => closeModal(false)} />
                    <h3 className="font-bold text-[20px] leading-[32px] text-[#186F3D]">Add Product</h3>
                </div>

                <div className="pt-4">
                    <label htmlFor="productCategory" className="text-[13px] leading-[23px] text-[#B3B3B3] block mb-2">Category</label>

                    <SelectDropdown
                        name="productCategory"
                        options={productCategories}
                        placeholder="Select"
                        handleChange={(v) => handleFilterChange("selectedCategory", v.value)}
                        color="green"
                        className="h-[53px]"
                    />

                    <div className="relative mb-2">
                        <SearchIcon className="absolute top-[50px] left-[18px] " />
                        <input
                            type="text"
                            name="search"
                            placeholder="Search Product"
                            className="mt-10 bg-[#F2F2F2] w-full h-[45px] rounded-[30px] text-[#999999] px-12 focus:outline-none"
                            onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
                        />
                    </div>

                    {filteredProducts.map((product, index) => {
                        const firstLetter = product?.name[0].toUpperCase() ?? "";
                        const lastFirstLetter = index > 0 ? filteredProducts[index - 1].name[0].toUpperCase() : "";

                        return (
                            <React.Fragment key={index}>
                                {lastFirstLetter !== firstLetter && (
                                    <p className="text-[16px] leading-[25px] text-[#186F3D] mt-[40px] mb-6">
                                        {firstLetter}
                                    </p>
                                )}
                                <div className="mb-6">
                                    <div className="flex gap-[12px]">
                                        <RadioButton
                                            type="radio"
                                            value={product.name}
                                            id={product.name}
                                            name="selectedProduct"
                                            checked={selectedProduct === index}
                                            handleChange={() => {
                                                setSelectedProduct(index);
                                                setDisable(false);
                                            }}
                                        />
                                        <label htmlFor={product.name}>{capitalize(product.name)}</label>
                                    </div>
                                </div>
                            </React.Fragment>
                        );
                    })}

                    <div className={`flex justify-end items-center gap-6 ml-auto mt-[60px]`}>
                        <Button
                            variant="secondary"
                            type="button"
                            className="w-[173px] h-[40px]"
                            onClick={() => closeModal(false)}
                        >
                            Cancel
                        </Button>

                        <Button
                            variant={isDisabled ? "disabled" : "primary"}
                            type="submit"
                            className="w-[133px] h-[40px]"
                            onClick={handleUseSelectedProduct}
                        >
                            Add
                        </Button>
                    </div>
                </div>


            </CustomScrollbar>

        </div>
    )
}

export default DatabaseModal;