import { useEffect, useState } from "react";

export const useFilter = (activeTab, DATA) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (activeTab === "all") {
            setData(DATA);
        } else {
            const filteredData = DATA.filter(obj => obj.status === activeTab);
            setData(filteredData);
            console.log(filteredData);
        }
    }, [activeTab, DATA]);

    return {
        data
    };
};


export default useFilter;
