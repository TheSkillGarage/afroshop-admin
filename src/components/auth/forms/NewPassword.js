import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { PasswordEye, PasswordLock, ViewPassword } from "../../../images";
import InputComponent from "../../shared/inputComponent";
import Button from "../../shared/button";
import { postRequest } from "../../../redux/action";

const NewPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const {
    control,
    formState: { errors },
    register,
    getValues,
    handleSubmit,
    reset,
  } = useForm({ mode: "all" });

  const code = searchParams.get("code");

  const onSubmit = async () => {
    const value = getValues();
    setLoading(true);
    try {
      const [success, responseData] = await postRequest(
        "/api/auth/reset-password",
        {
          code,
          password: value.newPassword,
          passwordConfirmation: value.confirmPassword,
        }
      );
      if (!success || responseData?.error) {
        toast.error(
          responseData.error.message ||
            "An error occured updating your password"
        );
      } else {
        reset();
        toast.success("Your password has been reset.");
        navigate("/reset-password-success");
      }
    } catch (error) {
      toast.error(`An error occured updating your password`, {
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-center font-bold pt-[40px]">Enter a new password</h2>
      <p className="text-center text-[16px] text-[#ccc] pb-[24px]">
        Do make sure to enter a password <br /> you can remember
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputComponent
          type={showPassword ? "text" : "password"}
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
          requiredMessage="Password required"
          required
        />
        <InputComponent
          type={confirmPassword ? "text" : "password"}
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
          requiredMessage="Password required"
          required
        />
        <Button icon="white" className="w-[400px]" loading={loading} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default NewPassword;
