import React, { useState } from "react";
import Checkbox from "../../shared/checkbox";
import InputComponent from "../../shared/inputComponent";
import {
  daysOfTheWeek,
  deliveryOptions,
  deliverySlots,
} from "../../../data/profile";
import { DeleteIcon, GreenCamera, UserAvatar } from "../../../images";
import { handleAvatarSubmit } from "../../../utils";
import { useSelector } from "react-redux";
import { renderValidUrl } from "../../../utils/constants";

const StoreInfo = ({ editProfile, profileData, setProfileData, form }) => {
  const {
    control,
    formState: { errors },
    register,
    setValue,
    trigger,
  } = form;
  const store = useSelector((state) => state.store);
  const [imageUploaded, setImageUploaded] = useState();

  const handleFileUpload = (e) => {
    setImageUploaded(e.target.files[0]);
    if (e.target.files.length > 0) {
    //   handleData("profile_image_data", e.target.files[0]);
      handleData("profile_image", URL.createObjectURL(e.target.files[0]));
    //   return;
    }
  };

  //gets the selected open days by adding a new day to the array of days when checked or removing a day from the array when unchecked
  const getSelectedDays = (store, value) => {
    return store?.days?.includes(value)
      ? [...store?.days?.filter((p) => p !== value)] ?? []
      : [...store?.days, value];
  };

  //sets the state of the profile data on change of the input fields
  const handleData = (input, value) => {
    setProfileData((prev) => {
      switch (input) {
        case "day":
          return {
            ...prev,
            store: {
              ...prev["store"],
              days: getSelectedDays(prev?.store, value),
            },
          };
        default:
          return {
            ...prev,
            store: {
              ...prev["store"],
              [input]: value,
            },
          };
      }
    });
  };

  const handleAvatarUpload = async () => {
    if (imageUploaded) {
      const image = await handleAvatarSubmit(imageUploaded, store?.id);
      handleData("profile_image_data", image[0]?.id);
      setImageUploaded(null);
      return;
    } 
  };

  return (
    <div className="flex flex-col mt-6 gap-6">
      <div className="flex items-center gap-3 mb-3">
        <label htmlFor="profileImage">
          <div
            className={`rounded-full w-[100px] h-[100px] ${
              editProfile ? "cursor-pointer" : ""
            }`}
          >
            {profileData?.store?.profile_image?.length > 0 ? (
              <div className="relative h-full w-full">
                <img
                  className="h-full w-full object-cover rounded-full"
                  src={profileData?.store?.profile_image}
                  alt="Profile"
                />
                {editProfile && (
                  <div className="absolute bottom-[-2px] right-[-4px] w-[30px] h-[30px] rounded-full">
                    <GreenCamera />
                  </div>
                )}
              </div>
            ) : (
              <img
                className="rounded-full border-2"
                src={UserAvatar}
                alt="Profile"
              />
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

        {editProfile && profileData?.store?.profile_image.length > 0 && (
          <>
            {imageUploaded && (
            <p
              className="text-[#186F3D] cursor-pointer"
              onClick={handleAvatarUpload}
            >
              Upload
            </p>
            )}
            <p
              className="bg-[#FF3B301A] rounded p-2 cursor-pointer"
              onClick={() => {
                setImageUploaded(null);
                handleData("profile_image", renderValidUrl(store?.image));
                handleData("profile_image_data", null);
              }}
            >
              <DeleteIcon />
            </p>
          </>
        )}
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
          requiredMessage={"Store name is required"}
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
          required={true}
          patternValue={/^\w{1,64}(?:[, \t]+\w{1,64}){0,15}$/}
          patternMessage={"Ensure address is separated by commas and space"}
          requiredMessage={"Store address is required"}
          register={register}
          isReadOnly={!editProfile}
          handleChange={(e) => handleData("address", e.target.value)}
        />
        <InputComponent
          inputType="text"
          label="City"
          fieldName={"city"}
          placeholder="Enter"
          className="bg-[#F2F2F2]"
          control={control}
          errors={errors}
          register={register}
          required={true}
          requiredMessage={"City is required"}
          isReadOnly={!editProfile}
          handleChange={(e) => handleData("city", e.target.value)}
        />
        <InputComponent
          inputType="text"
          label="Province/State"
          fieldName={"state"}
          placeholder="Enter"
          className="bg-[#F2F2F2]"
          control={control}
          errors={errors}
          register={register}
          required={true}
          requiredMessage={"Province is required"}
          isReadOnly={!editProfile}
          handleChange={(e) => handleData("state", e.target.value)}
        />

        <InputComponent
          inputType="text"
          label="Postal Code"
          fieldName={"postal_code"}
          placeholder="Enter"
          className="bg-[#F2F2F2]"
          control={control}
          errors={errors}
          register={register}
          required={true}
          requiredMessage={"Postal Code is required"}
          isReadOnly={!editProfile}
          handleChange={(e) => handleData("postal_code", e.target.value)}
        />
        <InputComponent
          inputType="country"
          label="Country"
          fieldName={"country"}
          placeholder="Enter"
          className="bg-[#F2F2F2]"
          control={control}
          errors={errors}
          register={register}
          required={true}
          requiredMessage={"Country is required"}
          isReadOnly={!editProfile}
          handleChange={(e) => handleData("country", e.target.value)}
        />
        <div className="space-y-5">
          <p className="text-[13px] text-[#B3B3B3]">Open Day(s)</p>
          <div className="flex w-full justify-between">
            {daysOfTheWeek.map((day, index) => (
              <div key={index} className="flex">
                <Checkbox
                  name={day.label}
                  handleChange={() => {
                    handleData("day", day?.value);
                  }}
                  isDisabled={!editProfile}
                  value={
                    profileData?.store?.days?.includes(day?.value)
                      ? day?.value
                      : ""
                  }
                  valueOnChecked={day.value}
                >
                  {day.label}
                </Checkbox>
              </div>
            ))}
          </div>
        </div>
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
          requiredMessage={"At least one delivery option is required"}
          control={control}
          errors={errors}
          register={register}
          isDisabled={!editProfile}
          handleChange={(value) => {
            setValue("deliveryOption", value);
            trigger("deliveryOption"); // triggers the input field after a change to re-trigger validation
            handleData("deliveryOption", value);
          }}
        />

        {/* <InputComponent
          inputType="text"
          label="Email"
          fieldName={"email"}
          placeholder="Enter"
          className="bg-[#F2F2F2]"
          required={true}
          requiredMessage={"Email address is required"}
          patternValue={/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/}
          patternMessage={"Enter a valid email address"}
          control={control}
          errors={errors}
          register={register}
          isReadOnly={!editProfile}
          handleChange={(e) => handleData("email", e.target.value)}
        /> */}

        <InputComponent
          inputType="time"
          type="time"
          // options={deliveryStartTimes}
          label="Delivery Start Time"
          fieldName={"deliveryStartTime"}
          placeholder="Enter"
          requiredMessage={"Delivery Start Time is required"}
          className="bg-[#F2F2F2] cursor-pointer w-full"
          control={control}
          errors={errors}
          register={register}
          isReadOnly={!editProfile}
          handleChange={(e) => {
            handleData("deliveryStartTime", e.target.value);
          }}
        />
        <InputComponent
          inputType="time"
          type="time"
          // options={deliveryEndTimes}
          label="Delivery End Time"
          fieldName={"deliveryEndTime"}
          placeholder="Enter"
          requiredMessage={"Delivery End Time is required"}
          className="bg-[#F2F2F2] cursor-pointer"
          control={control}
          errors={errors}
          register={register}
          isReadOnly={!editProfile}
          handleChange={(e) => handleData("deliveryEndTime", e.target.value)}
        />
        <InputComponent
          inputType="select"
          options={deliverySlots}
          label="Delivery Slots"
          fieldName={"deliverySlot"}
          placeholder="Enter"
          requiredMessage={"Delivery Slot is required"}
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
          requiredMessage={"Rest Period is required"}
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
