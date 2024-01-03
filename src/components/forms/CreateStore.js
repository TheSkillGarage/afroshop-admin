import React from 'react'
import { Store, Tick, SellerCenter, WhiteArrowRight } from "../../images";

const CreateStore = () => {
  return (
    <div className="w-[100%] bg-[#F2F2F2]">
    <div className="flex">
      <div className="w-[50%]">
        <img className="h-screen w-full" src={Store} alt="store" />
      </div>
      <div className="w-[50%] h-screen flex flex-col justify-center">
        <div className="mx-auto">
          <div>
            <img src={SellerCenter} alt="logo"/>
          </div>
          <div>
            <img src={Tick} alt="tick illustation"/>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="text-center font-bold py-[24px]">
            Store Account Created Successfully!
          </div>
          <button className="py-[10px] flex justify-center px-[20px] border border-[#186F3D] bg-[#186F3D] text-[#ffffff] rounded-[4px] w-[400px]">
            <span className="pr-2"> Go to Dashboard</span>
            <span>
              <img src={WhiteArrowRight} alt="arrow"/>
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default CreateStore