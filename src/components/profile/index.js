import React, { useEffect, useState } from "react";
import { EditIcon2, EditIconGrey } from "../../images";
import Button from "../shared/button";
import ProfileTab from "./profileTab";
import { useSelector, useDispatch } from "react-redux";
import { postRequest, updateProfile } from "../../redux/action";
import EditPassword from "./edit-password";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { expirationDate,  getTokenFromCookie, setCookieWithExpiry } from "../../utils";

const Profile = () => {
  const dispatch = useDispatch();
  const data = useSelector((d) => d.profile);
  const [profileData, setProfileData] = useState({ ...data });
  const profileForm = useForm({
    defaultValues: {
      ...profileData?.store,
      destination: "",
      fee: "",
      description: "",
      date: "",
    },
    mode: "all",
  });

  const passwordForm = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "all",
  });

  // Accessing the form state
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = passwordForm;

  const [currentTab, setCurrentTab] = useState("Profile");
  const [editProfile, setEditProfile] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const token =  getTokenFromCookie();
  
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const [success, responseData] = await postRequest(
        "/api/auth/change-password",
        {
          currentPassword: data.currentPassword,
          password: data.newPassword,
          passwordConfirmation: data.confirmPassword,
        },
        token
      );
      if (!success || responseData?.error) {
        throw new Error(responseData?.error?.message || "Password updated successfully");
      } else {
        reset();
        setCookieWithExpiry( responseData?.jwt)
        toast.success(`Password updated successfully`, { autoClose: 2000 });
      }
    } catch (error) {
      
      toast.error(`${error}`, {
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };
  const handleProfileFormSubmit = () => {
    dispatch(updateProfile({ profile: { ...profileData } }));
    setEditProfile(false);
  };

  const handlePasswordFormSubmit = () => {
    passwordForm?.reset();
    setEditProfile(false);
  };

  const handleTabClick = (label) => {
    setCurrentTab(label);
  };

  const handleCancelClick = () => {
    setProfileData(data);
    setEditProfile(false);
    passwordForm?.reset();
    profileForm?.reset();
  };
  const disableButton =
    (Object.keys(profileForm?.formState?.errors).length === 0 &&
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
          {currentTab}
        </p>
      </div>
      <div className="flex justify-center">
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
        <form onSubmit={currentTab !== "Profile" ? handleSubmit(onSubmit) : profileForm?.handleSubmit(handleProfileFormSubmit)}>
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

          {editProfile && (
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
                // onClick={(event) => {
                //   event.preventDefault();
                //   currentTab === "Profile"
                //     ? profileForm?.handleSubmit(handleProfileFormSubmit)()
                //     : handleSubmit(onSubmit);
                // }}
                variant={disableButton ? "primary" : 'disabled'}
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
