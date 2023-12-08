import React, { useState } from "react";
import AdminNavbar from "../navbar";
import {
  DropdownClose,
  DropdownOpen,
  GreenRightArrow,
  LeftBlackArrow,
} from "../../images";
import { useNavigate } from "react-router-dom";
import InputComponent from "../shared/inputComponent";
import { useForm } from "react-hook-form";
import ToggleSwitch from "../toggle-switch";
import Checkbox from "../shared/checkbox";

const NewRole = () => {
  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({ mode: "all" });
  const navigate = useNavigate();
  const [showActions, setShowActions] = useState(false);
  const [openSection, setOpenSection] = useState("");
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
  const actions = [
    {
      value: "create",
      label: "Create",
    },
    {
      value: "edit",
      label: "Edit",
    },
    {
      value: "view",
      label: "View",
    },
    {
      value: "delete",
      label: "Delete",
    },
  ];
  const sections = [
    {
      value: "overview",
      label: "Overview",
    },
    {
      value: "orders",
      label: "Orders",
    },
    {
      value: "products",
      label: "Products",
    },
    {
      value: "payments",
      label: "Payments",
    },
    {
      value: "profile",
      label: "Profile",
    },
    {
      value: "roles-and-permissions",
      label: "Roles & Permissions",
    },
    {
      value: "support",
      label: "Support",
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
        <div className="bg-white p-6">
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

          {sections.map((section, index) => (
            <div>
              <div className="mt-8 border border-[#B3B3B3] p-4 rounded-lg">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => {
                    setShowActions(!showActions);
                    setOpenSection(section.value);
                  }}
                >
                  <p className="text-[#186F3D] font-semibold">
                    {section.label}
                  </p>
                  {showActions && openSection === section.value ? (
                    <DropdownOpen className="w-4 h-4" />
                  ) : (
                    <DropdownClose className="w-4 h-4" />
                  )}
                </div>
                {showActions && openSection === section.value && (
                  <div className="flex flex-col gap-8 mt-8 w-full">
                    <ToggleSwitch onToggle={() => {}}>
                      Allow Access
                    </ToggleSwitch>
                    <div className="flex w-full justify-between">
                      {actions.map((action) => (
                        <div className="flex">
                          <Checkbox
                            value={action.value}
                            valueOnChecked={null}
                          />
                          <p>{action.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {index !== sections.length - 1 && (
                <div className="mt-8 border border-[#B3B3B3] border-dashed" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewRole;
