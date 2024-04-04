import React from "react";
import Checkbox from "../../shared/checkbox";

const PasswordCriteria = ({ criteriaCount, passwordStrength }) => {

    const getBackgroundColor = (index) => {
        switch (criteriaCount) {
            case 0:
                return index === 0 ? "bg-[#FF3B30]" : "bg-[transparent]";
            case 1:
                return index <= 1 ? "bg-[#FF9500]" : "bg-[transparent]";
            case 2:
                return index <= 2 ? "bg-[#34C759]" : "bg-[transparent]";
            default:
                return "bg-[#34C759]";
        }
    };

    return (
        <div className="w-full">
            <div className="flex gap-1">
                {[0, 1, 2, 3].map((index) => (
                    <div key={index} className="w-1/4 h-1 rounded bg-[#E6E6E6]">
                        <div className={`h-full w-full rounded ${getBackgroundColor(index)}`}></div>
                    </div>
                ))}
            </div>


            <p className="text-[13px] leading-[23px] text-right text-[#B3B3B3] mt-2">
                {criteriaCount === 3
                    ? "Very strong"
                    : criteriaCount === 2
                        ? "Strong"
                        : criteriaCount === 1
                            ? "Weak"
                            : "Very weak"}
            </p>

            <div>
                <p className="text-[13px] leading-[23px] text-[#333333] font-semibold">Password must contain</p>

                <div className="mt-2 flex flex-col gap-2">
                    {
                        Object.keys(passwordStrength).map((criteria, index) => {
                            return (
                                <div className="flex items-center" key={index}>
                                    <Checkbox
                                        required={true}
                                        name={criteria}
                                        value={passwordStrength[criteria]}
                                        readOnly
                                        password
                                    />
                                    <label htmlFor={criteria} className="text-[13px] leading-[23px] text-[#999999]">{criteria.replaceAll("-", " ")}</label>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default PasswordCriteria;