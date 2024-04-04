import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { PasswordEye, PasswordLock, ViewPassword } from "../../../images";
import InputComponent from "../../shared/inputComponent";
import Button from "../../shared/button";
import { postRequest } from "../../../redux/action";
import PasswordCriteria from "../../shared/passwordChecker";
import { PasswordStrengthCheck } from "./utils";

const NewPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

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
    watch,
  } = useForm({ mode: "all" });

  // Watch for changes in the password field
  const watchPassword = watch("password");

  const code = searchParams.get("code");

  const onSubmit = async () => {
    const value = getValues();
    setLoading(true);
    try {
      const [success, responseData] = await postRequest(
        "/api/auth/reset-password",
        {
          code,
          password: value.password,
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
        navigate("/reset-successful");
      }
    } catch (error) {
      toast.error(`An error occured updating your password`, {
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  const {criteriaCount, passwordStrength} = PasswordStrengthCheck(password);

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
          control={control}
          errors={errors}
          register={register}
          requiredMessage="Password required"
          handleChange={(e) => {
            setPassword(e.target.value);
          }}
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setIsPasswordFocused(false)}
          required
        />
        <div className="mt-4">
          {isPasswordFocused && watchPassword && (
            <PasswordCriteria criteriaCount={criteriaCount} passwordStrength={passwordStrength}/>
          )}
        </div>

        <div className="mt-[20px]">
          <InputComponent
            type={confirmPassword ? "text" : "password"}
            label="New Password"
            fieldName={"confirmPassword"}
            placeholder="Enter new password"
            leftIcon={PasswordLock}
            rightIcon={confirmPassword ? ViewPassword : PasswordEye}
            onIconClick={() => setConfirmPassword(!confirmPassword)}
            control={control}
            errors={errors}
            register={register}
            {...register("confirmPassword", {
              validate: (value) =>
                value === watchPassword ||
                "The new password fields do not match. Please try again.",
            })}
            requiredMessage="Password required"
            required
          />
        </div>
        <Button
          icon="white"
          className="w-[400px] mt-[20px]"
          loading={loading}
          disabled={criteriaCount < 3}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default NewPassword;
