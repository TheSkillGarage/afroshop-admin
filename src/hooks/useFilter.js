import { useEffect, useState } from "react";

export const useFilter = (name, activeTab, DATA, searchTerm, filterObject) => {

    const [filteredData, setFilteredData] = useState(DATA);

    useEffect(() => {
        setFilteredData(DATA)
    }, [DATA])


    useEffect(() => {
        let updatedData = DATA;

        if (searchTerm !== '') {
            if (name === "products") {
                updatedData = DATA.filter(product => product.productName?.toLowerCase().includes(searchTerm?.toLowerCase()));
            } else if (name === "orders") {
                updatedData = DATA.filter(order => order.orderID?.toLowerCase().includes(searchTerm?.toLowerCase()));
            } else if (name === "roles") {
                updatedData = DATA.filter(role => role.name?.toLowerCase().includes(searchTerm?.toLowerCase()));
            }
        }

        if (activeTab !== "all") {
            updatedData = updatedData.filter(obj => obj.status === activeTab);
        }


        if (Object.keys(filterObject).length > 0) {

            updatedData = DATA.filter(obj => {
                return Object.entries(filterObject).every(([key, values]) => {
                    if (key === 'price') {
                        return values.includes(obj.price.price?.toString());
                    } else {
                        return values.includes(obj[key]?.toString());
                    }
                });
            });
        }

        if (updatedData.length !== 0) { setFilteredData(updatedData) };

    }, [name, activeTab, searchTerm, filterObject, DATA]);


    return {
        filteredData
    };
};


export default useFilter;
