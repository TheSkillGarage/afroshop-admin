import { useEffect, useState } from "react";

export const useFilter = (name, activeTab, DATA, searchTerm) => {

    const [filteredData, setFilteredData] = useState(DATA);

    useEffect(() => {
        let updatedData = DATA;

        if (searchTerm !== '') {
            if (name === "products") {
                updatedData = DATA.filter(product => product.productName.toLowerCase().includes(searchTerm.toLowerCase()));
            } else if (name === "orders") {
                updatedData = DATA.filter(order => order.orderID.toLowerCase().includes(searchTerm.toLowerCase()));
            }
        }

        if (activeTab !== "all") {
            updatedData = updatedData.filter(obj => obj.status === activeTab);
        }

        setFilteredData(updatedData);

    }, [name, activeTab, DATA, searchTerm]);


    return {
        filteredData
    };
};


export default useFilter;
