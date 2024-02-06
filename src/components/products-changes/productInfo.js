import { React } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import InputComponent from "../shared/inputComponent";
import { Controller } from "react-hook-form";
import { ErrorIcon } from "../../images";

export const ProductInfo = ({ productInfo, isProductInfoOpen, handleProductInfo, register, control, errors }) => {
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
            inputType="input"
            type="text"
            label="Name"
            fieldName="name"
            control={control}
            errors={errors}
            register={register}
            required={true}
            requiredMessage={'This field is required'}
            value={productInfo?.productName}
            handleChange={(e) => {
              handleProductInfo("productName", e.target.value);
            }}
          />
        </div>


        <div className="w-[48%]">
          <InputComponent
            inputType="input"
            type="text"
            label="Availability"
            fieldName="availability"
            control={control}
            errors={errors}
            register={register}
            required={true}
            requiredMessage={'This field is required'}
            value={productInfo?.availabilty}
            handleChange={(e) => {
              let val = e.target.value.replace(/[^0-9]/g, '')
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
            fieldName="quillContent"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <ReactQuill
                {...field}
                theme="snow"
                modules={modules}
                value={productInfo?.description}
                className="h-[100%] w-[100%]"
                onChange={(value) => {
                  field.onChange(productInfo?.description);
                  handleProductInfo("description", value);
                }}
              />
            )}
          />
        </div>
        {errors["quillContent"] && (
          <div className="flex flex-row gap-2 mt-2 ">
            <img src={ErrorIcon} alt="errorIcon" />
            <span className="text-[#FF3B30] text-[10px]">
              {errors["quillContent"].message}
            </span>
          </div>
        )}
      </div>
      <div className="flex justify-between items-center pt-[25px] pb-4 mt-10">
        <div className=" w-[48%]">
          <InputComponent
            inputType="input"
            type="text"
            label="Price ($)"
            fieldName="price_usd"
            control={control}
            errors={errors}
            register={register}
            required={true}
            requiredMessage={'This field is required'}
            value={productInfo?.salesPrice}
            handleChange={(e) => {
              handleProductInfo("salesPrice", sanitizeNumbers(e.target.value));
            }}
          />

        </div>
        <div className="w-[48%]">
          <InputComponent
            inputType="input"
            type="text"
            label="Discount % (If Applicable)"
            fieldName="discount"
            control={control}
            errors={errors}
            register={register}
            required={true}
            requiredMessage={'This field is required'}
            value={productInfo?.discount}
            handleChange={(e) => {
              handleProductInfo("discount", (sanitizeNumbers(e.target.value)));
            }}
          />
        </div>
      </div>
    </div>
  );
};