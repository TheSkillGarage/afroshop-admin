import React, { useState } from "react";
import DeliveryCard from "./delivery-holiday-card";
import { useForm } from "react-hook-form";
import InputComponent from "../shared/inputComponent";
import Button from "../shared/button";

const DeliveryFees = () => {
  const [formCount, setFormCount] = useState([{}]);
  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
    getValues,
  } = useForm({ mode: "all" });

  const data = [
    {
      label: "Within 5 km",
      value: false,
      price: "$15",
    },
    {
      label: "Between 5 to 10 km",
      value: false,
      price: "$20",
    },
    {
      label: "Between 10 to 15 km",
      value: false,
      price: "$25",
    },
    {
      label: "Between 15 to 20 km",
      value: false,
      price: "$30",
    },
    {
      label: "Over 20 km",
      value: false,
      price: "$35",
    },
  ];

  return (
    <div>
      <form className="mspace-y-4">
        {formCount.map((f, index) => (
          <div className="flex gap-14 mt-6">
            <InputComponent
              inputType="select"
              label="Shipping Destination"
              name={`destination-${index}`}
              fieldName={`destination-${index}`}
              placeholder="Enter"
              className="bg-[#F2F2F2]"
              control={control}
              errors={errors}
              register={register}
              options={data.map((d) => {
                return { label: d.label, value: d.value };
              })}
            />
            <InputComponent
              inputType="text"
              label="Shipping Fee ($)"
              name={`fee-${index}`}
              fieldName={`fee-${index}`}
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
              setFormCount((prevCount) => [
                ...prevCount,
                { date: "", description: "" },
              ]);
            }}
          >
            Add
          </Button>
        </div>
      </form>
      <div className="py-4 grid grid-cols-3 gap-4">
        {data.map((d) => (
          <DeliveryCard label={d.title} subtitle={d.price} />
        ))}
      </div>{" "}
    </div>
  );
};

export default DeliveryFees;
