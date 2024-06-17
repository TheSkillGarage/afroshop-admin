import React from "react";
import { CautionImage } from "../../images";
import { removeTokenFromCookie } from "../../utils";
import { LogoutIcon2 } from "../../images";
import { useDispatch } from "react-redux";
import Button from "../shared/button";
import { logOutUser } from "../../redux/action";

const ErrorScreen = () => {
    const dispatch = useDispatch()

    const handleUserLogOut = () => {
        removeTokenFromCookie();
        dispatch(logOutUser());
    };

    return (
        <div className="w-full flex justify-center items-center content-height">
            <div className="w-[80%] flex flex-col gap-10">
                <div>
                    <img src={CautionImage} className="w-full h-[200px]" />
                </div>

                <div className="w-full text-[#333333] text-4 leading-6 text-center">
                    <p>
                        We are currently experiencing issues reaching our server to retrieve your store's data.
                        This problem is likely temporary and will be resolved shortly.
                        Please click refresh to try again or log out.
                    </p>
                </div>

                <div className="flex gap-40 items-start justify-center mt-25">
                    <Button icon="logout" className="w-[150px]" loading={false} type="submit" variant="tertiary" onClick={handleUserLogOut}>
                        Log Out
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ErrorScreen;