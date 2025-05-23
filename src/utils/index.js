import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { AFROADMIN_TOKEN, renderValidUrl } from "./constants";
import axios from "axios";
import {
  handleAvatarSubmit,
  postRequest,
  putRequest,
  updateStores,
  setStoreID,
} from "../redux/action";
import { deliveryOptions, deliverySlots, restPeriods } from "../data/profile";

// Set a cookie that expires in 3 hours
const expirationTimeInMinutes = 3 * 60;
export const expirationDate = new Date(
  new Date().getTime() + expirationTimeInMinutes * 60 * 1000
);

export const setCookieWithExpiry = (value) =>
  Cookies.set(AFROADMIN_TOKEN, value, {
    expires: expirationDate,
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });

export const getTokenFromCookie = () => Cookies.get(AFROADMIN_TOKEN);

export const removeTokenFromCookie = () =>
  Cookies.remove(AFROADMIN_TOKEN, { path: "/" });

export const capitalize = (myString) => {
  return myString.charAt(0).toUpperCase() + myString.slice(1)
}

export function mergeUniqueByUrl(inputArray, newData) {
  // Create a Set of all the URLs in inputArray
  const urlsInInputArray = new Set(inputArray.map(obj => obj.url));

  // Filter out objects from newData where the url exists in inputArray
  const filteredNewData = newData.filter(obj => !urlsInInputArray.has(obj.url));

  // Return inputArray combined with the filtered NewData
  return [...inputArray, ...filteredNewData];
}

