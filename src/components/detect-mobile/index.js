import React from "react";
import { CautionImage } from "../../images";

const DetectMobile = () => {
    return (
        <div className="w-full flex justify-center items-center h-screen">
            <div className="w-[80%]">
                <div>
                    <img src={CautionImage} className="w-full h-[200px]"/>
                </div>

                <div className="w-full text-[#333333] text-4 leading-6 text-center">
                    <p>Hi there! Our app is best experienced
                        on desktop. For the optimal experience,
                        please switch to a desktop or laptop.
                        Thank you!
                    </p>
                </div>
            </div>
        </div>
    )
}

export default DetectMobile;