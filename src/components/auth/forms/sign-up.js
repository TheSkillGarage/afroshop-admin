import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GoogleLogo } from "../../../images";
import SignUpData from "../../../data/SignUp";
import Button from "../../shared/button";
import InputComponent from "../../shared/inputComponent";
import { postRequest, userLogin } from "../../../redux/action";
import { AFROADMIN_TOKEN } from "../../../utils/constants";
import { expirationDate } from "../../../utils";
import ConnectButton from "../../../googleLoginButton";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    control,
    formState: { errors },
    register,
    getValues,
    reset,
    handleSubmit,
  } = useForm({ mode: "all" });

  // send user otp
  const sendUserOtp = async (user) => {
    try {
      const [success, response] = await postRequest("/api/generate-otps", {
        email: user.email,
        user,
      });

      if (!success || response?.error) {
        console.error(response?.error?.message);
        toast.error(
          `${
            response?.error?.message || "An error occured while sending an Otp"
          }`,
          { autoClose: 2000 }
        );
      } else {
        navigate("/verify-email");
      }
    } catch (error) {
      toast.error(`An error occured while sending an Otp`, { autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async () => {
    const value = getValues();
    setLoading(true);
    try {
      const [success, responseData] = await postRequest(
        "/api/auth/local/register",
        {
          username: value.email,
          email: value.email,
          password: value.password,
          firstName: value.firstname,
          lastName: value.lastname,
        }
      );

      if (!success || responseData?.error) {
        console.error(responseData.error.message);
        toast.error(
          `${
            responseData?.error?.message || "An error occured while signing up"
          }`,
          { autoClose: 2000 }
        );
      } else {
        dispatch(userLogin(responseData?.user));
        Cookies.set(AFROADMIN_TOKEN, responseData?.jwt, {
          expires: expirationDate,
        });
        await sendUserOtp(responseData?.user);
        reset();
      }
    } catch (error) {
      toast.error(`An error occured while signing up`, { autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  };

  const requiredMessage = (label) => {
    switch (label) {
      case "First Name":
        return "Enter First Name";
      case "Last Name":
        return "Enter Last Name";
      default:
        return "Enter Valid Email";
    }
  };

  return (
    <div className="mt-8 w-full flex justify-center">
      <div>
        <div className="text-center">
          <p className="font-bold text-[20px] leading-[32px]">Sign Up</p>
          <p className="text-[16px] leading-[24px] text-[#CCCCCC] font-normal">
            Register your store to start selling with afroshop
          </p>
        </div>

        <ConnectButton provider="google"/>

        <p className="text-[13px] leading-[23px] text-center my-6 text-[#CCCCCC]">
          or
        </p>

        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            {SignUpData.map(({ label, type, icons }, index) => {
              return (
                <div key={index} className="w-[400px]">
                  {type !== "password" ? (
                    <div className="relative">
                      <InputComponent
                        type={type}
                        label={label}
                        placeholder={`Enter ${label}`}
                        fieldName={label.replace(" ", "").toLowerCase()}
                        leftIcon={icons[0]}
                        control={control}
                        errors={errors}
                        register={register}
                        patternValue={
                          label === "Email" &&
                          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
                        }
                        patternMessage={
                          label === "Email" && "Invalid email address"
                        }
                        requiredMessage={requiredMessage(label)}
                        required
                      />
                    </div>
                  ) : (
                    <div className="relative">
                      <InputComponent
                        type={showPassword ? "text" : type}
                        label={label}
                        placeholder={`Enter ${label}`}
                        fieldName={label.toLowerCase()}
                        leftIcon={icons[0]}
                        rightIcon={showPassword ? icons[2] : icons[1]}
                        onIconClick={() => setShowPassword(!showPassword)}
                        control={control}
                        errors={errors}
                        register={register}
                        requiredMessage="Password required"
                        required
                      />
                    </div>
                  )}
                </div>
              );
            })}

            <Button
              type="submit"
              icon="white"
              className="w-full mt-2"
              loading={loading}
            >
              Sign Up
            </Button>

            <p className="text-[16px] leading-[24px] text-[#CCCCCC] font-normal text-center mt-2">
              Already have an account?{" "}
              <Link to="/login">
                <span className="text-[#186F3D]">Log In</span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
