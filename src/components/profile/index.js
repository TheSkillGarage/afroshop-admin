import React, { useState } from "react";
import { EditIcon2, EditIconGrey } from "../../images";
import Button from "../shared/button";
import ProfileTab from "./profileTab";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../../redux/action";
import EditPassword from "./component/edit-password";

const Profile = () => {
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState("Profile");
  const [editProfile, setEditProfile] = useState(false);
  const [profileData, setProfileData] = useState(useSelector((d) => d.profile));

  const handleFormSubmit = () => {
    dispatch(updateProfile({ profile: profileData }));
  };

  const [tab, setTab] = useState([
    {
      label: "Profile",
      value: true,
    },
    {
      label: "Password",
      value: false,
    },
  ]);

  const handleTabClick = (label) => {
    setCurrentTab(label);
    const updatedTab = tab.map((t) => {
      if (t.label === label) {
        return { ...t, value: true };
      } else {
        return { ...t, value: false };
      }
    });
    setTab(updatedTab);
  };

  return (
    <div className="bg-[#F2F2F2] w-full py-6 px-4">
      <div className="flex items-center gap-8 mb-6">
        <p className="text-[rgba(48,48,48,0.4)] font-medium text-[14px] leading-[16.8px] -tracking[16%] font-['Lato']">
          ...
        </p>
        <p className="text-[13px] leading-[23px] text-[#186F3D]">
          {currentTab}
        </p>
      </div>
      <div className="flex justify-center">
        <div className="rounded w-[800px] bg-[#FFFFFF] flex justify-around py-3 px-[10px]">
          {tab.map((t, index) => (
            <p
              key={index}
              onClick={() => handleTabClick(t.label)}
              className={`cursor-pointer w-[380px] flex items-center justify-center ${
                t.value
                  ? "font-semibold text-[#186F3D] rounded text-center shadow-lg py-2"
                  : "text-[#4F4F4F] font-normal"
              }`}
            >
              {t.label}
            </p>
          ))}
        </div>
      </div>

      <div className="mt-8 w-full bg-white h-full p-8">
        <div className="py-4 px-4 border-b-[2px] text-[#186F3D] border-[#E6E6E6] flex items-center justify-between">
          <p className="text-xl font-bold">{currentTab}</p>
          <p
            className={`flex gap-2 items-center font-semibold cursor-pointer ${
              editProfile ? "text-[#CCCCCC]" : "text-[#186F3D]"
            }`}
            onClick={() => setEditProfile(true)}
          >
            {editProfile ? (
              <EditIconGrey />
            ) : (
              <EditIcon2 className="text-[#186F3D]" />
            )}{" "}
            Edit
          </p>
        </div>
        <form>
          {currentTab === "Profile" ? (
            <ProfileTab
              editProfile={editProfile}
              profileData={profileData}
              setProfileData={setProfileData}
            />
          ) : (
            <EditPassword editProfile={editProfile} />
          )}

          {editProfile && (
            <div className="flex justify-end gap-6 mt-8">
              <Button
                variant="secondary"
                type="button"
                className="w-[133px]"
                onClick={() => setEditProfile(false)}
              >
                Cancel
              </Button>
              <Button
                className="w-[133px]"
                type="submit"
                onClick={(event) => {
                  event.preventDefault();
                  handleFormSubmit();
                }}
              >
                Save
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;
