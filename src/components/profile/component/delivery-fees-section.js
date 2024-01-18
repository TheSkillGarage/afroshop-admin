import React, { useContext, useState } from "react";
import DeliveryCard from "./delivery-holiday-card";
import { useForm } from "react-hook-form";
import InputComponent from "../../shared/inputComponent";
import Button from "../../shared/button";
import { destinationOptions } from "../../../data/profile";
import { LocationIcon } from "../../../images";
import { useDispatch } from "react-redux";

const DeliveryFees = ({
  editProfile,
  profileData,
  setProfileData,
}) => {
  const dispatch = useDispatch();
  const {
    control,
    formState: errors,
    register,
    handleSubmit,
    reset,
  } = useForm({
    mode: "all",
    defaultValues: {
      destination: "",
      fee: "",
    },
  });
  console.log(profileData);

  const handleAddCard = (values) => {
    try {
      if (values?.destination !== "" && values?.fee !== "") {
        const deliveryFormData = {
          label: values.destination,
          value: values.fee,
        };
        setProfileData((prev) => {
          return {
            ...prev,
            delivery: [...prev["delivery"], deliveryFormData],
          };
        });
      }
      reset();
    } catch (error) {}
  };

  const deleteDeliveryCard = (index) => {
    const remainingData = profileData?.delivery?.filter((_, key) => key != index);
    setProfileData((prev) => {
      return {
        ...prev,
        delivery: remainingData
      }
    });
  };

  return (
    <div>
      {editProfile && (
        <>
          <div className="flex gap-14 mt-6">
            <InputComponent
              inputType="select"
              label="Shipping Destination"
              name="destination"
              fieldName={`destination`}
              required={true}
              requiredMessage={"This field is required"}
              placeholder="Select"
              className="bg-[#F2F2F2]"
              control={control}
              errors={errors}
              register={register}
              options={destinationOptions.map((d) => {
                return { value: d.label, label: d.label };
              })}
            />
            <InputComponent
              inputType="text"
              type="text"
              label="Shipping Fee ($)"
              name="fee"
              fieldName="fee"
              required={true}
              requiredMessage={"This field is required"}
              placeholder="Enter"
              className="bg-[#F2F2F2]"
              control={control}
              errors={errors}
              register={register}
            />
          </div>

          <div className="mt-6 mb-3">
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
          profileData.delivery.map((d, index) => (
            <div key={index}>
              <DeliveryCard
                card={d}
                type="delivery"
                handleDelete={() => deleteDeliveryCard(index)}
                icon={<LocationIcon />}
                editProfile={editProfile}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default DeliveryFees;
