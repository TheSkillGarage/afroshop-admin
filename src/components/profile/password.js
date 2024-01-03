import React, { useState } from "react";
import { GreenEdit, GreyEdit, PasswordEye, PasswordLock, ViewPassword } from "../../images";
import Button from "../shared/button";


const Password = () => {

    const [edit, setEdit] = useState(false);


    const [viewPassword, setViewPassword] = useState({
        reset: false,
        confirm: false
    });


    const handleViewPassword = (text) => {
        setViewPassword(prevPassword => ({
            ...prevPassword,
            [text]: !prevPassword[text]
        }))
    }

    const handleEdit = () => {
        setEdit((prevEdit) => !prevEdit);

        // Update all viewPassword values to false
        setViewPassword((prevViewPassword) => {
            const updatedViewPassword = { ...prevViewPassword };
            Object.keys(updatedViewPassword).forEach((key) => {
                updatedViewPassword[key] = false;
            });
            return updatedViewPassword;
        });
    };



    return (
        <div className="mt-8 w-full bg-white p-8">
            <div className="w-full flex justify-between items-center p-4 border-b border-1 border-[#E6E6E6]">
                <p className="text-[20px] leading-[32px] text-[#186F3D] font-bold">Password</p>

                <div className="flex gap-2 items-center cursor-pointer" onClick={() => handleEdit()}>
                    <img src={edit ? GreyEdit : GreenEdit} alt="edit-icon" />

                    <p className={`text-[16px] leading-[24px] font-semibold ${edit ? "text-[#CCCCCC]" : "text-[#186F3D]"}`}>Edit</p>
                </div>
            </div>

            <div className="mt-8 w-full">
                <form className="">
                    <div className="w-[500px] mx-auto flex flex-col gap-6">

                        <div>
                            <label htmlFor="current" className="block text-[13px] leading-[23px] text-[#B3B3B3] mb-1">Current Password</label>

                            <div className="relative">
                                <img src={PasswordLock} alt="lock" className="absolute left-6 top-3 w-6 h-6" />

                                <input type="password" id="current" name="password" className="w-full h-[53px] rounded py-2 px-14 bg-[#F2F2F2] focus:outline-none focus:border border-[#186F3D]" />

                            </div>

                        </div>


                        {edit &&
                            <div className="flex flex-col gap-6">
                                <div>
                                    <label htmlFor="new" className="block text-[13px] leading-[23px] text-[#B3B3B3] mb-1">New Password</label>

                                    <div className="relative">
                                        <img src={PasswordLock} alt="lock" className="absolute left-6 top-3 w-6 h-6" />

                                        <input type={viewPassword["reset"] ? "text" : "password"} id="new" name="new-password" className="w-full h-[53px] rounded py-2 px-14 bg-[#F2F2F2] focus:outline-none focus:border border-[#186F3D]" />

                                        <img src={viewPassword["reset"] ? ViewPassword : PasswordEye} alt="lock" className="absolute right-6 top-3 w-6 h-6" onClick={() => handleViewPassword("reset")} />
                                    </div>

                                </div>

                                <div>
                                    <label htmlFor="confirm" className="block text-[13px] leading-[23px] text-[#B3B3B3] mb-1">Confirm New Password</label>

                                    <div className="relative">
                                        <img src={PasswordLock} alt="lock" className="absolute left-6 top-3 w-6 h-6" />

                                        <input type="password" id="confirm" name="confirm-password" className="w-full h-[53px] rounded py-2 px-14 bg-[#F2F2F2] focus:outline-none focus:border border-[#186F3D]" />

                                        <img src={viewPassword["confirm"] ? ViewPassword : PasswordEye} alt="lock" className="absolute right-6 top-3 w-6 h-6" onClick={() => handleViewPassword("confirm")} />
                                    </div>

                                </div>
                            </div>
                        }

                    </div>

                    {edit && <div className="flex justify-end gap-6 mt-8">
                        <Button
                            variant="secondary"
                            type="button"
                            className="w-[133px]"
                            onClick={() => setEdit(false)}
                        >
                            Cancel
                        </Button>
                        <Button className="w-[133px]" type="submit">
                            {" "}
                            Save{" "}
                        </Button>
                    </div>}
                </form>
            </div >
        </div >
    )
}


export default Password;