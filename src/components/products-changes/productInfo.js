import { React, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const ProductInfo = ({ name, productInfo, handleProductInfo, isProductInfoOpen }) => {
  const [text, setText] = useState(
    name === "edit" ? productInfo?.description : ""
  );
  const [productName, setProductName] = useState(
    name === "edit" ? productInfo?.name : ""
  );
  const [productAvailability, setProductAvailability] = useState(
    productInfo?.availability
  );
  const [productPrice, setProductPrice] = useState(
    name === "edit" ? productInfo?.price : ""
  );
  const [productDiscount, setProductDiscount] = useState(
    name === "edit" ? productInfo?.discount : ""
  );
  const modules = {
    toolbar: [
      ["bold", "italic"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: "center" }, { align: "right" }, { align: "justify" }],
      ["link"],
    ],
  };

  return (
    <div className={`${isProductInfoOpen ? 'show' : 'hidden'} `}>
      <div className="flex justify-between items-center pb-[25px]">
        <div className=" w-[48%]">
          <div class="text-[13px] text-[#B3B3B3]">Name</div>
          <div>
            <input
              className="py-[8px] px-[20px] bg-[#F2F2F2] border rounded-[4px] w-[100%] focus:outline-green"
              type="text"
              value={productName}
              onChange={(e) => {
                setProductName(e.target.value); 
                handleProductInfo("productName", e.target.value)
              }}

            />
          </div>
        </div>
        <div className="w-[48%]">
          <div class="text-[13px] text-[#B3B3B3]">Availability</div>
          <div>
            <input
              className="py-[8px] px-[20px] bg-[#F2F2F2] border rounded-[4px] w-[100%] focus:outline-green"
              type="text"
              value={productAvailability}
              onChange={(e) => {setProductAvailability(e.target.value); handleProductInfo("availability", e.target.value)}}
            />
          </div>
        </div>
      </div>
      <div>
        <div class="text-[13px] text-[#B3B3B3]">Description</div>
        <div className="h-[200px] pb-[40px]">
          <ReactQuill
            theme="snow"
            value={text}
            onChange={(value) => {setText(value); handleProductInfo("description", value)}}
            modules={modules}
            className="h-[100%] w-[100%]"
          />
        </div>
      </div>
      <div className="flex justify-between items-center pt-[25px]">
        <div className=" w-[48%]">
          <div class="text-[13px] text-[#B3B3B3]">Price ($)</div>
          <div>
            <input
              className="py-[8px] px-[20px] bg-[#F2F2F2] border rounded-[4px] w-[100%] focus:outline-green"
              type="text"
              value={productPrice}
              onChange={(e) => {setProductPrice(e.target.value); handleProductInfo("salesPrice", e.target.value)}}
            />
          </div>
        </div>
        <div className="w-[48%]">
          <div class="text-[13px] text-[#B3B3B3]">
            Discount % (If Applicable)
          </div>
          <div>
            <input
              className="py-[8px] px-[20px] bg-[#F2F2F2] border rounded-[4px] w-[100%] focus:outline-green"
              type="text"
              value={productDiscount}
              onChange={(e) => {setProductDiscount(e.target.value); handleProductInfo("discount", e.target.value)}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};