import React from 'react'

const ProductCard = ({productImage, productName, salesData}) => {
  return (
    <div className='flex gap-4'>
        <img src= {productImage} alt= "Product Image"/>

        <div className='flex flex-col gap-1'>
          <p className='font-semibold text-[13px] text-[#186F3D]'>{productName}</p>
          <p className = 'font-normal text-[13px] text-[#7F7F7F]'>{salesData}</p>
        </div>
    </div>
  )
}

export default ProductCard