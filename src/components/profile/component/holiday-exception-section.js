import React from "react";
import DeliveryCard from "./delivery-holiday-card";
import InputComponent from "../../shared/inputComponent";
import Button from "../../shared/button";
import { DateIcon } from "../../../images";
import { useForm } from "react-hook-form";
import { format } from "date-fns";

const HolidayException = ({
  editProfile,
  profileData,
  setProfileData,
  form
}) => {
  const { control, formState: errors, register, resetField } = form;

  const handleAddCard = (values) => {
    try {
      if (values?.description !== "" && values?.date !== "") {
        const holidayFormData = {
          label: values?.description,
          value: format(values?.date, "EEE, MMM dd, yyyy"),
        };

        setProfileData((prev) => {
           //checks if the value exists in the current array of holiday objects and overrides it if true
          const updatedArray = prev?.holidays?.map((d) =>
            d.label === holidayFormData.label
              ? { ...d, ...holidayFormData }
              : d
          );

          //adds a new holiday object to the array if it doesn't exist
          if (!updatedArray.some((obj) => obj.label === holidayFormData.label)) {
            updatedArray.push(holidayFormData);
          }

          return {
            ...prev,
            holidays: updatedArray,
          };
        });
      }
      //resets the fields
      resetField("description");
      resetField("date");
    } catch (error) {}
  };

  const deleteHolidayCard = (index) => {
    //filters out an holiday object by index to be deleted
    const remainingData =  profileData?.holidays?.filter((_, key) => key !== index);
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
                handleAddCard();
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
