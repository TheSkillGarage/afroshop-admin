import React, { useCallback, useContext, useState } from "react";
import Checkbox from "../shared/checkbox";
import { useForm } from "react-hook-form";
import InputComponent from "../shared/inputComponent";
import {
  daysOfTheWeek,
  deliveryEndTimes,
  deliveryOptions,
  deliverySlots,
  deliveryStartTimes,
} from "../../data/profile";
import { DeleteIcon, EditIcon, ProfileImage } from "../../images";
import useTableSelect from "../../hooks/useTableSelect";
import { ProfileContext } from "../../contexts/ProfileContext";

const StoreInfo = () => {
  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
    getValues,
  } = useForm({ defaultValues: { email: "", role: "" }, mode: "all" });
  const [file, setFile] = useState(null);
  const { editProfile } = useContext(ProfileContext);
  const { handleSelectRow, selectedRows } = useTableSelect({
    rows: daysOfTheWeek,
  });

  const handleFileUpload = useCallback((e) => {
    console.log(e.target.files);
    if (e.target.files.length > 0) {
      setFile(URL.createObjectURL(e.target.files[0]));
    } else {
      return;
    }
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {editProfile ? (
        <div className="flex items-center gap-3">
          <div className="rounded-full w-[100px] h-[100px] mt-8 mb-3">
            <label htmlFor="profileImage">
              <div className="w-fit rounded-full">
                {file ? (
                  <img
                    className="w-[100px] h-[100px] rounded-full"
                    src={file ? file : ProfileImage}
                  />
                ) : (
                  <ProfileImage />
                )}
              </div>

              <input
                id="profileImage"
                name="profileImage"
                type="file"
                accept="image/*"
                className="w-fit hidden"
                onChange={handleFileUpload}
              />
            </label>
          </div>
          {file && (
            <p
              className="bg-[#FF3B301A] rounded p-2 cursor-pointer"
              onClick={() => setFile(null)}
            >
              <DeleteIcon />
            </p>
          )}
        </div>
      ) : (
        <ProfileImage />
      )}
      <p className="text-[13px] text-[#B3B3B3]">Open Day(s)</p>
      <div className="flex w-full justify-between">
        {daysOfTheWeek.map((day, index) => (
          <div key={index} className="flex">
            <Checkbox
              name={day.label}
              handleChange={() => {
                handleSelectRow(day.value);
              }}
              value={selectedRows.includes(day.value) ? day.value : ""}
              valueOnChecked={day.value}
            />{" "}
            {day.label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-8 my-4">
        <InputComponent
          inputType="text"
          label="Store Name"
          fieldName={"name"}
          placeholder="Enter"
          className="bg-[#F2F2F2]"
          control={control}
          errors={errors}
          register={register}
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
        />
        <InputComponent
          inputType="select"
          multiple={true}
          options={deliveryOptions}
          label="Delivery Option(s)"
          fieldName={"delivery-option"}
          placeholder="Enter"
          className="bg-[#F2F2F2]"
          control={control}
          errors={errors}
          register={register}
        />
        <InputComponent
          inputType="select"
          // leftIcon={EditIcon}
          options={deliveryStartTimes}
          label="Delivery Start Time"
          fieldName={"delivery-start-time"}
          placeholder="Enter"
          className="bg-[#F2F2F2]"
          control={control}
          errors={errors}
          register={register}
        />
        <InputComponent
          inputType="select"
          options={deliveryEndTimes}
          label="Delivery End Time"
          fieldName={"delivery-end-time"}
          placeholder="Enter"
          className="bg-[#F2F2F2]"
          control={control}
          errors={errors}
          register={register}
        />
        <InputComponent
          inputType="select"
          options={deliverySlots}
          label="Delivery Slots"
          fieldName={"delivery-slot"}
          placeholder="Enter"
          className="bg-[#F2F2F2]"
          control={control}
          errors={errors}
          register={register}
        />
        <InputComponent
          inputType="select"
          options={deliverySlots}
          label="Rest Period"
          fieldName={"rest-period"}
          placeholder="Enter"
          className="bg-[#F2F2F2]"
          control={control}
          errors={errors}
          register={register}
        />
      </div>
    </div>
  );
};

export default StoreInfo;
