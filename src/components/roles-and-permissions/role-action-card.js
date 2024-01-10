import React from "react";
import { DropdownClose } from "../../images";

const RoleActionCard = ({
  section,
  sections,
  saveSections,
  index,
  reset,
  component,
}) => {
  const handleDropdownClick = (updatedSection) => {
    const updatedItems = sections?.map((s) => {
      if (s.value === true) reset?.();
      if (s.label === updatedSection) {
        return { ...s, value: !s.value };
      }
      return s;
    });
    saveSections?.(updatedItems);
  };
  return (
    <div>
      <div className="mt-8 border border-[#B3B3B3] p-4 rounded-lg">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => handleDropdownClick(section?.label)}
        >
          <p className="text-[#186F3D] font-semibold">{section?.label}</p>
          <DropdownClose
            className={`w-4 h-4 ${section?.value ? "rotate-90" : ""}`}
          />
        </div>
        {section?.value && component && component}
      </div>
      {index !== sections?.length - 1 && (
        <div className="mt-8 border border-[#B3B3B3] border-dashed" />
      )}
    </div>
  );
};

export default RoleActionCard;
