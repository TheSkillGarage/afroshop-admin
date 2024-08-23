import React, { useEffect, useState } from "react";
import { ArrowRight, EditIcon2, EditIconGrey } from "../../images";
import Button from "../shared/button";
import ProfileTab from "./profileTab";
import { useSelector, useDispatch } from "react-redux";
import EditPassword from "./edit-password";
import { useForm } from "react-hook-form";
import { renderValidUrl } from "../../utils/constants";
import {
  getStoreDefaultValues,
  getTokenFromCookie,
  handleSubmitPassword,
  handleSubmitStore,
} from "../../utils";
import {
  deliveryOptions,
  deliverySlots,
  restPeriods,
} from "../../data/profile";
import { useLocation, useNavigate } from "react-router-dom";
import { getStoreById } from "../../redux/action";

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const token = getTokenFromCookie();
  const storeExists = useSelector((state) => state.storeExists);
  const storeID = useSelector((state) => state.storeID || 0);
  const stores = useSelector((state) => state.stores);
  const store = useSelector((state) =>
    state.stores && state.stores.length > 0 && storeID !== -1
      ? state.stores[storeID]
      : null
  );
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState();
  const profileForm = useForm({
    mode: "all",
  });

  useEffect(() => {
    const result = getStoreDefaultValues(store, storeExists, user);
    setProfileData(result);
    profileForm.reset({
      ...result?.store,
      ...result?.delivery,
      destination: null,
      fee: null,
    });
  }, [store, storeID]);

  console.log("here", store, storeExists, profileData, profileForm.getValues());

  const passwordForm = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "all",
  });

  const [currentTab, setCurrentTab] = useState("Profile");
  const [editProfile, setEditProfile] = useState(false);

  const handleProfileFormSubmit = async () => {
    await handleSubmitStore(
      profileData,
      store,
      setEditProfile,
      setLoading,
      storeExists,
      user,
      dispatch,
      token,
      stores
    );
  };

  const handlePasswordFormSubmit = async (data) => {
    await handleSubmitPassword(
      data,
      setLoading,
      token,
      passwordForm,
      setEditProfile
    );
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, [location.pathname]);

  const handleTabClick = (label) => {
    setCurrentTab(label);
  };

  const handleCancelClick = () => {
    setProfileData(profileData);
    setEditProfile(false);
    passwordForm?.reset();
    profileForm?.reset();
  };

  const disableButton =
    (Object.keys(profileForm?.formState?.errors).length === 0 &&
      !(
        profileData?.store?.profile_image === null &&
        profileData?.store?.profile_image_data === null
      ) &&
      currentTab === "Profile") ||
    (Object.keys(passwordForm?.formState?.errors).length === 0 &&
      currentTab === "Password");
  return (
    <div className="bg-[#F2F2F2] w-full py-6 px-4">
      <div className="flex items-center gap-8 mb-6">
        <p className="text-[rgba(48,48,48,0.4)] font-medium text-[14px] leading-[16.8px] -tracking[16%] font-['Lato']">
          ...
        </p>
        <p className="text-[13px] leading-[23px] text-[#186F3D]">
          {storeExists ? (
            currentTab
          ) : (
            <div className="flex gap-2 items-center">
              <p
                className="cursor-pointer"
                onClick={() => navigate("/dashboard")}
              >
                Overview
              </p>
              <img src={ArrowRight} alt="" className="w-4 h-4" />
              <p>Add My Store</p>
            </div>
          )}
        </p>
      </div>
      <div className="flex justify-center">
        {storeExists && (
          <div className="rounded w-[800px] bg-[#FFFFFF] flex justify-around py-3 px-[10px]">
            {["Profile", "Password"].map((t, index) => (
              <p
                key={index}
                onClick={() => handleTabClick(t)}
                className={`cursor-pointer w-[380px] flex items-center justify-center ${
                  t === currentTab
                    ? "font-semibold text-[#186F3D] rounded text-center shadow-lg py-2"
                    : "text-[#4F4F4F] font-normal"
                }`}
              >
                {t}
              </p>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 w-full bg-white h-full p-8">
        {storeExists && (
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
        )}
        {currentTab === "Profile" ? (
          <ProfileTab
            editProfile={editProfile}
            profileData={profileData}
            setProfileData={setProfileData}
            form={profileForm}
          />
        ) : (
          <EditPassword editProfile={editProfile} form={passwordForm} />
        )}

        {(editProfile || !storeExists) && (
          <div className="flex justify-end gap-6 mt-8">
            <Button
              variant="secondary"
              type="button"
              className="w-[133px]"
              onClick={() => handleCancelClick()}
            >
              Cancel
            </Button>
            <Button
              className="w-[133px]"
              type="submit"
              loading={loading}
              onClick={(event) => {
                event.preventDefault();
                currentTab === "Profile"
                  ? profileForm?.handleSubmit(handleProfileFormSubmit)()
                  : passwordForm?.handleSubmit(handlePasswordFormSubmit)();
              }}
              variant={disableButton ? "primary" : "disabled"}
            >
              {!storeExists ? "Submit" : "Save"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
