import React from "react";
import { IconMessage } from "../../../images";
import InputComponent from "../../shared/inputComponent";
import { useForm } from "react-hook-form";
import Button from "../../shared/button";

const ResetPassword = () => {
  const {
    control,
    formState: { errors },
    register,
  } = useForm({ mode: "all" });

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-center font-bold pt-[40px]">Reset Password</h2>
      <p className="text-center text-[16px] text-[#ccc] pb-[24px]">
        We’ll email you a password reset link
      </p>
      <form>
        <InputComponent
          inputType="email"
          label="Email"
          fieldName={"email"}
          placeholder="Enter email"
          leftIcon={IconMessage}
          className="bg-[#F2F2F2]  border mb-[20px] border-[#186F3D]"
          control={control}
          errors={errors}
          register={register}
        />
        <Button icon="white" className="w-[400px]">
          Reset
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
