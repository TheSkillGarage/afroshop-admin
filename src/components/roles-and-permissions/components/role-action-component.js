import React, { useEffect } from "react";
import ToggleSwitch from "../../toggle-switch";
import Checkbox from "../../shared/checkbox";

const RoleActionComponent = ({ sections, section, saveSections }) => {
  
  const handleCheck = (action, d, label) => {
    const obj = {};
    const updatedActions = sections?.map((s) => {
      if (s.label == label) {
        obj[action] = !s.action[action];
        console.log(obj);
        return { ...s, action: { ...s.action, ...obj } };
      }
      return s;
    });
    saveSections?.(updatedActions);
  };

  return (
    <div className="flex flex-col gap-8 mt-8 w-full">
      <ToggleSwitch onToggle={() => {}}>Allow Access</ToggleSwitch>
      <div className="flex w-full justify-between">
        {Object.keys(section.action).map((action, index) => (
          <div className="flex" key={index}>
            <Checkbox
              name={`${section.label}-${action}`}
              value={
                section.action[action] === true
                  ? `${section.label}-${action}`
                  : ""
              }
              valueOnChecked={`${section.label}-${action}`}
              handleChange={() =>
                handleCheck(action, section.action, section.label)
              }
            />
            <p className="capitalize">{action}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleActionComponent;
