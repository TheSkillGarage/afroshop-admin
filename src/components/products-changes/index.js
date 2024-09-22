import { React, useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  DottedLine,
  ColorArrowRight,
} from "../../images";
import { Link, useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { FileInput, ImageDisplay } from "../addProduct/helpers";
import PropTypes from "prop-types";
import { ProductInfo } from "./productInfo";
import Button from "../shared/button";
import { useForm } from "react-hook-form";
import InputComponent from "../shared/inputComponent";
import Checkbox from "../shared/checkbox";
import { useSelector } from "react-redux";

const ProductChanges = ({
  productInfo,
  handleProductInfo,
  handleFormSubmit,
  handleProductDraft,
  isLoading,
  isDraftLoading,
  product,
}) => {
  const navigate = useNavigate();
  const categories = useSelector((state) => state.productCategories);
  const store = useSelector((state) => (state.stores && state.stores.length > 0) ? state.stores[state.storeID] : {});

  const [tab, setTab] = useState("");

  const handleFilesSelect = (files) => {
    const newImageObj = {
      url: URL.createObjectURL(files[0]),
      data: files[0],
    };
    const newFiles = [...productInfo.images, newImageObj];

    handleProductInfo("images", newFiles);
  };

  const handleDelete = (index) => {
    const newFiles = [...productInfo.images];

    newFiles.splice(index, 1);
    handleProductInfo("images", newFiles);
  };

  const {
    control,
    formState: { errors, isValid },
    register,
    handleSubmit,
    getValues,
  } = useForm({
    mode: "onChange",
    defaultValues: productInfo,
  });

  const onSubmit = (data) => {
    handleFormSubmit(data);
  };

  const productCategories = [
    ...categories?.map((c) => {
      return { label: c?.name, value: c?.name };
    }),
    { label: "Others", value: "Others" },
  ];

  const disableButton = !isValid

  return (
    <form
      className="flex flex-col justify-between h-[100%]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <section className="px-[24px]">

        <div className="flex gap-10">
          <div className=" md:w-[327px] w-[50%]">
            <div className="mb-8 text-start w-[327px] z-0">
              <InputComponent
                inputType="select"
                label="Category"
                fieldName="productCategory"
                name="productCategory"
                value={"protein"}
                handleChange={(val) => {
                  handleProductInfo?.("productCategory", val.value);
                }}
                register={register}
                control={control}
                errors={errors}
                required={true}
                requiredMessage={"This field is required"}
                options={productCategories}
                placeholder={
                  (productInfo?.productCategory !== "")
                    ? productInfo?.productCategory
                    : "Select"
                }
                className="w-full"
              />
            </div>
          </div>
          {(productInfo?.productCategory === "Others") && (
            <div className="w-[327px]">
              <InputComponent
                inputType="input"
                type="text"
                label="Enter Category"
                fieldName="category"
                placeholder="Enter"
                control={control}
                errors={errors}
                register={register}
                required={true}
                requiredMessage={"This field is required"}
                value={productInfo?.category}
                validate={(value) =>
                  !productCategories.some((c) => c?.value === value?.trim()) ||
                  "Category already exists"
                }
                handleChange={(e) => {
                  handleProductInfo("category", e.target.value);
                }}
              />
            </div>
          )}
          <Checkbox
            name={"taxable"}
            handleChange={() => {
              handleProductInfo("taxable", !productInfo.taxable);
            }}
            isDisabled={false}
            value={productInfo.taxable === true}
            valueOnChecked={true}
          >
            Taxable
          </Checkbox>
          {store?.allowUserSKU && (
            <div className="mb-8 text-start w-[327px] z-0">
              <InputComponent
                inputType="input"
                type="text"
                label="SKU"
                fieldName="SKU"
                name="userSKU"
                placeholder="Enter"
                control={control}
                errors={errors}
                register={register}
                patternValue={/^[a-zA-Z0-9-]{5,}$/}
                patternMessage="SKU must not be less than 5 characters"
                required={true}
                requiredMessage={"This field is required"}
                value={productInfo?.userSKU ?? ""}
                handleChange={(e) => {
                  handleProductInfo('userSKU', e.target.value);
                }}
              />
            </div>
          )}
        </div>

        <div
          className="px-4 rounded-[8px] border border-[#B3B3B3]"
          onClick={() =>
            setTab(tab === "productInfo" ? "" : "productInfo")
          }
        >
          <div className="flex justify-between items-center py-4 cursor-pointer">
            <div className="text-[16px] font-semibold text-[#186F3D]">
              Product Info
            </div>
            <div>
              {tab === "productInfo" ? (
                <img src={ArrowDown} alt="arrow-down" />
              ) : (
                <img src={ArrowRight} alt="arrow-right" />
              )}
            </div>
          </div>

          <ProductInfo
            productInfo={productInfo}
            isProductInfoOpen={tab === "productInfo"}
            handleProductInfo={handleProductInfo}
            register={register}
            control={control}
            errors={errors}
            values={getValues()}
          />
        </div>
        <div className="py-[24px] w-[100%]">
          <img className="w-[100%]" src={DottedLine} alt="dotted-line" />
        </div>

        <div
          className="px-[16px] border border-[#B3B3B3] rounded-[8px]"
          onClick={() =>
            setTab(tab === "productImage" ? "" : "productImage")
          }
        >
          <div className="flex justify-between items-center py-4 cursor-pointer">
            <div className="text-[16px] font-semibold text-[#186F3D]">
              Product Images
            </div>
            <div>
              {tab === "productImage" ? (
                <img src={ArrowDown} alt="arrow-down" />
              ) : (
                <img src={ArrowRight} alt="arrow-right" />
              )}
            </div>
          </div>

          <div
            className={`${tab === "productImage" ? "" : "hidden"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <FileInput
                className="hidden"
                id="productImage"
                productInfo={productInfo}
                onFilesSelect={handleFilesSelect}
                register={register}
                control={control}
                errors={errors}
              />
            </div>

            <ImageDisplay
              selectedFiles={productInfo?.images}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </section>

      <section className="flex items-center justify-between pt-[7%]">
        {product?.status !== "active" && (
          <Button
            variant="tertiary"
            outline="green"
            type="button"
            className="w-[153px] h-[40px]"
            loading={isDraftLoading}
            onClick={(e) => {
              e.preventDefault();
              handleProductDraft();
            }}
          >
            Save as Draft
          </Button>
        )}

        <div className={`flex justify-between items-center gap-4 ml-auto`}>
          <Button
            variant="tertiary"
            outline="green"
            type="button"
            className="w-[173px] h-[40px]"
            onClick={() => navigate("/products")}
          >
            Cancel
          </Button>

          <Button
            variant={disableButton ? "disabled" : "primary"}
            type="submit"
            className="w-[133px] h-[40px]"
            loading={isLoading}
          >
            Submit
          </Button>
        </div>
      </section>
    </form>
  );
};

ProductChanges.propTypes = {
  productInfo: PropTypes.object,
};

export default ProductChanges;
