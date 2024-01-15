import React, { useState } from "react";
import InputComponent from "../../shared/inputComponent";
import { BlackEmailIcon, PasswordEye, PasswordLock, ViewPassword } from "../../../images";
import { useForm } from "react-hook-form";
import Button from "../../shared/button";
import { Link } from "react-router-dom";


const LogInForm = () => {

    const [showPassword, setShowPassword] = useState(false);


    const {
        control,
        formState: { errors },
        register,
    } = useForm({ mode: "all" });

    return (
        <div className="mt-8 w-full flex justify-center">
            <div>
                <div>
                    <div className="text-center mb-6">
                        <p className="font-bold text-[20px] leading-[32px]">Log In</p>
                        <p className="text-[16px] leading-[24px] text-[#CCCCCC] font-normal">Log In to manage your store</p>
                    </div>
                </div>

                <div className="w-[400px]">
                    <form action="" className="flex flex-col gap-6">
                        <InputComponent
                            type="email"
                            label="Store Email"
                            fieldName="email"
                            leftIcon={BlackEmailIcon}
                            control={control}
                            errors={errors}
                            register={register}
                        />

                        <div>
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
                                <p className="text-[10px] leading-[15px] text-[#333333] text-right mt-2">Forgot Password?</p>
                            </Link>
                        </div>

                        <div>
                            <Button icon="white" className="w-full mt-2">
                                Log In
                            </Button>

                            <p className="text-[16px] leading-[24px] text-[#CCCCCC] font-normal text-center mt-2">Don't have an account? {" "}
                                <Link to="/sign-up">
                                    <span className="text-[#186F3D]">Sign Up</span>
                                </Link>
                            </p>

                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}


export default LogInForm;