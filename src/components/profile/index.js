import React, { useState } from "react";
import { EditIcon2 } from "../../images";
import StoreInfo from "./store-info";
import RoleActionCard from "../roles-and-permissions/role-action-card";
import DeliveryFees from "./delivery-fees-section";
import HolidayException from "./holiday-exception-section";
import Button from "../shared/button";
import { useForm } from "react-hook-form";
import { ProfileContext } from "../../contexts/ProfileContext";
import { format } from "date-fns";
import { deliveryData, holidayMockData } from "../../data/profile";

const Profile = () => {
  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
    getValues,
    values,
    reset,
  } = useForm({
    defaultValues: {
      destination: [],
      fee: [],
      description: [],
      date: [],
    },
    mode: "all",
  });
  const [editProfile, setEditProfile] = useState(false);
  const [deliveryFormCount, setDeliveryFormCount] = useState([{}]);
  const [holidayFormCount, setHolidayFormCount] = useState([{}]);
  const [deliveryFeeData, setDeliveryFeeData] = useState(deliveryData);
  const [holidayData, setHolidayData] = useState(holidayMockData);

  const handleFormSubmit = (data) => {
    const values = getValues();
    console.log(values);

    if (values.destination.length !== 0 && values.fee.length !== 0) {
      const deliveryFormData = values.destination.map((d, index) => {
        return { label: d, value: `$${values.fee[index]}` };
      });
      setDeliveryFeeData((prevData) => [...prevData, ...deliveryFormData]);
      console.log(deliveryFormData);
    }

    if (values.description.length !== 0 && values.date.length !== 0) {
      const holidayFormData =
        values.description.length !== 0 &&
        values.description.map((d, index) => {
          return {
            label: d,
            value: format(values.date[index], "EEE, MMM dd, yyyy"),
          };
        });
      setHolidayData((prevData) => [...prevData, ...holidayFormData]);
      console.log(holidayFormData);
    }
    // setEditProfile(false);
    setDeliveryFormCount([{}]);
    setHolidayFormCount([{}]);
    reset();
  };

  const [sections, setSections] = useState([
    {
      label: "Store Info",
      value: false,
      component: "A",
    },
    {
      label: "Delivery Fees",
      value: false,
      component: "B",
    },
    {
      label: "Holidays & Exceptions",
      value: false,
      component: "C",
    },
  ]);

  const ComponentsMap = {
    A: StoreInfo,
    B: DeliveryFees,
    C: HolidayException,
  };

  const [tab, setTab] = useState([
    {
      label: "Profile",
      value: true,
    },
    {
      label: "Password",
      value: false,
    },
  ]);

  const handleTabClick = (label) => {
    const updatedTab = tab.map((t) => {
      if (t.label === label) {
        return { ...t, value: true };
      } else {
        return { ...t, value: false };
      }
    });
    setTab(updatedTab);
  };

  return (
    <ProfileContext.Provider
      value={{
        control,
        register,
        errors,
        editProfile,
        deliveryFormCount,
        setDeliveryFormCount,
        holidayFormCount,
        setHolidayFormCount,
        deliveryFeeData,
        setDeliveryFeeData,
        holidayData,
        setHolidayData,
      }}
    >
      <div className="bg-[#F2F2F2] w-full py-6 px-4">
        <div className="flex items-center gap-8 mb-6">
          <p className="text-[rgba(48,48,48,0.4)] font-medium text-[14px] leading-[16.8px] -tracking[16%] font-['Lato']">
            ...
          </p>
          <p className="text-[13px] leading-[23px] text-[#186F3D]">Profile</p>
        </div>
        <div className="flex justify-center">
          <div className="rounded w-[800px] bg-[#FFFFFF] flex justify-around py-3 px-[10px]">
            {tab.map((t, index) => (
              <p
                key={index}
                onClick={() => handleTabClick(t.label)}
                className={`cursor-pointer w-[380px] flex items-center justify-center ${
                  t.value
                    ? "font-semibold text-[#186F3D] rounded text-center shadow-lg py-2"
                    : "text-[#4F4F4F] font-normal"
                }`}
              >
                {t.label}
              </p>
            ))}
          </div>
        </div>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="mt-8 w-full bg-white p-8">
            <div className="py-4 px-4 border-b-[2px] border-[#E6E6E6] text-[#186F3D] flex items-center justify-between">
              <p className="text-xl font-bold">Profile</p>
              <p
                className="flex gap-2 items-center font-semibold cursor-pointer"
                onClick={() => setEditProfile(true)}
              >
                <EditIcon2 className="text-[#186F3D]" /> Edit
              </p>
            </div>
            <RoleActionCard
              sections={sections}
              saveSections={(data) => setSections(data)}
              ComponentsMap={ComponentsMap}
            />
            {editProfile && (
              <div className="flex justify-end gap-6 mt-8">
                <Button
                  variant="secondary"
                  type="button"
                  className="w-[133px]"
                  onClick={() => setEditProfile(false)}
                >
                  Cancel
                </Button>
                <Button className="w-[133px]" type="submit">
                  Save
                </Button>
              </div>
            )}
          </div>
        </form>
      </div>
    </ProfileContext.Provider>
  );
};

export default Profile;
