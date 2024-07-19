import { useEffect, useState } from "react";

export const useFilter = (name, activeTab, DATA, searchTerm, filterObject) => {
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        let updatedData = DATA?.slice();

        // Filter by searchTerm
        if (searchTerm !== '') {
            updatedData = filterBySearchTerm(updatedData, name, searchTerm);
        }

        // Filter by activeTab
        if (activeTab !== "all") {
            updatedData = filterByActiveTab(updatedData, activeTab);
        }

        // Filter by filterObject
        if (Object.keys(filterObject).length > 0) {
            updatedData = filterByObject(updatedData, name, filterObject);
        }

        setFilteredData(updatedData);
    }, [name, activeTab, searchTerm, filterObject, DATA]); 

    return {
        filteredData
    };
};

// Filter functions
const filterBySearchTerm = (data, name, searchTerm) => {
    return data.filter(item => {
        const itemName = name === "products" ? item.name : item.orderID || item.name; // Adjust for different types
        return itemName.toLowerCase().includes(searchTerm.toLowerCase());
    });
};

const filterByActiveTab = (data, activeTab) => {
    return data.filter(item => item && item.status && item.status.toLowerCase() === activeTab);
};

const filterByObject = (data, name, filterObject) => {
    return data.filter(obj => {
        return Object.entries(filterObject).every(([key, values]) => {
            switch (key) {
                case 'price':
                case 'salesPrice':
                    return filterByPrice(obj, values, name);
                case 'orderDate':
                    return filterByOrderDate(obj, values);
                case 'customer':
                    return filterByCustomer(obj, values);
                case 'items':
                    return filterByItems(obj, values);
                case 'productName':
                    return filterByProductName(obj, values);
                case 'dateAdded':
                    return filterByDateAdded(obj, values);
                default:
                    return filterByDefault(obj, key, values);
            }
        });
    });
};

// Specific filter functions
const filterByPrice = (obj, values, name) => {
    if (name !== 'products') {
        return values.includes(`$${obj?.['grandTotal']}`);
    } else {
        return values.includes(`$${obj?.['price']}`);
    }
};

const filterByOrderDate = (obj, values) => {
    return values.includes(new Date(obj?.['createdAt'])?.toLocaleDateString());
};

const filterByCustomer = (obj, values) => {
    return values.includes(`${obj?.['firstName']?.toString()} ${obj?.['lastName']?.toString()}`);
};

const filterByItems = (obj, values) => {
    return values.includes(`${obj?.['products']?.length}`);
};

const filterByProductName = (obj, values) => {
    return values.includes(obj?.["name"]?.toString());
};

const filterByDateAdded = (obj, values) => {
    return values.includes(new Date(obj?.['dateAdded'])?.toLocaleDateString());
};

const filterByDefault = (obj, key, values) => {
    return values.includes(obj[key]?.toString());
};

export default useFilter;
