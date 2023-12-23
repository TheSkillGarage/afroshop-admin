import React, { useContext, useState } from "react";
import DeliveryCard from "./delivery-holiday-card";
import { useForm } from "react-hook-form";
import InputComponent from "../shared/inputComponent";
import Button from "../shared/button";
import { ProfileContext } from "../../contexts/ProfileContext";
import { destinationOptions } from "../../data/profile";

const DeliveryFees = () => {
  const {
    deliveryFormCount,
    setDeliveryFormCount,
    editProfile,
    control,
    errors,
    register,
    deliveryFeeData,
    setDeliveryFeeData,
  } = useContext(ProfileContext);

  const deleteDeliveryCard = (index) => {
    setDeliveryFeeData((data) => data.filter((_, key) => key !== index));
  };

  return (
    <div>
      {editProfile && (
        <>
          {deliveryFormCount.map((_, index) => (
            <div className="flex gap-14 mt-6" key={index}>
              <InputComponent
                inputType="select"
                label="Shipping Destination"
                name={`destination-${index}`}
                fieldName={`destination[${index}]`}
                required={true}
                requiredMessage={"This field is required"}
                placeholder="Enter"
                className="bg-[#F2F2F2]"
                control={control}
                errors={errors}
                register={register}
                options={destinationOptions.map((d) => {
                  return { label: d.label, value: d.label };
                })}
              />
              <InputComponent
                inputType="number"
                type="number"
                label="Shipping Fee ($)"
                name={`fee-${index}`}
                fieldName={`fee[${index}]`}
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

          <div className="mt-6 mb-3">
            <Button
              className="w-[144px]"
              variant="tertiary"
              icon="add"
              direction="reverse"
              onClick={() => {
                setDeliveryFormCount((prevCount) => [
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
        {deliveryFeeData &&
          deliveryFeeData.map((d, index) => (
            <div key={index}>
              <DeliveryCard
                card={d}
                type="delivery"
                handleDelete={() => deleteDeliveryCard(index)}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default DeliveryFees;
