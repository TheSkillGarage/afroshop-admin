import React, { useState } from "react";
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
import { EditIcon, ProfileImage } from "../../images";
import useTableSelect from "../../hooks/useTableSelect";

const StoreInfo = () => {
  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
    getValues,
  } = useForm({ defaultValues: { email: "", role: "" }, mode: "all" });
  const { handleSelectRow, selectedRows } = useTableSelect({
    rows: daysOfTheWeek,
  });
  return (
    <div className="flex flex-col gap-6">
      <div className="mt-8 mb-3">
        <ProfileImage />
      </div>

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
