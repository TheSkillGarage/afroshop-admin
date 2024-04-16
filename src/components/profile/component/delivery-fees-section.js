import React, { useState } from "react";
import DeliveryCard from "./delivery-holiday-card";
import InputComponent from "../../shared/inputComponent";
import Button from "../../shared/button";
import { destinationOptions } from "../../../data/profile";
import { LocationIcon } from "../../../images";
import RadioButton from "../../shared/radioBtn";
import { useSelector } from "react-redux";

const DeliveryFees = ({ editProfile, profileData, setProfileData, form }) => {
  const store = useSelector((state) => state.store);
  const storeExists = useSelector((state) => state.storeExists);
  const [deliveryType, setDeliveryType] = useState(
    profileData?.delivery?.deliveryType
  );
  const {
    control,
    formState: errors,
    register,
    resetField,
    watch,
    trigger,
    setValue,
  } = form;

  const handleAddCard = () => {
    const destination = watch("destination");
    const fee = watch("fee");

    try {
      if (destination !== "" && fee !== "") {
        const deliveryFormData = {
          label: destination,
          value: fee,
        };

        setProfileData((prev) => {
          //checks if the value exists in the current array of deliverys objects and overrides it if true
          const updatedArray =
            prev?.delivery?.delivery?.map((d) =>
              d.label === deliveryFormData.label
                ? { ...d, ...deliveryFormData }
                : d
            ) ?? [];

          //adds a new delivery object to the array if it doesn't exist
          if (
            !updatedArray?.some((obj) => obj.label === deliveryFormData.label)
          ) {
            updatedArray.push(deliveryFormData);
          }

          return {
            ...prev,
            delivery: { ...prev["delivery"], delivery: updatedArray },
          };
        });
      }
      //resets the fields after adding the object
      resetField("destination");
      resetField("fee");
    } catch (error) {}
  };

  //sets the state of the profile data on change of the input fields
  const handleData = (input, value) => {
    setProfileData((prev) => {
      return {
        ...prev,
        delivery: {
          ...prev["delivery"],
          [input]: value,
        },
      };
    });
  };

  const deleteDeliveryCard = (index) => {
    //filters a delivery object by index and sets its new state
    const remainingData = profileData?.delivery?.delivery?.filter(
      (_, key) => key !== index
    );
    setProfileData((prev) => {
      return {
        ...prev,
        delivery: { ...prev["delivery"], delivery: remainingData },
      };
    });
  };

  const resetBaseDistanceForm = () => {
    resetField("unit");
    resetField("base_distance");
    resetField("base_amount");
    resetField("additional_distance_fee");
  };

  return (
    <div>
      <div className="flex mt-4 gap-5">
        <div className="flex gap-2">
          <RadioButton
            name="base"
            id="base"
            checked={deliveryType === 0}
            disabled={!storeExists ? false : !editProfile}
            handleChange={() => {
              setProfileData((prev) => {
                return {
                  ...prev,
                  delivery: {
                    ...prev["delivery"],
                    deliveryType: 0,
                  },
                };
              });
              setDeliveryType(0);
            }}
          />
          <label>Base + Per Unit Distance</label>
        </div>
        <div className="flex gap-2">
          <RadioButton
            name="base"
            id="base"
            checked={deliveryType === 1}
            disabled={!storeExists ? false : !editProfile}
            handleChange={() => {
              setProfileData((prev) => {
                return {
                  ...prev,
                  delivery: {
                    ...prev["delivery"],
                    deliveryType: 1,
                  },
                };
              });
              resetBaseDistanceForm();
              setDeliveryType(1);
            }}
          />
          <label>Tiered Distance Fees</label>
        </div>
      </div>

      <>
        {deliveryType === 1 && (
          <>
            <div className="flex gap-14 mt-6">
              <InputComponent
                inputType="select"
                label="Shipping Destination"
                name="destination"
                fieldName={`destination`}
                placeholder="Select"
                // required={true}
                // requiredMessage={"This field is required"}
                className="bg-[#F2F2F2]"
                control={control}
                errors={errors}
                register={register}
                isDisabled={!storeExists ? false : !editProfile}
                options={destinationOptions.map((d) => {
                  return { value: d.label, label: d.label };
                })}
              />
              <InputComponent
                inputType="number"
                type="number"
                label="Shipping Fee ($)"
                name="fee"
                // required={true}
                // requiredMessage={"This field is required"}
                fieldName="fee"
                placeholder="Enter"
                className="bg-[#F2F2F2]"
                control={control}
                errors={errors}
                isReadOnly={!storeExists ? false : !editProfile}
                register={register}
              />
            </div>

            <div className="mt-6 mb-3">
              <Button
                className="w-[144px]"
                variant={
                  !(watch("destination") && watch("fee"))
                    ? "disabled"
                    : "tertiary"
                }
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

            <div className="py-4 grid grid-cols-3 gap-4">
              {profileData.delivery &&
                profileData?.delivery?.delivery?.map(
                  (d, index) =>
                    d?.value && (
                      <div key={index}>
                        <DeliveryCard
                          card={d}
                          type="delivery"
                          handleDelete={() => deleteDeliveryCard(index)}
                          icon={<LocationIcon />}
                          editProfile={editProfile}
                        />
                      </div>
                    )
                )}
            </div>
          </>
        )}

        {deliveryType === 0 && (
          <div className="my-8 grid grid-cols-2 gap-3">
            <InputComponent
              inputType="select"
              options={[
                { label: "km", value: "km" },
                { label: "miles", value: "miles" },
              ]}
              label="Unit of Measurement"
              fieldName={"unit"}
              name={"unit"}
              placeholder="Enter"
              className="bg-[#F2F2F2]"
              requiredMessage={"Select"}
              control={control}
              errors={errors}
              register={register}
              isDisabled={!storeExists ? false : !editProfile}
              handleChange={(data) => {
                setValue("unit", data?.value);
                trigger("unit"); // triggers the input field after a change to re-trigger validation
                handleData("unit", data?.value);
              }}
            />

            <InputComponent
              inputType="number"
              type="number"
              label="Base Distance (km)"
              fieldName={"base_distance"}
              name={"base_distance"}
              placeholder="Enter"
              className="bg-[#F2F2F2]"
              control={control}
              errors={errors}
              register={register}
              required={true}
              requiredMessage={"Base Distance is required"}
              isReadOnly={!storeExists ? false : !editProfile}
              handleChange={(e) => handleData("base_distance", e.target.value)}
            />
            <InputComponent
              inputType="number"
              type="number"
              label="Base Amount ($)"
              fieldName={"base_amount"}
              name={"base_amount"}
              placeholder="Enter"
              className="bg-[#F2F2F2]"
              control={control}
              errors={errors}
              register={register}
              required={true}
              requiredMessage={"Base Amount is required"}
              isReadOnly={!storeExists ? false : !editProfile}
              handleChange={(e) => handleData("base_amount", e.target.value)}
            />
            <InputComponent
              inputType="number"
              type="number"
              label="Additional Distance Fee per km ($)"
              fieldName={"additional_distance_fee"}
              name={"additional_distance_fee"}
              placeholder="Enter"
              className="bg-[#F2F2F2]"
              control={control}
              errors={errors}
              register={register}
              required={true}
              requiredMessage={"Additional Distance Fee is required"}
              isReadOnly={!storeExists ? false : !editProfile}
              handleChange={(e) =>
                handleData("additional_distance_fee", e.target.value)
              }
            />
          </div>
        )}
      </>
    </div>
  );
};

export default DeliveryFees;
