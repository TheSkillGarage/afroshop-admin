import React, { useState } from "react";
import { GreenEdit, GreyEdit, PasswordEye, PasswordLock, ViewPassword } from "../../images";
import Button from "../shared/button";
import InputComponent from "../shared/inputComponent";
import { useForm } from "react-hook-form";


const Password = () => {

    const [edit, setEdit] = useState(false);

    const [viewNewPassword, setViewNewPassword] = useState(false);
    const [viewConfirmPassword, setViewConfirmPassword] = useState(false);


    const handleEdit = () => {
        setEdit((prevEdit) => !prevEdit);

        // Update all viewPassword values to false
        setViewConfirmPassword(false);
        setViewNewPassword(false);
    };


    const {
        control,
        formState: { errors },
        register,
    } = useForm({ mode: "all" });


    return (
        <div className="mt-8 w-full bg-white p-8 min-h-screen">
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
                        <InputComponent
                            type="password"
                            label="Current Password"
                            fieldName="currentPassword"
                            leftIcon={PasswordLock}
                            control={control}
                            errors={errors}
                            register={register}
                        />


                        {edit &&
                            <div className="flex flex-col gap-6">
                                <InputComponent
                                    type={viewNewPassword ? "text" : "password"}
                                    label="New Password"
                                    fieldName="newPassword"
                                    leftIcon={PasswordLock}
                                    rightIcon={viewNewPassword ? ViewPassword : PasswordEye}
                                    onIconClick={() => setViewNewPassword(!viewNewPassword)}
                                    control={control}
                                    errors={errors}
                                    register={register}
                                />

                                <InputComponent
                                    type={viewConfirmPassword ? "text" : "password"}
                                    label="Confirm New Password"
                                    fieldName="confirmPassword"
                                    leftIcon={PasswordLock}
                                    rightIcon={viewConfirmPassword ? ViewPassword : PasswordEye}
                                    onIconClick={() => setViewConfirmPassword(!viewConfirmPassword)}
                                    control={control}
                                    errors={errors}
                                    register={register}
                                />
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