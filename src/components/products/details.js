import React, { useState } from "react";
import { DeleteIcon, DetailsIcon, EditIcon } from "../../images";


const Detail = () => {

    const [showDetails, setShowDetails] = useState(false);
    const handleShowDetails = () => setShowDetails(!showDetails);

    return (
        <div className="relative flex flex-col items-center">
        <DetailsIcon className="cursor-pointer" onClick={handleShowDetails}/>
            
        {showDetails && <div className="absolute top-[20px] bg-[#ffffff] w-[95px] h-[82px] rounded flex flex-col space-around py-4 px-4 z-[5] shadow-md">
            <div className="flex cursor-pointer mb-2">
                <EditIcon />
                <p>Edit</p>
            </div>

            <div className="flex cursor-pointer">
                <DeleteIcon />
                <p>Delete</p>
            </div>
        </div>}
    </div>
    )
}


export default Detail;