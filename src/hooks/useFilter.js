import { useEffect, useState } from "react";

export const useFilter = (name, activeTab, DATA, searchTerm, filterObject) => {

    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        let updatedData = DATA;

        if (searchTerm !== '') {
            if (name === "products") {
                updatedData = updatedData.filter(product => product.name?.toLowerCase().includes(searchTerm?.toLowerCase()));
            } else if (name === "orders") {
                updatedData = updatedData.filter(order => order.orderID?.toLowerCase().includes(searchTerm?.toLowerCase()));
            } else if (name === "roles") {
                updatedData = updatedData.filter(role => role.name?.toLowerCase().includes(searchTerm?.toLowerCase()));
            }
        }

        if (activeTab !== "all") {
            updatedData = updatedData.filter(obj => obj && obj.status && obj.status.toLowerCase() === activeTab);
        }

        if (Object.keys(filterObject).length > 0) {
            updatedData = updatedData.filter(obj => {
                return Object.entries(filterObject).every(([key, values]) => {
                    if (key === 'price' && name !== 'products') {
                        return values.includes(`$${obj?.['grandTotal']}`);
                    }else if (key === 'price' && name === 'products') {
                        return values.includes(`$${obj?.['price']}`);
                    }
                     else if (key === 'orderDate') {
                        return values.includes(obj?.['createdAt']?.toString());
                    } else if (key === 'customer') {
                        return values.includes(`${obj?.['firstName']?.toString()} ${obj?.['lastName']?.toString()}`);
                    } else if (key === 'items') {
                        return values.includes(`${obj?.['products']?.length}`);
                    } else {
                        return values.includes(obj[key]?.toString());
                    }
                });
            });
        }

        setFilteredData(updatedData); // Always set filteredData

    }, [name, activeTab, searchTerm, filterObject]);


    return {
        filteredData
    };
};

export default useFilter;
