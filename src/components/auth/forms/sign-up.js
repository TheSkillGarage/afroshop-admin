import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GoogleLogo } from "../../../images";
import SignUpData from "../../../data/SignUp";
import Button from "../../shared/button";
import InputComponent from "../../shared/inputComponent";
import { postRequest, updateUser } from "../../../redux/action";
import ConnectButton from "../../../googleLoginButton";
import PasswordCriteria from "../../shared/passwordChecker";
import { PasswordStrengthCheck } from "./utils";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    control,
    formState: { errors},
    register,
    getValues,
    reset,
    handleSubmit,
    watch,
  } = useForm({ mode: "all"});

  // Watch for changes in the password field
  const watchPassword = watch("password");


  const sendUserOtp = async (value) => {
    setLoading(true);
    try {
      const [success, response] = await postRequest("/api/otps", {
        email: value.email,
      });

      if (!success || response?.error) {
        console.error(response.error.message);
        toast.error(
          `${
            response?.error?.message ||
            "An error occured while sending your otp"
          }`,
          { autoClose: 2000 }
        );
      } else {
        toast.success("otp sent to your email adress", { autoClose: 2000 });
        dispatch(
          updateUser({
            username: value.email,
            email: value.email,
            password: value.password,
            firstName: value.firstname,
            lastName: value.lastname,
          })
        );
        navigate("/verify-email");
      }
    } catch (error) {
      toast.error(`An error occured while sending your otp`, {
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async () => {
    const value = getValues();
    sendUserOtp(value);
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


 const {criteriaCount, passwordStrength} = PasswordStrengthCheck(password);

  return (
    <div className="mt-8 w-full flex justify-center">
      <div>
        <div className="text-center">
          <p className="font-bold text-[20px] leading-[32px]">Sign Up</p>
          <p className="text-[16px] leading-[24px] text-[#CCCCCC] font-normal">
            Register your store to start selling with afroshop
          </p>
        </div>

        {/* <ConnectButton provider="google" /> */}

        {/* <p className="text-[13px] leading-[23px] text-center my-6 text-[#CCCCCC]">
          or
        </p> */}

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
                        compoundValidation={true}
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
                        handleChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        onFocus={() => setIsPasswordFocused(true)}
                        onBlur={() => setIsPasswordFocused(false)}
                        required
                      />
                    </div>
                  )}
                </div>
              );
            })}
            {isPasswordFocused && watchPassword && (
              <PasswordCriteria criteriaCount={criteriaCount} passwordStrength={passwordStrength}/>
            )}
            <Button
              type="submit"
              icon="white"
              className="w-full mt-2"
              loading={loading}
              disabled={criteriaCount < 3}
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
