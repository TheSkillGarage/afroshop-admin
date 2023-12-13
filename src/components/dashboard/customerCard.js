import React from 'react'

const CustomerCard = ({customerImage, customerName, customerEmail, numberOrders}) => {
  return (
    <div className='flex gap-4'>
        <img src={customerImage} alt= "Customer Image"/>
        
        <div className='flex gap-4 w-[204px] justify-between'>
        <div className= "flex flex-col gap-1">
            <p className='font-semibold text-[13px] text-[#186F3D]'>{customerName}</p>
            <p className = 'font-normal text-[13px] text-[#7F7F7F]'>{customerEmail}</p>
        </div>

        <p className = 'font-normal text-[13px] text-[#7F7F7F] pt-[15px]'>{numberOrders}</p>
        </div>

    </div>
  )
}

export default CustomerCard