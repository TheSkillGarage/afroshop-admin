import { React, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import InputComponent from "../shared/inputComponent";
import { Controller } from "react-hook-form";

export const ProductInfo = ({ name, productInfo, isProductInfoOpen, handleProductInfo, register, control, errors }) => {
  const [text, setText] = useState(
    name === "edit" ? productInfo?.description : ""
  );
  const [productName, setProductName] = useState(
    name === "edit" ? productInfo?.name : ""
  );
  const [productAvailability, setProductAvailability] = useState(
    productInfo?.availabilty
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

  const sanitizeNumbers = (val) => {
    let newVal = val.replace(/[^0-9.]/g, '');

    return newVal;
  }

  return (
    <div className={`${isProductInfoOpen ? "" : "hidden"} pt-4`} onClick={(e) => e.stopPropagation()}>
      <div className="flex justify-between items-center pb-[25px]">
        <div className=" w-[48%]">
          <InputComponent
            type="text"
            label="Name"
            fieldName="name"
            control={control}
            errors={errors}
            register={register}
            value={productName}
            handleChange={(e) => {
              setProductName(e.target.value);
              handleProductInfo("name", e.target.value);
            }}
          />
        </div>


        <div className="w-[48%]">
          <InputComponent
            type="text"
            label="Availability"
            fieldName="availability"
            control={control}
            errors={errors}
            register={register}
            value={productAvailability}
            handleChange={(e) => {
              let val = e.target.value.replace(/[^0-9]/g, '')
              setProductAvailability(val);
              handleProductInfo("availabilty", val);
            }}
          />
        </div>
      </div>
      <div>
        <div className="text-[13px] text-[#B3B3B3] pb-2">Description</div>
        <div className="h-[200px] pb-[40px]">
          <Controller
            name="quillContent"
            control={control}
            defaultValue=""
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <ReactQuill
                {...field}
                theme="snow"
                modules={modules}
                value={text}
                className="h-[100%] w-[100%]"
                onChange={(value) => {
                  setText(value);
                  handleProductInfo("description", value);
                }}
              />
            )}
          />
        </div>
      </div>
      <div className="flex justify-between items-center pt-[25px] pb-4 mt-10">
        <div className=" w-[48%]">
          <InputComponent
            type="text"
            label="Price ($)"
            fieldName="price_usd"
            control={control}
            errors={errors}
            register={register}
            value={productPrice}
            handleChange={(e) => {
              setProductPrice(sanitizeNumbers(e.target.value));
              handleProductInfo("price", sanitizeNumbers(e.target.value));
            }}
          />

        </div>
        <div className="w-[48%]">
          <InputComponent
            type="text"
            label="Discount % (If Applicable)"
            fieldName="discount"
            control={control}
            errors={errors}
            register={register}
            value={productDiscount}
            handleChange={(e) => {
              setProductDiscount(sanitizeNumbers(e.target.value));
              handleProductInfo("discount", (sanitizeNumbers(e.target.value)));
            }}
          />
        </div>
      </div>
    </div>
  );
};