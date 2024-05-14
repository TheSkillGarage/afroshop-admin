import React from "react";
import { EmptyStateImage } from "../../images";


const EmptyState = ({caps}) => {
    return (
        <>
        <div className="flex flex-col gap-4 justify-center items-center px-12">
            <img src={EmptyStateImage} alt="empty-state"/>
            <p className="text-[13px] leading-[23px] text-[#7F7F7F] text-center">Oops! It’s empty over here. Begin store operations and {caps} would be populated.</p>
        </div>
        </>
    )
}

export default EmptyState;