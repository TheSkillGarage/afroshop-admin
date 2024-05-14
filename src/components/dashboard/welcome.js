import React from 'react'
import { WelcomeImage } from '../../images'
import Button from '../shared/button'
import { useNavigate } from 'react-router-dom'

const Welcome = () => {
  const navigate = useNavigate();
  const handleBtnClick = () =>{
    navigate("/profile");
  }
  return (
    <div className="bg-[#F2F2F2] w-full pt-6 pb-8 px-4">
        <div className="flex items-center gap-8 mb-6 h-[39px]">
        <p className="text-[rgba(48,48,48,0.4)] font-medium text-[14px] leading-[16.8px] -tracking[16%] font-['Lato']">...</p>
        <p className="text-[13px] leading-[23px] text-[#186F3D]">Overview</p>
        </div>

        <div className='bg-[#ffffff] h-[840px] border rounded-md flex items-center justify-center flex-col gap-6'>
        <WelcomeImage />
        <h5 className='text-xl font-bold leading-8 text-[#186F3D]'>Welcome to your dashboard!</h5>
        
        <div className='flex flex-col gap-0 text-base leading-6 text-[#333333] w-[490px] text-center'>
        <p >To complete your store registration and make it shine, please continue by adding more details about your store.</p>
        <p>The more information you provide, the easier it will be for customers to discover and trust your products.</p>
        <p> Click the button below.</p>

        </div>
        <Button className="h-[40px] w-[400px]" icon="white" onClick={handleBtnClick}>Add My Store</Button>

    </div>
    </div>
  )
}

export default Welcome