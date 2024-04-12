import React, { useState } from "react";
import StoreInfo from "./component/store-info";
import DeliveryFees from "./component/delivery-fees-section";
import HolidayException from "./component/holiday-exception-section";
import RoleActionCard from "../shared/cardDropdown/role-action-card";

const ProfileTab = (props) => {
  const [sections, setSections] = useState([
    {
      label: "Store Info",
      value: true,
    },
    {
      label: "Delivery Fees",
      value: false,
    },
    {
      label: "Holidays & Exceptions",
      value: false,
    },
  ]);

  const handleSections = (data) => {
    setSections(data);
  };

  return (
    <div>
      {sections.map((section, index) => {
        return (
          <div key={index}>
            <RoleActionCard
              section={section}
              saveSections={handleSections}
              sections={sections}
              index={index}
            >
              {section.label === "Store Info" && <StoreInfo {...props} />}
              {section.label === "Delivery Fees" && <DeliveryFees {...props} />}
              {section.label === "Holidays & Exceptions" && (
                <HolidayException {...props} />
              )}
            </RoleActionCard>
          </div>
        );
      })}
    </div>
  );
};

export default ProfileTab;
