import React, { useState } from "react";
import { GoogleLogo } from "../../../images";
import SignUpData from "../../../data/SignUp";
import Button from "../../shared/button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import InputComponent from "../../shared/inputComponent";


const SignUpForm = () => {

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
                    <div className="text-center">
                        <p className="font-bold text-[20px] leading-[32px]">Sign Up</p>
                        <p className="text-[16px] leading-[24px] text-[#CCCCCC] font-normal">Register your store to start selling with afroshop</p>
                    </div>

                    <div className="mt-6 w-[400px]">
                        <button className="flex gap-2 justify-center items-center border border-1 border-[#CCCCCC] rounded w-full h-[53px]">
                            <img src={GoogleLogo} alt="google-logo" />
                            Continue with Google
                        </button>
                    </div>
                </div>

                <p className="text-[13px] leading-[23px] text-center my-6 text-[#CCCCCC]">or</p>

                <div>
                    <form action="" className="flex flex-col gap-6">
                        {
                            SignUpData.map(({ label, type, icons }, index) => {
                                return (
                                    <div key={index} className="w-[400px]">
                                        {type !== "password" ?
                                            <div className="relative">
                                                <InputComponent
                                                    type={type}
                                                    label={label}
                                                    fieldName={label.replace(" ", "-").toLowerCase()}
                                                    leftIcon={icons[0]}
                                                    control={control}
                                                    errors={errors}
                                                    register={register}
                                                />
                                            </div>
                                            :
                                            <div className="relative">
                                                <InputComponent
                                                    type={showPassword ? "text" : type}
                                                    label={label}
                                                    fieldName={label.toLowerCase()}
                                                    leftIcon={icons[0]}
                                                    rightIcon={showPassword ? icons[2] : icons[1]}
                                                    onIconClick={() => setShowPassword(!showPassword)}
                                                    control={control}
                                                    errors={errors}
                                                    register={register}
                                                />

                                            </div>
                                        }
                                    </div>
                                )
                            })
                        }

                        <div>
                            <Button icon="white" className="w-full mt-2">
                                Sign Up
                            </Button>

                            <p className="text-[16px] leading-[24px] text-[#CCCCCC] font-normal text-center mt-2">Already have an account? {" "}
                                <Link to="/login">
                                    <span className="text-[#186F3D]">Log In</span>
                                </Link>
                            </p>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default SignUpForm;