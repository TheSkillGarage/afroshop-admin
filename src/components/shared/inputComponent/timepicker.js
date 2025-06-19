import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { BlackClockIcon } from "../../../images";
import OutSideClick from "../../../hooks/useHandleClickOutside";

const toStringAndPad = (intValue) =>
    String(parseInt(intValue || 0, 10)).padStart(2, '0');

const useTimeInputChange = (setFieldValue, isValidCallback, formatValueCallback) => {
    return (e) => {
        const newInput = e.target.value;
        if (newInput.length === 0) {
            setFieldValue(formatValueCallback(0));
            return;
        }

        const prevValue = setFieldValue(); // Get the current value using the setter as a getter
        const isValid = (val) => {
            const num = parseInt(val);
            return isValidCallback(num);
        };

        // 1. If valid, accept it
        if (isValid(newInput)) {
            setFieldValue(formatValueCallback(parseInt(newInput)));
            return;
        }

        // 2. If over the limit and added at the end
        if (newInput.length > prevValue.length && newInput.startsWith(prevValue)) {
            let temp = newInput;
            while (temp.length > 0 && !isValid(temp)) {
                temp = temp.slice(1); // Remove from the front
            }
            if (isValid(temp)) {
                setFieldValue(formatValueCallback(parseInt(temp)));
                return;
            }
        }

        // 3. If over the limit and added at the front
        if (newInput.length > prevValue.length && newInput.endsWith(prevValue)) {
            let temp = newInput;
            while (temp.length > 0 && !isValid(temp)) {
                temp = temp.slice(0, -1); // Remove from the back
            }
            if (isValid(temp)) {
                setFieldValue(formatValueCallback(parseInt(temp)));
                return;
            }
        }

        // 4. If over the limit and added in the middle
        if (newInput.length > prevValue.length && !newInput.startsWith(prevValue) && !newInput.endsWith(prevValue)) {
            // Try removing from the back
            let tempBack = newInput;
            while (tempBack.length > 0 && !isValid(tempBack)) {
                tempBack = tempBack.slice(0, -1);
            }
            if (isValid(tempBack)) {
                setFieldValue(formatValueCallback(parseInt(tempBack)));
                return;
            }

            // If removing from the back didn't work, try removing from the front
            let tempFront = newInput;
            while (tempFront.length > 0 && !isValid(tempFront)) {
                tempFront = tempFront.slice(1);
            }
            if (isValid(tempFront)) {
                setFieldValue(formatValueCallback(parseInt(tempFront)));
                return;
            }
        }

        // If none of the above conditions are met, revert to the previous valid value
        setFieldValue(prevValue);
    };
};

