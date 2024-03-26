import React, { useEffect, useState } from "react";
import { EditIcon2, EditIconGrey } from "../../images";
import Button from "../shared/button";
import ProfileTab from "./profileTab";
import { useSelector, useDispatch } from "react-redux";
import {
  getStoreByUser,
  postRequest,
  putRequest,
  updateProfile,
  updateStore,
} from "../../redux/action";
import EditPassword from "./edit-password";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { renderValidUrl } from "../../utils/constants";
import {
  expirationDate,
  getTokenFromCookie,
  handleAvatarSubmit,
  setCookieWithExpiry,
} from "../../utils";

const Profile = () => {
  const dispatch = useDispatch();
  const token = getTokenFromCookie();
  const data = useSelector((d) => d.profile);
  const store = useSelector((d) => d.store);
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    ...data,
    holidays: store?.holidays,
    store: {
      ...data.store,
      days: store?.openDays?.map((day) => day?.openDays) || "",
      email: user?.email || "",
      store_name: store?.name || "",
      address: store?.address?.streetAddress,
      city: store?.address?.city,
      state: store?.address?.state,
      postal_code: store?.address?.postalCode,
      country: store?.address?.country,
      deliveryStartTime: store?.deliveryTime?.from,
      deliveryEndTime: store?.deliveryTime?.to,
      profile_image: renderValidUrl(store?.image),
    },
  });

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

  const [currentTab, setCurrentTab] = useState("Profile");
  const [editProfile, setEditProfile] = useState(false);

  const handleProfileFormSubmit = async () => {
    setLoading(true);

    //checks if the store exists and user(storeKeeper) is found
    if (!store || !store?.id || !user?.id) {
      throw new Error("Store information is missing or incomplete");
    }

    //restructuring of new details of store to be updated
    const updatedStore = {
      name: profileData?.store?.store_name,
      address: {
        streetAddress: profileData?.store?.address,
        state: profileData?.store?.state,
        city: profileData?.store?.city,
        postalCode: profileData?.store?.postal_code,
        country: profileData?.store?.country,
      },
      openDays: profileData?.store?.days?.map((day) => {
        return { openDays: day };
      }),
      deliveryTimes: {
        from: profileData?.store?.deliveryStartTime,
        to: profileData?.store?.deliveryEndTime,
      },
      holidays: profileData?.holidays,
    };

    //upload image first if it exists before other store updates
    if (
      profileData?.store?.profile_image_data &&
      profileData?.store?.profile_image
    ) {
      const uploaded_img = await handleAvatarSubmit(
        profileData?.store?.profile_image_data,
        store?.id
      );
      updatedStore.image = uploaded_img[0]?.id;
    }

    //api call to update store details
    try {
      const [success, responseData] = await putRequest(
        `/api/stores/${store?.id}`,
        updatedStore,
        token
      );
      if (!success || responseData?.error) {
        throw new Error(
          responseData?.error?.message || "An error occurred, please try again"
        );
      } else {
        dispatch(getStoreByUser(user?.id, token));
        dispatch(updateProfile({ profile: { ...profileData } }));
        toast.success(`Store details updated successfully`, {
          autoClose: 2000,
        });
        setEditProfile(false);
      }
    } catch (error) {
      console.error("Error updating store information:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordFormSubmit = async (data) => {
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
        throw new Error(responseData?.error?.message);
      } else {
        passwordForm.reset();
        setCookieWithExpiry(responseData?.jwt);
        toast.success(`Password updated successfully`, { autoClose: 2000 });
        setEditProfile(false);
      }
    } catch (error) {
      console.error(error.message);
      toast.error(`${error.message}`, {
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
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
    (Object.keys(profileForm?.formState?.errors).length === 0 &&  !!(profileData?.store?.profile_image && profileData?.store?.profile_image_data) &&
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
              onClick={(event) => {
                event.preventDefault();
                currentTab === "Profile"
                  ? profileForm?.handleSubmit(handleProfileFormSubmit)()
                  : passwordForm?.handleSubmit(handlePasswordFormSubmit)();
              }}
              variant={disableButton ? "primary" : "disabled"}
            >
              Save
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
