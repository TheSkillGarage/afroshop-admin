import React, { useState } from "react";


const SidebarTab = ({name, image, selectedImage, isSelected, handleSelection}) => {

    return (
        <div
            className={`flex gap-2 mb-4 cursor-pointer py-4 px-2 rounded ${isSelected === name ? "bg-[#186F3D] text-[#ffffff]" : "text-[#999999]"} max-h-[47px] min-h[47px] items-center`}
            onClick={() => handleSelection(name)}>
            <img src={isSelected === name ? selectedImage : image} alt="icon" />
            <p className={`text-[13px] leading-[23px] capitalize`}>{name}</p>
        </div>
    )
}

export default SidebarTab;