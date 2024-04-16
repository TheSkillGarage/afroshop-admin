import React from "react";
import DeliveryCard from "./delivery-holiday-card";
import InputComponent from "../../shared/inputComponent";
import Button from "../../shared/button";
import { DateIcon } from "../../../images";
import { format } from "date-fns";
import { useSelector } from "react-redux";

const HolidayException = ({
  editProfile,
  profileData,
  setProfileData,
  form,
}) => {
  const { control, formState: errors, register, resetField, watch } = form;
  const storeExists = useSelector((state) => state.storeExists);
  const description = watch("description");
  const date = watch("date");

  const handleAddCard = () => {
    try {
      if (description !== "" && date !== "") {
        const holidayFormData = {
          description: description,
          date: format(date, "yyyy-ee-dd"),
        };

        setProfileData((prev) => {
          //checks if the value exists in the current array of holiday objects and overrides it if true
          const updatedArray = prev?.holidays?.map((d) =>
            d.description?.toLowerCase() ===
            holidayFormData.description?.toLowerCase()
              ? { ...d, ...holidayFormData }
              : d
          );

          //adds a new holiday object to the array if it doesn't exist
          if (
            !updatedArray?.some(
              (obj) => obj.description === holidayFormData.description
            )
          ) {
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
    const remainingData = profileData?.holidays?.filter(
      (_, key) => key !== index
    );
    setProfileData((prev) => {
      return {
        ...prev,
        holidays: remainingData,
      };
    });
  };

  return (
    <div>
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
            // required={true}
            // requiredMessage={"This field is required"}
            isReadOnly={!storeExists ? false : !editProfile}
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
            // required={true}
            // requiredMessage={"This field is required"}
            placeholder="Enter"
            className="bg-[#F2F2F2]"
            isReadOnly={!storeExists ? false : !editProfile}
            control={control}
            errors={errors}
            register={register}
          />
        </div>

        <div className="mt-6 mb-8">
          <Button
            className="w-[144px]"
            variant={!(description && date) ? "disabled" : "tertiary"}
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

      <div className="py-4 grid grid-cols-3 gap-4">
        {profileData &&
          profileData?.holidays?.map((d, index) => (
            <div key={index}>
              <DeliveryCard
                card={{
                  label: d?.description,
                  value: d?.date,
                }}
                type="holiday"
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
