import { React, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import InputComponent from "../shared/inputComponent";
import { Controller } from "react-hook-form";
import { ErrorIcon } from "../../images";
import RadioButton from "../shared/radioBtn";
import { pricingTypeOptions } from "../../data/profile";
import { getTokenFromCookie } from "../../utils";

export const ProductInfo = ({
  productInfo,
  isProductInfoOpen,
  handleProductInfo,
  register,
  control,
  errors,
}) => {
  const [pricingType, setPricingType] = useState(productInfo?.type);
  const modules = {
    toolbar: [
      ["bold", "italic"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: "center" }, { align: "right" }, { align: "justify" }],
      ["link"],
    ],
  };

  const sanitizeNumbers = (val, key) => {
    // Remove all characters that are not digits or periods
    let newVal = val.replace(/[^0-9.]/g, "");

    // If there are more than one period, keep only the first one
    if (newVal.indexOf(".") !== newVal.lastIndexOf(".")) {
      newVal = newVal.slice(0, newVal.lastIndexOf("."));
    }

    return newVal;
  };
  console.log(productInfo, getTokenFromCookie());

  return (
    <div
      className={`${isProductInfoOpen ? "" : "hidden"} pt-4`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-start pb-[25px]">
        <div className=" w-[48%]">
          <InputComponent
            inputType="input"
            type="text"
            label="Name"
            fieldName="productName"
            placeholder="Enter"
            control={control}
            errors={errors}
            register={register}
            required={true}
            requiredMessage={"This field is required"}
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
            placeholder="Enter"
            control={control}
            errors={errors}
            register={register}
            required={true}
            requiredMessage={"This field is required"}
            patternValue={/^(?!0\d)/}
            patternMessage="Please enter a valid number"
            value={productInfo?.availability}
            handleChange={(e) => {
              let val = e.target.value.replace(/[^0-9]/g, "");
              handleProductInfo("availability", val);
            }}
          />
        </div>
      </div>
      <div>
        <div className="text-[13px] text-[#B3B3B3] pb-2">Description</div>
        <div className="h-[200px] pb-[40px]">
          <Controller
            name="description"
            fieldName="description"
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
        {errors["description"] && (
          <div className="flex flex-row gap-2 mt-2 ">
            <img src={ErrorIcon} alt="errorIcon" />
            <span className="text-[#FF3B30] text-[10px]">
              {errors["description"].message}
            </span>
          </div>
        )}
      </div>
      <div className="flex mt-10 gap-5">
        <div className="flex gap-2">
          <RadioButton
            name="type"
            id="type"
            checked={pricingType === 0}
            disabled={false}
            handleChange={(e) => {
              setPricingType(0);
              handleProductInfo("type", 0);
            }}
          />
          <label>Price Per Item</label>
        </div>
        <div className="flex gap-2">
          <RadioButton
            name="type"
            id="type"
            checked={pricingType === 1}
            disabled={false}
            handleChange={() => {
              setPricingType(1);
              handleProductInfo("type", 1);
            }}
          />
          <label>Price Per Weight</label>
        </div>
      </div>

      {pricingType === 0 && (
        <div className="pt-[25px] pb-4 space-y-3">
          <p className="text-[#4F4F4F] font-bold">Price Per Item</p>
          <div className="flex justify-between items-start">
            <div className="flex gap-4 items-end justify-center w-[48%]">
              <div className="w-[30%]">
                <InputComponent
                  inputType="input"
                  type="text"
                  label="Unit Weight"
                  fieldName="unitWeightInGrams"
                  name="unitWeightInGrams"
                  placeholder="Enter"
                  control={control}
                  errors={errors}
                  register={register}
                  required={true}
                  patternMessage="Please enter a valid price"
                  patternValue={/^(?!0\d)/}
                  requiredMessage={"This field is required"}
                  value={productInfo?.unitWeightInGrams}
                  handleChange={(e) => {
                    handleProductInfo(
                      "unitWeightInGrams",
                      sanitizeNumbers(e.target.value)
                    );
                  }}
                />
              </div>
              <InputComponent
                inputType="input"
                type="text"
                label="Price ($)"
                fieldName="salesPrice"
                placeholder="Enter"
                control={control}
                errors={errors}
                register={register}
                required={true}
                patternValue={/^(?!0\d)\d+(\.\d{1,2})?$/}
                patternMessage="Please enter a valid price"
                requiredMessage={"This field is required"}
                value={productInfo?.salesPrice}
                handleChange={(e) => {
                  handleProductInfo(
                    "salesPrice",
                    sanitizeNumbers(e.target.value)
                  );
                }}
              />
            </div>
            <div className="w-[48%]">
              <InputComponent
                inputType="input"
                type="text"
                label="Discount % (If Applicable)"
                fieldName="discount"
                placeholder="Enter"
                control={control}
                errors={errors}
                register={register}
                patternValue={
                  /^(?!0\d)(100(\.0{1,2})?|\d{1,2}(\.\d{1,2})?|0(\.\d{1,2})?)$/
                }
                patternMessage={"Please enter a valid discount (0 - 100)"}
                value={productInfo?.discount}
                handleChange={(e) => {
                  handleProductInfo(
                    "discount",
                    sanitizeNumbers(e.target.value)
                  );
                }}
              />
            </div>
          </div>
        </div>
      )}

      {pricingType === 1 && (
        <div className="pt-[25px] pb-4 space-y-3">
          <p className="text-[#4F4F4F] font-bold">Price Per Weight</p>
          <div className="flex justify-between items-start pb-[25px] mt-10">
            <div className="flex gap-4 items-end justify-center w-[48%]">
              <div className="w-[30%]">
                <InputComponent
                  inputType="select"
                  type="select"
                  label="Price ($)"
                  fieldName="pricingType"
                  placeholder="Enter"
                  control={control}
                  errors={errors}
                  background={{
                    background: "#186F3D",
                    color: "#FFFFFF",
                    indicatorColor: "#FFFFFF",
                    optionColor: "#FFFFFFF",
                  }}
                  register={register}
                  required={true}
                  patternValue={/^(?!0\d)\d+(\.\d{1,2})?$/}
                  patternMessage="Please enter a valid price"
                  requiredMessage={"This field is required"}
                  value={productInfo?.pricingType}
                  options={pricingTypeOptions}
                  handleChange={(e) => {
                    handleProductInfo("pricingType", e?.value);
                  }}
                />
              </div>
              <InputComponent
                inputType="input"
                type="text"
                fieldName="salesPrice"
                placeholder="Enter"
                control={control}
                errors={errors}
                register={register}
                required={true}
                patternValue={/^(?!0\d)\d+(\.\d{1,2})?$/}
                patternMessage="Please enter a valid price"
                requiredMessage={"This field is required"}
                value={productInfo?.salesPrice}
                handleChange={(e) => {
                  handleProductInfo(
                    "salesPrice",
                    sanitizeNumbers(e.target.value)
                  );
                }}
              />
            </div>
            <div className="w-[48%]">
              <InputComponent
                inputType="input"
                type="text"
                label="Discount % (If Applicable)"
                fieldName="discount"
                placeholder="Enter"
                control={control}
                errors={errors}
                register={register}
                patternValue={
                  /^(?!0\d)(100(\.0{1,2})?|\d{1,2}(\.\d{1,2})?|0(\.\d{1,2})?)$/
                }
                patternMessage={"Please enter a valid discount (0 - 100)"}
                value={productInfo?.discount}
                handleChange={(e) => {
                  handleProductInfo(
                    "discount",
                    sanitizeNumbers(e.target.value)
                  );
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
