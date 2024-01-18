import React, { useState } from "react";
import {
  PasswordEye,
  PasswordLock,
  ViewPassword,
} from "../../images";

const Password = ({ editProfile }) => {
  const [viewPassword, setViewPassword] = useState({
    reset: false,
    confirm: false,
  });

  const handleViewPassword = (text) => {
    setViewPassword((prevPassword) => ({
      ...prevPassword,
      [text]: !prevPassword[text],
    }));
  };

  return (
    <div className="mt-8 w-full bg-white p-8 min-h-screen">
      <div className="mt-8 w-full">
        <form className="">
          <div className="w-[500px] mx-auto flex flex-col gap-6">
            <div>
              <label
                htmlFor="current"
                className="block text-[13px] leading-[23px] text-[#B3B3B3] mb-1"
              >
                Current Password
              </label>

              <div className="relative">
                <img
                  src={PasswordLock}
                  alt="lock"
                  className="absolute left-6 top-3 w-6 h-6"
                />

                <input
                  type="password"
                  id="current"
                  name="password"
                  className="w-full h-[53px] rounded py-2 px-14 bg-[#F2F2F2] focus:outline-none focus:border border-[#186F3D]"
                />
              </div>
            </div>

            {editProfile && (
              <div className="flex flex-col gap-6">
                <div>
                  <label
                    htmlFor="new"
                    className="block text-[13px] leading-[23px] text-[#B3B3B3] mb-1"
                  >
                    New Password
                  </label>

                  <div className="relative">
                    <img
                      src={PasswordLock}
                      alt="lock"
                      className="absolute left-6 top-3 w-6 h-6"
                    />

                    <input
                      type={viewPassword["reset"] ? "text" : "password"}
                      id="new"
                      name="new-password"
                      className="w-full h-[53px] rounded py-2 px-14 bg-[#F2F2F2] focus:outline-none focus:border border-[#186F3D]"
                    />

                    <img
                      src={viewPassword["reset"] ? ViewPassword : PasswordEye}
                      alt="lock"
                      className="absolute right-6 top-3 w-6 h-6"
                      onClick={() => handleViewPassword("reset")}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirm"
                    className="block text-[13px] leading-[23px] text-[#B3B3B3] mb-1"
                  >
                    Confirm New Password
                  </label>

                  <div className="relative">
                    <img
                      src={PasswordLock}
                      alt="lock"
                      className="absolute left-6 top-3 w-6 h-6"
                    />

                    <input
                      type="password"
                      id="confirm"
                      name="confirm-password"
                      className="w-full h-[53px] rounded py-2 px-14 bg-[#F2F2F2] focus:outline-none focus:border border-[#186F3D]"
                    />

                    <img
                      src={viewPassword["confirm"] ? ViewPassword : PasswordEye}
                      alt="lock"
                      className="absolute right-6 top-3 w-6 h-6"
                      onClick={() => handleViewPassword("confirm")}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Password;
