import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { IconMessage } from "../../../images";
import InputComponent from "../../shared/inputComponent";
import Button from "../../shared/button";
import { postRequest } from "../../../redux/action";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const {
    control,
    formState: { errors },
    register,
    getValues,
    handleSubmit,
    reset,
  } = useForm({ mode: "all" });


  const onSubmit = async () => {
    const value = getValues();
    setLoading(true);
    try {
      const [success, responseData] = await postRequest(
        "/api/password-resets",
        {
          email: value.email,
        }
      );

      if (!success || responseData?.error) {
        toast.error(
          responseData.error.message || "An error occured resetting password"
        );
      } else {
        reset();
        toast.success("Reset password link sent to your email.");
      }
    } catch (error) {
      toast.error(`An error occured resetting password`, { autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-center font-bold pt-[40px]">Reset Password</h2>
      <p className="text-center text-[16px] text-[#ccc] pb-[24px]">
        We’ll email you a password reset link
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputComponent
          inputType="email"
          label="Email"
          fieldName={"email"}
          placeholder="Enter email"
          leftIcon={IconMessage}
          control={control}
          errors={errors}
          register={register}
          requiredMessage="Enter valid email"
          patternValue={/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/}
          patternMessage="Invalid email address"
          required
        />
        <Button icon="white" className="w-[400px] mt-[20px]" loading={loading} type="submit">
          Reset
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
