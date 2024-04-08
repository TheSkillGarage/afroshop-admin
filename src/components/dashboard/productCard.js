import React from 'react'
import { renderValidUrl } from '../../utils/constants'

const ProductCard = ({ data }) => {
  const { productName, productImage, totalSales } = data
  return (
    <div className='flex gap-4'>
      <img src={renderValidUrl(productImage)} alt="Product Image" className='w-[46px] h-[54px]' />

      <div className='flex flex-col gap-1'>
        <p className='font-semibold text-[13px] text-[#186F3D]'>{productName}</p>
        <p className='font-normal text-[13px] text-[#7F7F7F]'>{`${totalSales} Sales`}</p>
      </div>
    </div>
  )
}

export default ProductCard