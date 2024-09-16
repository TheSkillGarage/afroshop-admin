import React, { useState } from 'react'

const TimePicker = ({ onCancel, onConfirm }) => {
    const [hours, setHours] = useState('12');
    const [minutes, setMinutes] = useState("00");
    const [period, setPeriod] = useState("AM");

    const handleConfirm = () => {
        // Convert the selected time to a 24-hour format
        let formattedHours = parseInt(hours);
        if (period === 'PM' && formattedHours !== 12) {
            formattedHours += 12;
        } else if (period === 'AM' && formattedHours === 12) {
            formattedHours = 0;
        }
        
        const selectedTime = `${formattedHours.toString().padStart(2, '0')}:${minutes.padStart(2, '0')}:00`;
        onConfirm(selectedTime); // Return time in HH:MM:SS format
    };

    const togglePeriod = (selectedPeriod) => {
        setPeriod(selectedPeriod);
    };

    const handleHourChange = (e) => {
        const value = e.target.value;
        if (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 12)) {
            setHours(value); // Only set the value if it's between 1 and 12
        }
    };

    const handleMinuteChange = (e) => {
        const value = e.target.value;
        if (value === '' || (parseInt(value) >= 0 && parseInt(value) <= 59)) {
            setMinutes(value); // Only set the value if it's between 0 and 59
        }
    };

    return (
        <div className='bg-white px-6 shadow-lg rounded-lg w-[328px]'>
            <p className='text-gray-700 py-6'>
                Enter Time
            </p>
            <div className='flex justify-between items-center mb-2'>
                <div>
                    <input
                      type='number'
                      id='hours'
                      min="1"
                      max="12"
                      value={hours}
                      onChange={handleHourChange}
                      className='border-2 border-[#186F3D] p-2 w-[96px] h-[80px] text-[56px] rounded text-center'
                    />
                    <label htmlFor='hours' className='block text-sm mt-2 font-medium text-gray-700'>Hour</label>
                </div>
                <div className='mb-8 mx-2'>
                    <span className='text-[56px] font-light'>:</span>
                </div>
                <div>
                    <input
                      type='number'
                      id='minutes'
                      min="0"
                      max="59"
                      value={minutes}
                      onChange={handleMinuteChange}
                      className='border p-2 w-[96px] h-[80px] bg-[#212121]/10 text-[56px] rounded text-center'
                    />
                    <label htmlFor='minutes' className='block text-sm mt-2 font-medium text-gray-700'>Minute</label>
                </div>
                <div className='flex flex-col pb-6 ml-3'>
                    <button
                        className={`p-2 text-center border w-[52px] rounded-t ${period === 'AM' ? 'bg-gray-300' : 'bg-white'}`}
                        onClick={() => togglePeriod('AM')}
                    >
                        AM
                    </button>
                    <button
                        className={`p-2 text-center border w-[52px] rounded-b ${period === 'PM' ? 'bg-gray-300' : 'bg-white'}`}
                        onClick={() => togglePeriod('PM')}
                    >
                        PM
                    </button>
                </div>
            </div>
            <div className='flex justify-end py-4'>
                <button 
                    className='text-green text-sm py-1 px-4 rounded'
                    onClick={onCancel}
                >
                    CANCEL
                </button>
                <button 
                    className='text-green text-sm py-1 px-4 rounded'
                    onClick={handleConfirm}
                >
                    OK
                </button>
            </div>
        </div>
    );
};


export default TimePicker;