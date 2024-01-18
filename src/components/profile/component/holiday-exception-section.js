import React, { useContext, useState } from "react";
import DeliveryCard from "./delivery-holiday-card";
import InputComponent from "../../shared/inputComponent";
import Button from "../../shared/button";
import { useDispatch } from "react-redux";
import { DateIcon } from "../../../images";
import { useForm } from "react-hook-form";
import { format } from "date-fns";

const HolidayException = ({
  editProfile,
  profileData,
  setProfileData
}) => {
  const dispatch = useDispatch();
  const {
    control,
    formState: errors,
    register,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: { description: "", date: "" },
    mode: "all",
  });

  const handleAddCard = (values) => {
    try {
      if (values?.description !== "" && values?.date !== "") {
        const holidayFormData = {
          label: values?.description,
          value: format(values?.date, "EEE, MMM dd, yyyy"),
        };
        setProfileData((prev) => {
          return {
            ...prev,
            holidays: [...prev["holidays"], holidayFormData],
          };
        });
      }
      reset();
    } catch (error) {}
  };

  const deleteHolidayCard = (index) => {
    const remainingData =  profileData?.holidays?.filter((_, key) => key != index);
    setProfileData((prev) => {
      return {
        ...prev,
        holidays: remainingData
      }
    });
  };

  return (
    <div>
      {editProfile && (
        <>
          <div className="flex gap-14 mt-6">
            <InputComponent
              inputType="date"
              type="date"
              label="Date"
              max={new Date()}
              fieldName="date"
              placeholder="Select"
              name={`date`}
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
              fieldName="description"
              name={`description`}
              required={true}
              requiredMessage={"This field is required"}
              placeholder="Enter"
              className="bg-[#F2F2F2]"
              control={control}
              errors={errors}
              register={register}
            />
          </div>

          <div className="mt-6 mb-8">
            <Button
              className="w-[144px]"
              variant="tertiary"
              icon="add"
              direction="reverse"
              type="submit"
              onClick={(event) => {
                event.preventDefault();
                handleSubmit(handleAddCard)();
              }}
            >
              Add
            </Button>
          </div>
        </>
      )}
      <div className="py-4 grid grid-cols-3 gap-4">
        {profileData &&
          profileData?.holidays?.map((d, index) => (
            <div key={index}>
              <DeliveryCard
                card={d}
                icon={<DateIcon />}
                handleDelete={() => deleteHolidayCard(index)}
                editProfile={editProfile}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default HolidayException;
