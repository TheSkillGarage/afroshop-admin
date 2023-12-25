import React, { useEffect, useState } from "react";
import { DropdownClose } from "../../images";
import ToggleSwitch from "../toggle-switch";
import Checkbox from "../shared/checkbox";

const RoleActionCard = ({ sections, saveSections, ComponentsMap, reset }) => {
  const handleDropdownClick = (updatedSection) => {
    const updatedItems = sections?.map((s) => {
      if (s.label === updatedSection) {
        return { ...s, value: !s.value };
      }
      return s;
    });

    saveSections?.(updatedItems);
  };

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

  useEffect(() => {
    const newValue = sections.map((s) => {
      if (
        s.value === true &&
        Object.values(s.action).every((value) => value === false)
      ) {
        return { ...s, value: !s.value };
      } else {
        return s;
      }
    });
    saveSections?.(newValue);
  }, []);

  return (
    <div>
      {sections?.map((section, index) => {
        const Component = ComponentsMap && ComponentsMap[section.component];
        return (
          <div key={index}>
            <div className="mt-8 border border-[#B3B3B3] p-4 rounded-lg">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => handleDropdownClick(section.label)}
              >
                <p className="text-[#186F3D] font-semibold">{section.label}</p>
                <DropdownClose
                  className={`w-4 h-4 ${section.value ? "rotate-90" : ""}`}
                />
              </div>
              {section.value && section.component && <Component />}
              {section.value && !section.component && (
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
              )}
            </div>
            {index !== sections.length - 1 && (
              <div className="mt-8 border border-[#B3B3B3] border-dashed" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RoleActionCard;
