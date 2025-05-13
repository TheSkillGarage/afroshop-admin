import React, { useEffect, useState } from "react";
import { ArrowRight, EditIcon2, EditIconGrey } from "../../images";
import Button from "../shared/button";
import ProfileTab from "./profileTab";
import { useSelector, useDispatch } from "react-redux";
import EditPassword from "./edit-password";
import { useForm } from "react-hook-form";
import {
  getStoreDefaultValues,
  getTokenFromCookie,
  handleSubmitPassword,
  handleSubmitStore,
} from "../../utils";
import { useLocation, useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const token = getTokenFromCookie();
  const storeExists = useSelector((state) => state.storeExists);
  const stores = useSelector((state) => state.stores);
  const storeID = useSelector((state) => state.storeID);
  const store = useSelector((state) =>
    state.stores && state.stores.length > 0 ? state.stores[state.storeID] : {}
  );
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const [profileData, setProfileData] = useState(
    getStoreDefaultValues(store, user)
  );

  const [deliveryType, setDeliveryType] = useState(
    profileData?.delivery?.deliveryType ?? 0
  );

  const profileForm = useForm({
    defaultValues: {
      ...profileData?.store,
      ...profileData?.delivery,
      destination: null,
      fee: null,
    },
    mode: "all",
  });

  const [currentTab, setCurrentTab] = useState("Profile");
  const [disableButton, setDisable] = useState(false);

  useEffect(() => {
    if (currentTab === "Profile") {
      const noProfileImage = (
        profileData?.store?.profile_image === null &&
        profileData?.store?.profile_image_data === null
      );

      const validForm = Object.keys(profileForm?.formState?.errors).length === 0

      setDisable(!validForm || noProfileImage);
    } else if (currentTab === "Password") {
      setDisable(Object.keys(passwordForm?.formState?.errors).length !== 0);
    }
  }, [profileData, currentTab, profileForm]);

  useEffect(() => {
    const result = getStoreDefaultValues(store, user);
    setProfileData(result);
    profileForm.reset({
      ...result?.store,
      ...result?.delivery,
      destination: null,
      fee: null,
    });
    setEditProfile(false);
  }, [storeID, user]);

  const passwordForm = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "all",
  });

  const [editProfile, setEditProfile] = useState(false);

  const handleRedirect = () => {
    navigate("/");
    setEditProfile(false);
  };

  const validateForm = () => {    
    const baseDistance = profileForm.watch("base_distance");
    const baseAmount = profileForm.watch("base_amount");
    const additionalFee = profileForm.watch("additional_distance_fee");
    const unit = profileForm.watch("unit");
    const delivery = profileForm.watch("delivery");

    if (deliveryType === 0) {
      // Checks for `0` and update to `null` for error validation
      if (baseDistance === 0) {
        profileForm.setValue("base_distance", null, { shouldValidate: true });
      }
      if (baseAmount === 0) {
        profileForm.setValue("base_amount", null, { shouldValidate: true });
      }
      if (additionalFee === 0) {
        profileForm.setValue("additional_distance_fee", null, {
          shouldValidate: true,
        });
      }
      if (!unit) {
        profileForm.setValue("unit", null, { shouldValidate: true });
      }

      if (!baseDistance) {
        profileForm.setError("base_distance", {
          message: "Base Distance is required and must be greater than 0",
        });
      }
      if (!baseAmount) {
        profileForm.setError("base_amount", {
          message: "Base Amount is required and must be greater than 0",
        });
      }
      if (!additionalFee) {
        profileForm.setError("additional_distance_fee", {
          message:
            "Additional Distance Fee is required and must be greater than 0",
        });
      }
      if (!unit) {
        profileForm.setError("unit", {
          message: "Unit of Measurement is required",
        });
      }
    }

    if (deliveryType === 1) {
      if (!delivery || delivery.length < 2) {
        profileForm.setError("destination", {
          message: "At least two tiers are required for Tiered Distance Fees.",
        });
        profileForm.setError("fee", {
          message: "At least two tiers are required for Tiered Distance Fees.",
        });
      }
    }
  };

  const validateFormDays = () => {
    const days = profileForm.watch("days");
    if (!days || days.length < 2) {
      profileForm.setError("days", {
        message: "At least one day must be selected",
      });
    }
  };

  const handleProfileFormSubmit = async () => {
    await handleSubmitStore(
      profileData,
      store,
      handleRedirect,
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

  const handleProfileValidation = async () => {
    await validateForm();
    await validateFormDays();
    profileForm?.handleSubmit(handleProfileFormSubmit)();
  };

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
                className={`cursor-pointer w-[380px] flex items-center justify-center ${t === currentTab
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
              className={`flex gap-2 items-center font-semibold cursor-pointer ${editProfile ? "text-[#CCCCCC]" : "text-[#186F3D]"
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
            validateForm={validateForm}
            deliveryType={deliveryType}
            setDeliveryType={setDeliveryType}
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
                  ? handleProfileValidation()
                  : passwordForm?.handleSubmit(handlePasswordFormSubmit)();
              }}
              variant={
                disableButton
                  ? "disabled"
                  : "primary"
              }
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