export const handleCreateAddress = async (address) => {
  try {
    const { data } = await axios.post(`/addresses`, address, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getTokenFromCookie()}`,
      },
    });
    if (!data) {
      throw new Error("error creating address");
    }
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getStoreDefaultValues = (store, user) => {
  return {
    holidays: store?.holidays ?? [],
    store: {
      businessType: store?.businessType,
      storeType: store?.storeType,
      days: store?.openDays?.map((day) => day?.openDays) || [],
      email: user?.email || "",
      allowUserSKU: store?.allowUserSKU || false,
      store_name: store?.name || "",
      address: store?.address?.streetAddress || "",
      city: store?.address?.city || "",
      state: store?.address?.state || "",
      postal_code: store?.address?.postalCode || "",
      country: store?.address?.country || "",
      deliveryStartTime: store?.deliveryTime?.from || "",
      deliveryEndTime: store?.deliveryTime?.to || "",
      profile_image: store?.image ? renderValidUrl(store?.image) : null,
      openingTime: store?.openingTimes?.from || "",
      closingTime: store?.openingTimes?.to || "",
      deliveryOption: store?.deliveryOptions
        ? deliveryOptions.filter((d) => store?.deliveryOptions[d?.value])
        : [],
      deliverySlot: store?.deliverySlots
        ? deliverySlots.find(
          (option) =>
            option?.value === store?.deliverySlots?.deliverySlotLengthinHrs
        )?.value
        : "",
      restPeriod:
        restPeriods.find(
          (option) => option?.value === store?.deliverySlots?.restPeriodinHrs
        )?.value || "",
    },
    delivery: {
      base_amount: store?.deliveryFees ? store?.deliveryFees?.baseFee : 0,
      base_distance: store?.deliveryFees
        ? store?.deliveryFees?.baseDistance
        : 0,
      additional_distance_fee: store?.deliveryFees
        ? store?.deliveryFees?.additionalFeePerUnit
        : 0,
      unit: store?.deliveryFees ? store?.deliveryFees?.measurementUnit : 0,
      deliveryType: (!store?.deliveryFees?.useTieredPricing ? 0 : 1) || 0,
      delivery: [
        store?.deliveryFees?.less_than_5 && {
          label: "Within 5km",
          value: store.deliveryFees.less_than_5,
        },
        store?.deliveryFees?.between_5_and_10 && {
          label: "Between 5 to 10km",
          value: store.deliveryFees.between_5_and_10,
        },
        store?.deliveryFees?.between_10_and_15 && {
          label: "Between 10 to 15km",
          value: store.deliveryFees.between_10_and_15,
        },
        store?.deliveryFees?.between_15_and_20 && {
          label: "Between 15 to 20km",
          value: store.deliveryFees.between_15_and_20,
        },
        store?.deliveryFees?.more_than_20 && {
          label: "Over 20km",
          value: store.deliveryFees.more_than_20,
        },
      ].filter(Boolean)
    },
  };
};

export const getStorePayload = async (
  profileData,
  storeExists,
  user,
  store
) => {
  const updatedStore = {
    businessType: profileData?.store?.businessType,
    storeType: profileData?.store?.storeType,
    name: profileData?.store?.store_name,
    allowUserSKU: profileData?.store?.allowUserSKU,
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
      restPeriodinHrs: profileData?.store?.restPeriod,
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
    holidays: profileData?.holidays?.map((h) => {
      return { description: h?.description, date: h?.date };
    }),
    deliveryFees: {
      measurementUnit: profileData?.delivery?.unit ?? "",
      useTieredPricing:
        profileData?.delivery?.deliveryType === 0 ? false : true,
      baseFee: profileData?.delivery?.base_amount ?? 0,
      baseDistance: profileData?.delivery?.base_distance ?? 0,
      additionalFeePerUnit: profileData?.delivery?.additional_distance_fee ?? 0,
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
    storeDiscount: {
      discount: false,
      percentageDiscount: 0
    },
    storeMarkup: {
      markup: false,
      percentageMarkup: 0
    }
  };

  //if there's no store, it populates the phone number and store keeper id
  if (!storeExists) {
    updatedStore.phoneNumber = user.phoneNumber ?? "";
    updatedStore.storeKeeper = user?.id;
  }

  //upload image first if it exists before other store updates
  if (
    profileData?.store?.profile_image_data &&
    profileData?.store?.profile_image
  ) {
    const uploaded_img = await handleAvatarSubmit(
      profileData?.store?.profile_image_data,
      store?.id ?? `store${user?.id}`
    );
    updatedStore.image = uploaded_img?.[0]?.id;
  }

  return updatedStore;
};

export const handleSubmitStore = async (
  profileData,
  store,
  handleRedirect,
  setLoading,
  storeExists,
  user,
  dispatch,
  token,
  stores
) => {
  setLoading(true);
  //restructuring of new details of store to be updated
  const updatedStore = await getStorePayload(
    profileData,
    storeExists,
    user,
    store
  );

  //api call to create or update store details if store exists or not
  try {
    const [success, responseData] = !storeExists
      ? await postRequest(`/api/stores/`, updatedStore, token)
      : await putRequest(`/api/stores/${store?.id}`, updatedStore, token);

    if (!success || responseData?.error) {
      throw new Error(
        responseData?.error?.message || "An error occurred, please try again"
      );
    } else {
      //updates the store state with the response data
      const storeList = stores && Array.isArray(stores) && stores?.length > 0 ? stores : [];
      const newStores = !storeExists ? [...storeList, responseData] : responseData;
      dispatch(updateStores(newStores));

      if (!storeExists) {
        dispatch(setStoreID(newStores.length - 1));
      }

      //toast that shows whne successful
      toast.success(
        !storeExists
          ? `Store created successfully`
          : `Store details updated successfully`,
        {
          autoClose: 2000,
        }
      );
      handleRedirect();
    }
  } catch (error) {
    console.error(error.message);
    toast.error(!storeExists
      ? `Error creating new Store`
      : `Error updating Store information`, {
      autoClose: 2000,
    });
  } finally {
    setLoading(false);
  }
};

export const handleSubmitPassword = async (
  data,
  setLoading,
  token,
  passwordForm,
  setEditProfile
) => {
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
