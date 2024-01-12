import React, { useContext, useState } from "react";
import InputComponent from "../shared/inputComponent";
import { EyeSlash, Lock } from "../../images";
import { useForm } from "react-hook-form";

const EditPassword = ({ editProfile }) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
 
  return (
    <div className="max-w-[500px] space-y-6 m-auto py-8 items-center">
      <InputComponent
        inputType=""
        type={showPassword ? "text" : "password"}
        label="Current Password"
        name="currentPassword"
        fieldName="currentPassword"
        required={true}
        requiredMessage={"This field is required"}
        placeholder="Enter"
        className="bg-[#F2F2F2]"
        control={control}
        errors={errors}
        register={register}
        leftIcon={Lock}
        rightIcon={EyeSlash}
        onIconClick={() => setShowPassword(!showPassword)}
      />
      {editProfile && (
        <>
          <InputComponent
            inputType=""
            type={showPassword ? "text" : "password"}
            label="New Password"
            name="newPassword"
            fieldName="newPassword"
            required={true}
            requiredMessage={"This field is required"}
            placeholder="Enter"
            className="bg-[#F2F2F2]"
            control={control}
            errors={errors}
            register={register}
            leftIcon={Lock}
            rightIcon={EyeSlash}
          />
          <InputComponent
            inputType=""
            type={showPassword ? "text" : "password"}
            label="Confirm New Password"
            name="confirmPassword"
            fieldName="confirmPassword"
            required={true}
            requiredMessage={"This field is required"}
            placeholder="Enter"
            className="bg-[#F2F2F2]"
            control={control}
            errors={errors}
            register={register}
            leftIcon={Lock}
            rightIcon={EyeSlash}
          />
        </>
      )}
    </div>
  );
};

export default EditPassword;
