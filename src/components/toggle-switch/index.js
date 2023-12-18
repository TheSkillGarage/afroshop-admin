import React, { useState } from "react";

const ToggleSwitch = (props) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
    props?.onToggle();
  };

  return (
    <label className="flex gap-3 text-[#333333] items-center cursor-pointer">
      <div className="relative">
        <div
          className={`relative toggle__line w-12 h-6 ${
            isChecked ? "bg-[#D4FFEB]" : "bg-[#CCCCCC]"
          } rounded-full shadow-inner`}
          onClick={handleToggle}
        />
        <div
          className={`toggle__dot absolute w-4 h-4 top-1 left-1 rounded-full shadow inset-y-0 left-0 transform transition-transform ${
            isChecked ? "translate-x-6 bg-[#055E35]" : "bg-white"
          }`}
        />
      </div>
       <p>{props.children}</p>
    </label>
  );
};

export default ToggleSwitch;
