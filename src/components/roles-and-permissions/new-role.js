import React from "react";
import AdminNavbar from "../navbar";
import { GreenRightArrow } from "../../images";
import { useNavigate } from "react-router-dom";
import InputComponent from "../shared/inputComponent";
import { useForm } from "react-hook-form";

const NewRole = () => {
  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({ mode: "all" });
  const navigate = useNavigate();

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
      <AdminNavbar />
      <div className="bg-[#F2F2F2] w-full py-6 px-4">
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
        <div className="bg-white p-6 w-[1328px]">
          <div className="flex justify-between gap-12">
            <InputComponent
              inputType="text"
              label="Email"
              fieldName={"email"}
              placeholder=""
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
        </div>
      </div>
    </div>
  );
};

export default NewRole;
