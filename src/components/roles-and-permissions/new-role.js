import React, { useEffect, useState } from "react";
import { GreenRightArrow } from "../../images";
import { useNavigate } from "react-router-dom";
import InputComponent from "../shared/inputComponent";
import { useForm } from "react-hook-form";
import RoleActionCard from "./role-action-card";
import Button from "../shared/button";
import { useDispatch, useSelector } from "react-redux";
import sectionData from "../../data/roles-section-data";
import { updateUserRole } from "../../redux/action";

const NewRole = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((s) => s.users);
  const [sections, setSections] = useState(sectionData);
  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
    getValues,
  } = useForm({ defaultValues: { email: "", role: "" }, mode: "all" });

  const handleSections = (data) => {
    setSections(data);
  };

  const handleActionSubmit = (event) => {
    event.preventDefault();
    const values = getValues();

    const newUsers = users.map((user) => {
      if (user.email == values.email) {
        return {
          ...user,
          role: values.role,
          actions: sections,
        };
      } else {
        return user;
      }
    });
    console.log(newUsers);
    dispatch(updateUserRole({ users: newUsers }));

    // navigate("/roles-and-permissions")
  };

  const options = [
    {
      value: "admin",
      label: "Admin",
    },
    {
      value: "super_admin",
      label: "Super Admin",
    },
  ];

  return (
    <div>
      <div className="bg-[#F2F2F2] py-6 px-4">
        <div className="flex items-center gap-8 mb-6">
          <p className="text-[rgba(48,48,48,0.4)] font-medium text-[14px] leading-[16.8px] -tracking[16%] font-['Lato']">
            ...
          </p>
          <p
            className="text-[13px] leading-[23px] text-[#999999] cursor-pointer"
            onClick={() => navigate("/roles-and-permissions")}
          >
            Roles and Permissions
          </p>
          <GreenRightArrow alt="" />
          <p className="text-[13px] leading-[23px] text-[#186F3D]">
            Add New Role
          </p>
        </div>
        <form
          className="bg-white p-6"
          onSubmit={(event) => handleSubmit(handleActionSubmit(event))}
        >
          <div className="flex justify-between gap-12">
            <InputComponent
              inputType="text"
              label="Email"
              fieldName={"email"}
              placeholder="Enter"
              className="bg-[#F2F2F2]"
              control={control}
              errors={errors}
              register={register}
            />
            <InputComponent
              inputType="select"
              options={options}
              label="Role"
              fieldName={"role"}
              placeholder="Select"
              className="bg-[#F2F2F2]"
              control={control}
              errors={errors}
              register={register}
            />
          </div>

          <RoleActionCard sections={sections} saveSections={handleSections} />

          <div className="flex justify-end gap-6 mt-8">
            <Button
              variant="secondary"
              type="button"
              onClick={() => navigate("/roles-and-permissions")}
            >
              Cancel
            </Button>
            <Button type="submit"> Submit </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewRole;
