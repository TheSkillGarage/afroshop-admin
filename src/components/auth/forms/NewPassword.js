import React, { useState } from "react";
import {
  PasswordEye,
  PasswordLock,
  ViewPassword,
} from "../../../images";
import InputComponent from "../../shared/inputComponent";
import { useForm } from "react-hook-form";
import Button from "../../shared/button";

const NewPassword = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState(false)
  const {
    control,
    formState: { errors },
    register,
  } = useForm({ mode: "all" });

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-center font-bold pt-[40px]">Enter a new password</h2>
      <p className="text-center text-[16px] text-[#ccc] pb-[24px]">
        Do make sure to enter a password <br/> you can remember
      </p>
      <form>
        <InputComponent
          type={showPassword ? 'text' : 'password'}
          label="Password"
          fieldName={"password"}
          placeholder="Enter new password"
          leftIcon={PasswordLock}
          rightIcon={showPassword ? ViewPassword : PasswordEye}
          onIconClick={() => setShowPassword(!showPassword)}
          className="mb-[20px]"
          control={control}
          errors={errors}
          register={register}
        />
          <InputComponent
            type={confirmPassword ? 'text' : 'password'}
            label="Password"
            fieldName={"comfirmPassword"}
            placeholder="Enter new password"
            leftIcon={PasswordLock}
            rightIcon={confirmPassword ? ViewPassword : PasswordEye}
            onIconClick={() => setConfirmPassword(!confirmPassword)}
            className="mb-[20px]"
            control={control}
            errors={errors}
            register={register}
          />
        <Button icon="white" className="w-[400px]">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default NewPassword;
