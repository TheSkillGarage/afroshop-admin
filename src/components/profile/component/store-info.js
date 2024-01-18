import React, { useCallback, useContext, useEffect, useState } from "react";
import Checkbox from "../../shared/checkbox";
import { useForm } from "react-hook-form";
import InputComponent from "../../shared/inputComponent";
import {
  daysOfTheWeek,
  deliveryEndTimes,
  deliveryOptions,
  deliverySlots,
  deliveryStartTimes,
} from "../../../data/profile";
import { DeleteIcon, ProfileImage } from "../../../images";
import useTableSelect from "../../../hooks/useTableSelect";

const StoreInfo = ({ editProfile, profileData, setProfileData }) => {
  const {
    control,
    formState: errors,
    register,
  } = useForm({
    defaultValues: profileData?.store,
    mode: "all",
  });
  const { handleSelectRow, selectedRows } = useTableSelect({
    rows: daysOfTheWeek,
  });

  const handleFileUpload = useCallback((e) => {
    if (e.target.files.length > 0) {
      handleData("profile_image", e.target.files[0]);
    } else {
      return;
    }
  }, []);

  const handleData = (input, value) => {
    setProfileData((prev) => {
      switch (input) {
        case "profile_image":
          return {
            ...prev,
            store: {
              ...prev["store"],
              profile_image: value,
            },
          };
        case "email":
          return {
            ...prev,
            store: {
              ...prev["store"],
              email: value,
            },
          };
        case "day":
          console.log(value)
          return {
            ...prev,
            store: {
              ...prev?.store,
              days: prev?.store?.days?.includes(value)
                ? prev?.store?.days?.filter((p) => p !== value) ?? []
                : [...prev?.store?.days, value],
            },
          };
        case "store_name":
          return {
            ...prev,
            store: {
              ...prev["store"],
              store_name: value,
            },
          };
        case "address":
          return {
            ...prev,
            store: {
              ...prev["store"],
              address: value,
            },
          };
        case "deliveryOption":
          return {
            ...prev,
            store: {
              ...prev["store"],
              deliveryOption: value,
            },
          };
        case "deliveryStartTime":
          return {
            ...prev,
            store: {
              ...prev["store"],
              deliveryStartTime: value,
            },
          };
        case "deliveryEndTime":
          return {
            ...prev,
            store: {
              ...prev["store"],
              deliveryEndTime: value,
            },
          };
        case "deliverySlot":
          return {
            ...prev,
            store: {
              ...prev["store"],
              deliverySlot: value,
            },
          };
        case "restPeriod":
          return {
            ...prev,
            store: {
              ...prev["store"],
              restPeriod: value,
            },
          };
        default:
          return {
            ...prev,
            [input]: value,
          };
      }
    });
  };
  console.log(profileData);

  return (
    <div className="flex flex-col mt-6 gap-6">
      {/* {editProfile ? ( */}
      <div className="flex items-center gap-3">
        <div className="rounded-full w-[100px] h-[100px] mb-3">
          <label htmlFor="profileImage">
            <div className="w-fit rounded-full">
              {profileData?.store?.profile_image?.type?.startsWith("image/") ? (
                <img
                  className="w-[100px] h-[100px] rounded-full"
                  src={URL.createObjectURL(profileData?.store?.profile_image)}
                  alt="Profile Image"
                />
              ) : (
                <ProfileImage />
              )}
            </div>

            {editProfile && (
              <input
                id="profileImage"
                name="profileImage"
                type="file"
                accept="image/*"
                className="w-fit hidden"
                onChange={handleFileUpload}
              />
            )}
          </label>
        </div>
        {editProfile && profileData?.store?.profile_image && (
          <p
            className="bg-[#FF3B301A] rounded p-2 cursor-pointer"
            onClick={() => handleData("profile_image", {})}
          >
            <DeleteIcon />
          </p>
        )}
      </div>
      {/* ) : profileData?.store?.profile_image?.type?.startsWith("image/") ? (
        <img
          className="w-[100px] h-[100px] rounded-full"
          src={URL.createObjectURL(profileData?.store?.profile_image)}
          alt="Profile Image"
        />
      ) : (
        <ProfileImage />
      )} */}
      <p className="text-[13px] text-[#B3B3B3]">Open Day(s)</p>
      <div className="flex w-full justify-between">
        {daysOfTheWeek.map((day, index) => (
          <div key={index} className="flex">
            <Checkbox
              name={day.label}
              handleChange={() => {
                handleData("day", day.value);
                handleSelectRow(day.value);
              }}
              isDisabled={!editProfile}
              value={
                profileData?.store?.days?.includes(day.value) ? day.value : ""
              }
              valueOnChecked={day.value}
            >
              {day.label}
            </Checkbox>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-8 my-4">
        <InputComponent
          inputType="text"
          label="Store Name"
          fieldName={"store_name"}
          placeholder="Enter"
          className="bg-[#F2F2F2]"
          control={control}
          errors={errors}
          register={register}
          required={true}
          requireddMessage={"Store name is required"}
          isReadOnly={!editProfile}
          handleChange={(e) => handleData("store_name", e.target.value)}
        />
        <InputComponent
          inputType="text"
          label="Address"
          fieldName={"address"}
          placeholder="Enter"
          className="bg-[#F2F2F2]"
          control={control}
          errors={errors}
          register={register}
          isReadOnly={!editProfile}
          handleChange={(e) => handleData("address", e.target.value)}
        />
        <InputComponent
          inputType="text"
          label="Email"
          fieldName={"email"}
          placeholder="Enter"
          className="bg-[#F2F2F2]"
          control={control}
          errors={errors}
          register={register}
          isReadOnly={!editProfile}
          handleChange={(e) => handleData("email", e.target.value)}
        />
        <InputComponent
          inputType="select"
          multiple={true}
          options={deliveryOptions}
          label="Delivery Option(s)"
          fieldName={"deliveryOption"}
          name={"deliveryOption"}
          placeholder="Enter"
          className="bg-[#F2F2F2]"
          closeMenuOnSelect={false}
          control={control}
          errors={errors}
          register={register}
          isDisabled={!editProfile}
          handleChange={(value) => handleData("deliveryOption", value)}
        />
        <InputComponent
          inputType="select"
          options={deliveryStartTimes}
          label="Delivery Start Time"
          fieldName={"deliveryStartTime"}
          placeholder="Enter"
          className="bg-[#F2F2F2]"
          control={control}
          errors={errors}
          register={register}
          isDisabled={!editProfile}
          handleChange={(value) => handleData("deliveryStartTime", value)}
        />
        <InputComponent
          inputType="select"
          options={deliveryEndTimes}
          label="Delivery End Time"
          fieldName={"deliveryEndTime"}
          placeholder="Enter"
          className="bg-[#F2F2F2]"
          control={control}
          errors={errors}
          register={register}
          isDisabled={!editProfile}
          handleChange={(value) => handleData("deliveryEndTime", value)}
        />
        <InputComponent
          inputType="select"
          options={deliverySlots}
          label="Delivery Slots"
          fieldName={"deliverySlot"}
          placeholder="Enter"
          className="bg-[#F2F2F2]"
          control={control}
          errors={errors}
          register={register}
          isDisabled={!editProfile}
          handleChange={(value) => handleData("deliverySlot", value)}
        />
        <InputComponent
          inputType="select"
          options={deliverySlots}
          label="Rest Period"
          fieldName={"restPeriod"}
          placeholder="Enter"
          className="bg-[#F2F2F2]"
          control={control}
          errors={errors}
          register={register}
          isDisabled={!editProfile}
          handleChange={(value) => handleData("restPeriod", value)}
        />
      </div>
    </div>
  );
};

export default StoreInfo;
