import React, { useState } from 'react'

const timePicker = ({ onCancel, onConfirm }) => {
    const [hours, setHours] = useState('12');
    const [minutes, setMinutes] = useState("00");
    const [period, setPeriod] = useState("AM");

    
  return (
    <div className='bg-white p-4 shadow-lg rounded-lg w-64'>
        <div className='flex justify-between items-center mb-4'>
            <div>
                <label htmlFor='hours' className='block text-sm font-medium text-gray-700'>Hours</label>
                <input
                  type='number'
                  id='hours'
                  min="1"
                  max="12"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  className='border p-2 w-16 rounded text-center'
                />
            </div>
            <div>
                <label htmlFor='minutes' className='block text-sm font-medium text-gray-700'>Minutes</label>
                <input
                  type='number'
                  id='minutes'
                  min="0"
                  max="59"
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                  className='border p-2 w-16 rounded text-center'
                />
            </div>
            <div>
                <label htmlFor='period' className='block text-sm font-medium text-gray-700'>AM/PM</label>
                <select
                id='period'
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className='border p-2 rounded text-center'
                >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                    
                    </select>  
            </div>
        </div>
        
        <div className='flex justify-between'>
        <button 
            className='bg-red-500 text-white py-1 px-4 rounded'
            onClick={onCancel}
            >
                cancel
            </button>

        <button 
            className='bg-green text-white py-1 px-4 rounded'
            onClick={onCancel}
            >
                cancel
            </button>
        </div>

    </div>
  )
}

export default timePicker