import React, { useEffect, useState } from "react";
import { ArrowRight, EditIcon2, EditIconGrey } from "../../images";
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
  handleCreateAddress,
  setCookieWithExpiry,
} from "../../utils";
import {
  deliveryOptions,
  deliverySlots,
  restPeriods,
} from "../../data/profile";
import { useLocation, useNavigate } from "react-router-dom";
import { string } from "prop-types";

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const token = getTokenFromCookie();
  const storeExists = useSelector((state) => state.storeExists);
  const data = useSelector((d) => d.profile);
  const store = useSelector((d) => d.store);
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  
  const [profileData, setProfileData] = useState({
    ...data,
    holidays: store.holidays ?? [],
    store: {
      ...data.store,
      days: store?.openDays?.map((day) => day?.openDays) || "",
      email: user?.email || "",
      store_name: store?.name || "",
      address: store?.address?.streetAddress || "",
      city: store?.address?.city || "",
      state: store?.address?.state || "",
      postal_code: store?.address?.postalCode || "",
      country: store?.address?.country || "",
      deliveryStartTime: store?.deliveryTime?.from || "",
      deliveryEndTime: store?.deliveryTime?.to || "",
      profile_image: storeExists ? renderValidUrl(store?.image) : null,
      openingTime: store?.openingTimes?.from || "",
      closingTime: store?.openingTimes?.to || "",
      deliveryOption: deliveryOptions.filter(
        (d) => store?.deliveryOptions[d?.value]
      ),
      deliverySlot:
        deliverySlots.find(
          (option) =>
            option?.value === store?.deliverySlots?.deliverySlotLengthinHrs
        )?.value || "",
      restPeriod:
        restPeriods.find(
          (option) => option?.value === store?.deliverySlots?.restPeriodinHrs
        )?.value || "",
    },
    delivery: store?.deliveryFees
      ? {
          base_amount: store?.deliveryFees?.baseFee,
          base_distance: store?.deliveryFees?.baseDistance,
          additional_distance_fee: store?.deliveryFees?.additionalFeePerUnit,
          unit: store?.deliveryFees?.measurementUnit,
          delivery:
            [
              {
                label: "Within 5km",
                value: store?.deliveryFees?.less_than_5,
              },
              {
                label: "Between 5 to 10km",
                value: store?.deliveryFees?.between_5_and_10,
              },
              {
                label: "Between 10 to 15km",
                value: store?.deliveryFees?.between_10_and_15,
              },
              {
                label: "Between 15 to 20km",
                value: store?.deliveryFees?.between_15_and_20,
              },
              {
                label: "More than 20km",
                value: store?.deliveryFees?.more_than_20,
              },
            ] ?? [],
        }
      : {},
  });

  const profileForm = useForm({
    defaultValues: {
      ...profileData?.store,
      ...profileData?.delivery,
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
      openingTimes: {
        from: profileData?.store?.openingTime,
        to: profileData?.store?.closingTime,
      },
      deliverySlots: {
        deliverySlotLengthinHrs: profileData?.store?.deliverySlot,
        restPeriodsinHrs: profileData?.store?.restPeriod,
      },
      deliveryOptions: {
        delivery: profileData?.store?.deliveryOption
          ?.map((option) => option?.value)
          .includes("delivery")
          ? true
          : false,
        pickUp: profileData?.store?.deliveryOption
          ?.map((option) => option?.value)
          .includes("pickUp")
          ? true
          : false,
      },
      holidays: profileData?.holidays,
      deliveryFees: {
        useTieredPricing:
          profileData?.delivery?.deliveryType === 0 ? false : true,
        baseFee: profileData?.delivery?.base_amount,
        baseDistance: profileData?.delivery?.base_distance,
        additionalFeePerUnit: profileData?.delivery?.additional_distance_fee,
        less_than_5: profileData?.delivery.delivery
          ? profileData.delivery?.delivery?.filter(
              (data) => data.label === "Within 5km"
            )[0]?.value
          : null,
        between_5_and_10: profileData?.delivery.delivery
          ? profileData.delivery?.delivery.filter(
              (data) => data.label === "Between 5 to 10km"
            )[0]?.value
          : null,
        between_10_and_15: profileData?.delivery.delivery
          ? profileData.delivery?.delivery.filter(
              (data) => data.label === "Between 10 to 15km"
            )[0]?.value
          : null,
        between_15_and_20: profileData?.delivery.delivery
          ? profileData.delivery?.delivery.filter(
              (data) => data.label === "Between 15 to 20km"
            )[0]?.value
          : null,
        more_than_20: profileData?.delivery.delivery
          ? profileData.delivery?.delivery.filter(
              (data) => data.label === "More than 20km"
            )[0]?.value
          : null,
      },
    };

    if (!storeExists) {
      // const address = await handleCreateAddress(updatedStore.address);
      // console.log(address)
      updatedStore.phoneNumber = user?.phoneNumber;
      updatedStore.storeKeeper = user?.id;
      updatedStore.address = 1;
    }

    //upload image first if it exists before other store updates
    if (
      profileData?.store?.profile_image_data &&
      profileData?.store?.profile_image
    ) {
      const uploaded_img = await handleAvatarSubmit(
        profileData?.store?.profile_image_data,
        store.id ?? `store${user?.id}`
      );
      updatedStore.image = uploaded_img?.[0]?.id;
    }

    //api call to create or update store details
    try {
      const [success, responseData] = !storeExists
        ? await postRequest(`/api/stores/`, updatedStore, token)
        : await putRequest(`/api/stores/${store?.id}`, updatedStore, token);
      if (!success || responseData?.error) {
        throw new Error(
          responseData?.error?.message || "An error occurred, please try again"
        );
      } else {
        dispatch(getStoreByUser(user?.id, token));
        dispatch(updateProfile({ profile: { ...profileData } }));
        toast.success(
          !storeExists
            ? `Store created successfully`
            : `Store details updated successfully`,
          {
            autoClose: 2000,
          }
        );
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

  useEffect(() => {
    window.scroll(0, 0);
  }, [location.pathname]);

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
