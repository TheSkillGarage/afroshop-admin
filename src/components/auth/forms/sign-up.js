import React from "react";
import { GoogleLogo } from "../../../images";
import SignUpData from "../../../data/SignUp";
import Button from "../../shared/button";
import { Link } from "react-router-dom";


const SignUpForm = () => {
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
                                        <label htmlFor="firstname" className="text-[13px] leading-[23px] text-[#B3B3B3] mb-2 block">{label}</label>

                                        <div className="relative">
                                            <img src={icons[0]} alt="user-icon" className="absolute left-[20px] top-[14px] w-6 h-6" />
                                            <input type={type} id="firstname" className="w-full h-[53px] bg-[#F2F2F2] rounded focus:outline-0 focus:border border-[#186F3D] px-12 text-4 leading-6" />
                                            {type === "password" && <img src={icons[1]} alt="user-icon" className="absolute right-[20px] top-[14px] w-6 h-6" />}
                                        </div>
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