import React, { useState } from "react";
import StoreInfo from "./component/store-info";
import DeliveryFees from "./component/delivery-fees-section";
import HolidayException from "./component/holiday-exception-section";
import RoleActionCard from "../roles-and-permissions/role-action-card";

const ProfileTab = ({
  editProfile,
  profileData,
  setProfileData,
}) => {
  const [sections, setSections] = useState([
    {
      label: "Store Info",
      value: false,
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

  const getComponent = (label) => {
    switch (label) {
      case "Store Info":
        return (
          <StoreInfo
            editProfile={editProfile}
            profileData={profileData}
            setProfileData={setProfileData}
          />
        );
      case "Delivery Fees":
        return (
          <DeliveryFees
            editProfile={editProfile}
            profileData={profileData}
            setProfileData={setProfileData}
          />
        );
      case "Holidays & Exceptions":
        return (
          <HolidayException
            editProfile={editProfile}
            profileData={profileData}
            setProfileData={setProfileData}
          />
        );
    }
  };
  return (
    <div>
      {sections.map((section, index) => {
        return (
          <div key={index}>
            <RoleActionCard
              section={section}
              component={getComponent(section.label)}
              saveSections={handleSections}
              sections={sections}
              index={index}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ProfileTab;
