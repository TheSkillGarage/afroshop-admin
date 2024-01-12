import React, { useContext, useState } from "react";
import DeliveryCard from "./delivery-holiday-card";
import { useForm } from "react-hook-form";
import InputComponent from "../shared/inputComponent";
import Button from "../shared/button";
import { destinationOptions } from "../../data/profile";
import { LocationIcon } from "../../images";
import { useDispatch } from "react-redux";
import { addDeliveryData } from "../../redux/action";

const DeliveryFees = ({
  editProfile,
  deliveryFeeData,
  setDeliveryFeeData,
  enableSave,
}) => {
  const [tempData, setTempData] = useState(deliveryFeeData);
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

  const handleAddCard = (values) => {
    try {
      if (values?.destination !== "" && values?.fee !== "") {
        const deliveryFormData = {
          label: values.destination,
          value: values.fee,
        };
        setTempData((prevData) => [...prevData, deliveryFormData]);
        enableSave(() => {
          dispatch(
            addDeliveryData({ delivery: [...tempData, deliveryFormData] })
          );
        });
      }
      reset();
    } catch (error) {}
  };

  const deleteDeliveryCard = (index) => {
    setTempData((data) => data.filter((_, key) => key !== index));
    enableSave(() => {
      setDeliveryFeeData((data) => data.filter((_, key) => key !== index));
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
        {deliveryFeeData &&
          tempData.map((d, index) => (
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
