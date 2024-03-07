import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { MessageIcon } from "../../../images";
import Button from "../../shared/button";
import { getTokenFromCookie } from "../../../utils";
import { postRequest, putRequest, userLogin } from "../../../redux/action";

const VerifyEmail = () => {
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { handleSubmit } = useForm({ mode: "all" });

  const handleOtp = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([
      ...otp.map((value, idx) => (index === idx ? element.value : value)),
    ]);

    if (element.value === "" && index > 0) {
      element.previousSibling.focus();
    } else if (element.value !== "" && element.nextSibling) {
      element.nextSibling.focus();
    }

    otp.join("");
  };

  const allOtpsNotEmpty = otp.every((str) => str.length > 0);

  const token = getTokenFromCookie();

  // change confirmation to false
  const updateUserConfirmation = async () => {
    try {
      const [success, responseData] = await putRequest(
        `/api/users/${user.id}`,
        {
          role: 3,
        },
        token
      );
      if (!success || responseData?.error) {
        console.error(responseData.error.message);
        toast.error(
          `${
            responseData?.error?.message || "An error occured please try again"
          }`,
          { autoClose: 2000 }
        );
      } else {
        dispatch(userLogin(responseData));
      }
    } catch (error) {
      toast.error(`An error occured please try again`, { autoClose: 2000 });
    }
  };

  // resend user otp
  const sendUserOtp = async (user) => {
    setLoading(true);
    try {
      const [success, response] = await postRequest("/api/generate-otps", {
        email: user.email,
        user,
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
    setLoading(true);
    try {
      const [success, responseData] = await postRequest("/api/verify-otps", {
        otp: Number(otp.join("")),
        user,
      });

      if (!success || responseData?.error) {
        console.error(responseData.error.message);
        toast.error(
          `${
            responseData?.error?.message ||
            "An error occured while verifying your otp"
          }`,
          { autoClose: 2000 }
        );
      } else {
        await updateUserConfirmation();
        navigate("/store-created");
      }
    } catch (error) {
      toast.error(`An error occured while verifying your otp`, {
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center flex flex-col justify-center items-center">
      <img src={MessageIcon} alt="message icon" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="text-center font-bold py-[24px]">Verify your email</p>
        <p className="text-center text-[16px] text-[#ccc] pb-[24px]">
          Please enter the 4 digit code sent to <br /> {user?.email}
        </p>
        <div className="flex flex-row justify-between sm:gap-[10px] w-[380]">
          {otp.map((data, index) => {
            return (
              <input
                type="text"
                maxLength="1"
                name="otp"
                key={index}
                value={data}
                onChange={(event) => handleOtp(event.target, index)}
                onFocus={(event) => event.target.select()}
                className="w-[64px] h-[64px] text-2xl font-bold border border-[#CCCCCC] focus:outline-none focus:ring-0 focus:border-[#186F3D] px-5 py-3 rounded-[4px]"
              />
            );
          })}
        </div>
        <p
          className="text-center text-[16px] text-green py-[24px] cursor-pointer"
          onClick={async () => await sendUserOtp(user)}
        >
          Resend Code
        </p>
        <Button
          icon="white"
          className="w-[400px]"
          loading={loading}
          disabled={!allOtpsNotEmpty}
          type="submit"
        >
          Verify
        </Button>
      </form>
    </div>
  );
};

export default VerifyEmail;
