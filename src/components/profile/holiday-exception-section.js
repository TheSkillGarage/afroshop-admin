import React, { useState } from "react";
import DeliveryCard from "./delivery-holiday-card";
import InputComponent from "../shared/inputComponent";
import Button from "../shared/button";
import { useForm } from "react-hook-form";

const HolidayException = () => {
  const [formCount, setFormCount] = useState([{}]);
  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
    getValues,
  } = useForm({ mode: "all" });

  const onSubmit = (event) => {
    event.preventDefault();
    const values = getValues();
    console.log(values);
  };

  const data = [
    {
      label: "New Year",
      value: false,
      day: "Sun, Jan 1, 2023",
    },
    {
      label: "Good Friday",
      value: false,
      day: "Fri, Apr 7, 2023",
    },
    {
      label: "Easter Monday",
      value: false,
      day: "Mon, Apr 10, 2023",
    },
    {
      label: "Victoria Day",
      value: false,
      day: "Mon, May 22, 2023",
    },
    {
      label: "Jean-Baptiste Day",
      value: false,
      day: "Sat, Jun 24, 2023",
    },
    {
      label: "Canada Day",
      value: false,
      day: "Sat, July 1, 2023",
    },
  ];
  return (
    <div>
      <form
        className="space-y-4"
        onSubmit={(event) => {
          handleSubmit(onSubmit(event));
        }}
      >
        {formCount.map((f, index) => (
          <div key={index} className="flex gap-14 mt-6">
            <InputComponent
              inputType="select"
              label="Date"
              fieldName={`date-${index}`}
              placeholder="Select"
              name={`date-${index}`}
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
              label="Description"
              fieldName={`desc-${index}`}
              name={`desc-${index}`}
              placeholder="Enter"
              className="bg-[#F2F2F2]"
              control={control}
              errors={errors}
              register={register}
            />
          </div>
        ))}
        <Button type="submit">Submit</Button>
        <div className=" mb-4">
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
        {data.map((d, index) => (
          <div key={index}>
            <DeliveryCard title={d.label} subtitle={d.day} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HolidayException;
