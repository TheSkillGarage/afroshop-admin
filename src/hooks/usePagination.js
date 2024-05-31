import { useEffect, useState } from "react";

export const usePagination = (page, itemsPerPage, DATA) => {

    const [count, setCount] = useState({start: 0, stop: 0});
    const [currentData, setCurrentData] = useState([]);
    const [pageButtons, setPageButtons] = useState([]);

    const totalPages = Math.ceil(DATA?.length / itemsPerPage);

    useEffect(() => {
        
        // handles number of items displayed in a table depending on Items per page
        const start = (page - 1) * parseInt(itemsPerPage);
        const end = start + parseInt(itemsPerPage);
        setCurrentData(DATA?.slice(start, end));
    
        // handles pagination buttons displayed
        let a = []
    
        for (let i = 1; i <= totalPages; i++) {
            a.push(i);
        }
    
        let b = [...a.slice(page - 1, a.length)]
    
        if (a.length <= 6) {
            setPageButtons(a);
        } else if (b.length <= 6) {
            setPageButtons([...a.slice(a.length - 6, a.length)]);
        } else {
            setPageButtons([...b.slice(0, 4), "...", b[b.length - 1]]);
        }
    
        // Updates count using the function form of setState
        setCount(prevCount => ({
            ...prevCount,
            start: start,
            stop: end <= DATA?.length ? end : DATA?.length,
        }));
    
    }, [page, itemsPerPage, DATA, totalPages]);
    

    return {
        count,
        currentData,
        pageButtons,
        totalPages
    }
 
};

export default usePagination;
