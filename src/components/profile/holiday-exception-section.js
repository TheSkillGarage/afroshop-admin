import React, { useContext, useState } from "react";
import DeliveryCard from "./delivery-holiday-card";
import InputComponent from "../shared/inputComponent";
import Button from "../shared/button";
import { ProfileContext } from "../../contexts/ProfileContext";
import { holidayOptions } from "../../data/profile";
import { DateIcon } from "../../images";

const HolidayException = () => {
  const {
    holidayFormCount,
    setHolidayFormCount,
    editProfile,
    holidayData,
    setHolidayData,
    control,
    errors,
    register,
  } = useContext(ProfileContext);

  const deleteHolidayCard = (index) => {
    setHolidayData((data) => data.filter((_, key) => key !== index));
  };

  return (
    <div>
      {editProfile && (
        <>
          {holidayFormCount.map((_, index) => (
            <div key={index} className="flex gap-14 mt-6">
              <InputComponent
                inputType="date"
                type="date"
                label="Date"
                max={new Date()}
                fieldName={`date[${index}]`}
                placeholder="Select"
                name={`date[${index}]`}
                required={true}
                requiredMessage={"This field is required"}
                className="bg-[#F2F2F2] text-blue"
                control={control}
                errors={errors}
                register={register}
              />
              <InputComponent
                inputType="text"
                label="Description"
                fieldName={`description[${index}]`}
                name={`description[${index}]`}
                required={true}
                requiredMessage={"This field is required"}
                placeholder="Enter"
                className="bg-[#F2F2F2]"
                control={control}
                errors={errors}
                register={register}
              />
            </div>
          ))}
          <div className="mt-6 mb-8">
            <Button
              className="w-[144px]"
              variant="tertiary"
              icon="add"
              direction="reverse"
              onClick={() => {
                setHolidayFormCount((prevCount) => [
                  ...prevCount,
                  { date: "", description: "" },
                ]);
              }}
            >
              Add
            </Button>
          </div>
        </>
      )}
      <div className="py-4 grid grid-cols-3 gap-4">
        {holidayData &&
          holidayData.map((d, index) => (
            <div key={index}>
              <DeliveryCard
                card={d}
                icon={<DateIcon />}
                handleDelete={() => deleteHolidayCard(index)}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default HolidayException;
