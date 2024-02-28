import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Cookies from 'js-cookies'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InputComponent from "../../shared/inputComponent";
import {
  BlackEmailIcon,
  PasswordEye,
  PasswordLock,
  ViewPassword,
} from "../../../images";
import { postRequest, userLogin } from "../../../redux/action";
import Button from "../../shared/button";
import { AFROADMIN_TOKEN, expirationDate } from "../../../utils/constants";


const LogInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch

  const {
    control,
    formState: { errors },
    register,
    getValues,
    reset,
    handleSubmit,
  } = useForm({ mode: "all" });

  const fetchUserRole = async (url, userData) => {
    const { data } = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(userData?.jwt && { 'Authorization': `Bearer ${userData?.jwt}` })
      },
    });
    return data;
  }


  const onSubmit = async () => {
    const value = getValues();
      setLoading(true);
      try {
        const [success, responseData] = await postRequest("/api/auth/local", {
          identifier: value.email,
          password: value.password,
        });
        if (!success || responseData?.error) {
          console.error(responseData?.error?.message);
          toast.error(
            `${responseData?.error?.message || "An Error occured while logging in"
            }`,
            { autoClose: 2000 }
          );
        } else {
          reset();
          const userData = fetchUserRole('/users/me?populate=*', responseData)
          console.log('heerr', userData, user)
          if (userData?.role?.name === 'admin') {
            dispatch(userLogin(responseData?.user));
            Cookies.set(AFROADMIN_TOKEN, responseData?.jwt, { expires: expirationDate });
            navigate('')
          } else {
            toast.error(`You are not an authorize to access this page`, { autoClose: 2000 });
          }
        }
      } catch (error) {
        toast.error(`An error occured while logging in`, { autoClose: 2000 });
      } finally {
        setLoading(false);
      }
  }

  return (
    <div className="mt-8 w-full flex justify-center">
      <div>
        <div className="text-center mb-6">
          <p className="font-bold text-[20px] leading-[32px]">Log In</p>
          <p className="text-[16px] leading-[24px] text-[#CCCCCC] font-normal">
            Log In to manage your store
          </p>
        </div>

        <div className="w-[400px]">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <InputComponent
              type="email"
              label="Store Email"
              fieldName="email"
              leftIcon={BlackEmailIcon}
              control={control}
              errors={errors}
              register={register}
            />

            <InputComponent
              type={showPassword ? "text" : "password"}
              label="Password"
              fieldName="password"
              leftIcon={PasswordLock}
              rightIcon={showPassword ? ViewPassword : PasswordEye}
              onIconClick={() => setShowPassword(!showPassword)}
              control={control}
              errors={errors}
              register={register}
            />

            <Link to="/reset-password">
              <p className="text-[10px] leading-[15px] text-[#333333] text-right mt-2">
                Forgot Password?
              </p>
            </Link>

              <Button icon="white" className="w-full mt-2" loading={loading}>
                Log In
              </Button>

              <p className="text-[16px] leading-[24px] text-[#CCCCCC] font-normal text-center mt-2">
                Don't have an account?{" "}
                <Link to="/sign-up">
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
