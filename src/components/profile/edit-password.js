import React, { useState } from "react";
import InputComponent from "../shared/inputComponent";
import { Lock } from "../../images";
import { PasswordEye, ViewPassword } from "../../images";

const EditPassword = ({ editProfile, form }) => {
  const [viewPassword, setViewPassword] = useState({
    current: false,
    reset: false,
    confirm: false,
  });

  const handleViewPassword = (text) => {
    setViewPassword((prevPassword) => ({
      ...prevPassword,
      [text]: !prevPassword[text],
    }));
  };

  const {
    control,
    register,
    formState: { errors },
    watch,
  } = form;

  return (
    <div className="max-w-[500px] space-y-6 m-auto py-8 items-center">
      <InputComponent
        inputType=""
        type={viewPassword["current"] ? "text" : "password"}
        label="Current Password"
        name="currentPassword"
        fieldName="currentPassword"
        required={true}
        requiredMessage={"This field is required"}
        placeholder="*********"
        className="bg-[#F2F2F2]"
        isReadOnly={!editProfile}
        control={control}
        errors={errors}
        register={register}
        leftIcon={Lock}
        // rightIcon={viewPassword["current"] ? ViewPassword : PasswordEye}
        onIconClick={() => handleViewPassword("current")}
      />
      {editProfile && (
        <>
          <InputComponent
            inputType=""
            type={viewPassword["reset"] ? "text" : "password"}
            label="New Password"
            name="newPassword"
            fieldName="newPassword"
            required={true}
            requiredMessage={"This field is required"}
            patternValue={/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/}
            patternMessage={
              "Password must contain at least one letter, one number, and be at least 8 characters long"
            }
            placeholder="Enter"
            isReadOnly={!editProfile}
            className="bg-[#F2F2F2]"
            control={control}
            errors={errors}
            register={register}
            leftIcon={Lock}
            rightIcon={viewPassword["reset"] ? ViewPassword : PasswordEye}
            onIconClick={() => handleViewPassword("reset")}
          />
          <InputComponent
            inputType=""
            type={viewPassword["confirm"] ? "text" : "password"}
            label="Confirm New Password"
            name="confirmPassword"
            fieldName="confirmPassword"
            required={true}
            requiredMessage={"This field is required"}
            placeholder="Enter"
            isReadOnly={!editProfile}
            className="bg-[#F2F2F2]"
            control={control}
            errors={errors}
            register={register}
            leftIcon={Lock}
            {...register("confirmPassword", {
              validate: (value) =>
                value === watch("newPassword") ||
                "The new password fields do not match. Please try again.",
            })}
            rightIcon={viewPassword["confirm"] ? ViewPassword : PasswordEye}
            onIconClick={() => handleViewPassword("confirm")}
          />
        </>
      )}
    </div>
  );
};

export default EditPassword;
