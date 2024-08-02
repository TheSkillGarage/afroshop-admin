import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import ConnectButton from "../../../googleLoginButton";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import InputComponent from "../../shared/inputComponent";
import {
  BlackEmailIcon,
  PasswordEye,
  PasswordLock,
  ViewPassword,
} from "../../../images";
import { postRequest, userLogin } from "../../../redux/action";
import Button from "../../shared/button";
import { AFROADMIN_TOKEN } from "../../../utils/constants";
import { expirationDate } from "../../../utils";
import { fetchUserRole } from "./utils";

const LogInForm = () => {
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

  const onSubmit = async () => {
    const value = getValues();

    setLoading(true);
    try {
      const [success, responseData] = await postRequest("/api/auth/local", {
        identifier: value.email,
        password: value.password,
      });
      if (!success || responseData?.error) {
      
        toast.error(
          `${responseData?.error?.message || "An Error occured while logging in"
          }`,
          { autoClose: 2000 }
        );
      } else {
        const userData = await fetchUserRole("/users/me?populate=*", responseData);

        if (userData?.role?.name === "admin") {
          dispatch(userLogin(responseData?.user));
          Cookies.set(AFROADMIN_TOKEN, responseData?.jwt, {
            expires: expirationDate,
          });
          reset();
          navigate("/");
        } else {
          toast.error(`You are not authorized to access this page`, {
            autoClose: 2000,
          });
        }
      }
    } catch (error) {
      toast.error(`An error occured while logging ${error}`, { autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 w-full flex justify-center">
      <div>
        <div className="text-center mb-6">
          <p className="font-bold text-[20px] leading-[32px]">Log In</p>
          <p className="text-[16px] leading-[24px] text-[#CCCCCC] font-normal">
            Log In to manage your store
          </p>
        </div>

        {/* <ConnectButton provider="google" /> */}

        {/* <p className="text-[13px] leading-[23px] text-center my-6 text-[#CCCCCC]">
          or
        </p> */}

        <div className="w-[400px]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <InputComponent
              type="email"
              label="Store Email"
              fieldName="email"
              placeholder="Enter Email"
              leftIcon={BlackEmailIcon}
              control={control}
              errors={errors}
              register={register}
              requiredMessage="Enter valid email"
              patternValue={/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/}
              patternMessage="Invalid email address"
              required
            />

            <InputComponent
              type={showPassword ? "text" : "password"}
              label="Password"
              fieldName="password"
              placeholder="Enter Password"
              leftIcon={PasswordLock}
              rightIcon={showPassword ? ViewPassword : PasswordEye}
              onIconClick={() => setShowPassword(!showPassword)}
              control={control}
              errors={errors}
              register={register}
              requiredMessage="Password required"
              required
            />

            <Link to="/reset-password">
              <p className="text-[10px] leading-[15px] text-[#333333] text-right mt-2">
                Forgot Password?
              </p>
            </Link>

            <Button icon="white" className="w-full mt-2" loading={loading} type="submit">
              Log In
            </Button>

            <p className="text-[16px] leading-[24px] text-[#CCCCCC] font-normal text-center mt-2">
              Don't have an account?{" "}
              <Link to="/signup">
                <span className="text-[#186F3D]">Sign Up</span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogInForm;