const TimePicker = ({ handleChange, initialValue, disabled }) => {
    const pickerRef = useRef(null);

    const [hours, setHours] = useState("12");
    const [minutes, setMinutes] = useState("00");
    const [amPm, setAmPm] = useState("AM");
    const [defaultTime, setDefault] = useState("12:00 AM");

    const [isOpen, setIsOpen] = useState(false);

    const handleOk = () => {
        setIsOpen(false);

        let h = parseInt(hours, 10);
        const m = parseInt(minutes, 10);

        if (amPm === "PM" && h !== 12) h += 12;
        if (amPm === "AM" && h === 12) h = 0;

        const formatted = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:00`;
        ;

        handleChange(formatted);
    };

    useEffect(() => {
        if (initialValue) {
            let [h, m] = initialValue.split(":").map(Number);

            if (h === 24) h = 0;

            const isPM = h >= 12;
            const hour12 = h % 12 === 0 ? 12 : h % 12;
            const AMPM = isPM ? "PM" : "AM"

            setHours(toStringAndPad(hour12));
            setMinutes(toStringAndPad(m));
            setAmPm(AMPM);
            setDefault(`${toStringAndPad(hour12)}:${toStringAndPad(m)} ${AMPM}`)
        }
        else (
            handleOk()
        )
    }, [initialValue]);

    const locationClickOutside = OutSideClick(pickerRef);
    useEffect(() => {
        if (locationClickOutside) {
            setIsOpen(false);
        }
    }, [locationClickOutside]);

    const handleHoursChange = useTimeInputChange(
        (newValue) => {
            if (newValue !== undefined) {
                setHours(newValue);
            }
            return hours;
        },
        (num) => !isNaN(num) && num >= 1 && num <= 12,
        toStringAndPad
    );

    const handleMinutesChange = useTimeInputChange(
        (newValue) => {
            if (newValue !== undefined) {
                setMinutes(newValue);
            }
            return minutes;
        },
        (num) => !isNaN(num) && num >= 0 && num <= 59,
        toStringAndPad
    );
    const handleCancel = (e) => {
        setIsOpen(false)
    }


    return (
        <div className="relative" ref={pickerRef}>
            <BlackClockIcon className="w-[24px] absolute left-5 top-[15px]" />
            <input
                type="text"
                value={defaultTime}
                readOnly
                onClick={() => setIsOpen(!disabled && !isOpen)}
                className={`bg-[#F2f2f2] h-[53px] p-2 rounded-[4px] w-full ${disabled ? "" : "cursor-pointer"} focus:outline-none focus:border-1 focus:border-[#186F3D] pl-12`} // Add styling as needed
            />

            {isOpen && (
                <div className="absolute top-[60px] z-10 left-1 flex flex-col gap-[24px] rounded-[4px] border-[1px] border-[#E6E6E6] justify-center bg-white shadow p-[24px] ">
                    <span className="text-[#696969] text-[13px] leading-[23px]">Enter time</span>
                    <main>
                        <div className="flex w-[280px] text-[#202124] text-[48px] font-light leading-[56px] items-center justify-between">
                            <input
                                type="number"
                                value={hours}
                                onChange={handleHoursChange}
                                className="w-[100px] h-[80px] border p-1 rounded bg-[#21212114] text-center mb-0 focus:outline-none focus:border-[2px] focus:border-[#186F3D]"
                            />
                            :
                            <input
                                type="number"
                                value={minutes}
                                onChange={handleMinutesChange}
                                className="w-[100px] h-[80px] border p-1 rounded bg-[#21212114] text-center mb-0  focus:outline-none focus:border-[2px] focus:border-[#186F3D]"
                            />
                            <div className="text-[13px] leading-[23px] font-semibold flex flex-col">
                                <button
                                    className={`p-1 h-[40px] w-[52px] border-[1px] border-[#E6E6E6] rounded ${amPm === "AM" ? "bg-[#C8E9D8] text-[#186F3D]" : "text-[#15151599]"}`}
                                    onClick={() => setAmPm("AM")}
                                >
                                    AM
                                </button>
                                <button
                                    className={`p-1 h-[40px] w-[52px] border-[1px] border-[#E6E6E6] rounded ${amPm === "PM" ? "bg-[#C8E9D8] text-[#186F3D]" : "text-[#15151599]"}`}
                                    onClick={() => setAmPm("PM")}
                                >
                                    PM
                                </button>
                            </div>
                        </div>
                        <div className="flex gap-[92px] mt-2">
                            <span className="text-[#696969] text-[13px] leading-[23px]">Hour</span>
                            <span className="text-[#696969] text-[13px] leading-[23px]">Minute</span>
                        </div>
                    </main>
                    <footer className="h-[36px] flex justify-end gap-10 text-[#186F3D] text-[14px]">
                        <button onClick={handleCancel}>CANCEL</button>
                        <button onClick={handleOk}>OK</button>
                    </footer>
                </div>
            )}
        </div>
    );
};

TimePicker.propTypes = {
    fieldName: PropTypes.string,
    leftIcon: PropTypes.string,
    rightIcon: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    value: PropTypes.string, // Expects a string like "10:30 AM"
    handleChange: PropTypes.func.isRequired, // Expects a function to handle time changes
    name: PropTypes.string.isRequired,
};

export default TimePicker;