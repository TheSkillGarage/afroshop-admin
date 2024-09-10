import React, { useEffect, useMemo, useRef, useState } from "react";
import CustomScrollbar from "../filter-modal/filter.styles";
import { useSelector } from "react-redux";
import { LeftArrow, SearchIcon } from "../../images";
import { useForm } from "react-hook-form";
import RadioButton from "../shared/radioBtn";
import Button from "../shared/button";
import SelectDropdown from "../shared/dropdownInput/dropdown";



const DatabaseModal = ({ store, openModal, closeModal, handleDatabaseInfo }) => {

    const categories = useSelector((state) => state.productCategories);
    const productsDatabase = useSelector((state) => state.productsDatabase);

    const sortedProducts = useMemo(() => {
        return productsDatabase?.slice().sort((a, b) => a.name.localeCompare(b.name));
    }, [productsDatabase]);

    const [isDisabled] = useState(false);
    const [filteredProducts, setFilterProducts] = useState(sortedProducts);
    const firstProductName = filteredProducts[0]?.name || "";

    const [selectedProduct, setSelectedProduct] = useState(firstProductName);


    useEffect(() => {
        setFilterProducts(sortedProducts);
        setSelectedProduct(firstProductName);
    }, [productsDatabase]);

    useEffect(() => {
        setSelectedProduct(firstProductName);
    }, [filteredProducts])


    const productCategories = [
        ...categories?.map((c) => {
            return { label: c?.name, value: c?.name };
        }),
        { label: "Others", value: "Others" },
    ];

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


    // Handle product selection
    const handleProductChange = () => {
        const productName = selectedProduct;
        const product = filteredProducts?.find((product) => product.name === productName);
        handleDatabaseInfo(product);
    };

    // Handle form submission
    const onSubmit = () => {
        closeModal(false);
        setSelectedProduct(firstProductName);

        if (selectedProduct) {
            handleProductChange();
        }
    };


    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const handleSelectCategory = (val) => setSelectedCategory(val.value);


    // const handleSearch = (e) => {
    //     const filteredItems = sortedProducts.filter(product =>
    //         product.name.toLowerCase().includes(e.target.value.toLowerCase())
    //     );

    //     setFilterProducts(filteredItems);
    // }


    useEffect(() => {
        applyFilters();
    }, [selectedCategory, searchTerm]);
    

    const applyFilters = () => {
        let filteredItems = sortedProducts;
    
        if (selectedCategory) {
            filteredItems = filteredItems.filter(product => product.productCategory === selectedCategory);
        }
    
        if (searchTerm) {
            filteredItems = filteredItems.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
    
        setFilterProducts(filteredItems);
    };

    const groupedProductsByFirstLetter = useMemo(() => {
        if (filteredProducts?.length > 0) {
            const grouped = filteredProducts.reduce((accumulator, product) => {
                const firstLetter = product.name.charAt(0).toUpperCase();
                if (!accumulator[firstLetter]) {
                    accumulator[firstLetter] = [];
                }
                accumulator[firstLetter].push(product);
                return accumulator;
            }, {});
    
            // Sort each group after all products are grouped
            Object.keys(grouped).forEach(letter => {
                grouped[letter].sort((a, b) => a.name.localeCompare(b.name));
            });
    
            return grouped;
        }
    
        return {};
    }, [filteredProducts]); 


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
                        handleChange={handleSelectCategory}
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
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>


                    <div className="pt-[40px]">
                        {Object.keys(groupedProductsByFirstLetter ?? {})?.sort()?.map((firstLetter, index) => (
                            <div key={firstLetter} className="mb-[40px]">
                                <p className="text-[16px] leading-[25px] text-[#186F3D] mb-6">{firstLetter}</p>
                                {groupedProductsByFirstLetter[firstLetter].map((product, index) => (
                                    <div className="mb-6">
                                        <div key={product.name} className="flex gap-[12px]">
                                            <RadioButton
                                                type="radio"
                                                value={product.name}
                                                id={product.name}
                                                name="selectedProduct"
                                                checked={selectedProduct === product.name}
                                                handleChange={() => { setSelectedProduct(product.name) }}
                                            />
                                            <label htmlFor={product.name}>{product.name}</label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

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
                            onClick={() => onSubmit()}
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