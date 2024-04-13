import { React, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  DottedLine,
  ColorArrowRight,
} from "../../images";

import { Link, useNavigate } from "react-router-dom";
import { CATEGORY_DATA } from "../../data";
import "react-quill/dist/quill.snow.css";
import { FileInput, ImageDisplay } from "../addProduct/helpers";
import PropTypes from 'prop-types';

import { ProductInfo } from "./productInfo";
import Button from "../shared/button";
import { useForm } from "react-hook-form";
import InputComponent from "../shared/inputComponent";
import _ from 'lodash'


const ProductChanges = ({ isEdit, isDraft, productInfo, initialProductInfo, handleProductInfo, handleFormSubmit, handleProductDraft }) => {

  const navigate = useNavigate();
  const [tab, setTab] = useState("");

  const handleSelectCategory = (val) => {
    handleProductInfo("category", val);
  };

  const handleFilesSelect = (files) => {
    const newImageObj = {
      url: URL.createObjectURL(files[0]),
      data: files[0],
    }
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
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    mode: "all",
    defaultValues: productInfo
  });

  const onSubmit = (data) => {
    handleFormSubmit()
  };

  return (
    <div className="w-[100%] mx-auto bg-[#F2F2F2]">
      <div className="py-[12px]">
        <div className="flex items-center py-[8px] text-[13px] px-[24px]">
          <Link to="/products">
            <span className="text-[#999999]">Products</span>
          </Link>
          <span className="px-[5px]">
            <img src={ColorArrowRight} alt="arrow-right" />
          </span>
          {!isEdit ? (
            <span className="text-green"> Add New Products</span>
          ) : (
            <span className="text-green"> Edit Product</span>
          )}
        </div>
      </div>
      <form className="bg-white p-[24px] mx-[12px]" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col justify-between h-[100%]">
          <div>
            <section className="p-[24px]">
              <div className="md:w-[327px] w-[50%]">
                <div className="mb-8 text-start w-[327px]">
                  <InputComponent
                    inputType="select"
                    label="Category"
                    fieldName="category"
                    defaultValue={productInfo?.category}
                    value={productInfo?.category}
                    handleChange={handleSelectCategory}
                    register={register}
                    control={control}
                    errors={errors}
                    required={true}
                    requiredMessage={'This field is required'}
                    options={CATEGORY_DATA}
                    placeholder={(productInfo?.category !== "") ? productInfo?.category : "Select"}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="px-4 rounded-[8px] border border-[#B3B3B3]" onClick={() => setTab(tab === "productInfo" ? "" : "productInfo")}>
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
                />

              </div>
              <div className="py-[24px] w-[100%]">
                <img className="w-[100%]" src={DottedLine} alt="dotted-line" />
              </div>

              <div className="px-[16px] border border-[#B3B3B3] rounded-[8px]" onClick={() => setTab(tab === "productImage" ? "" : "productImage")}>
                <div className="flex justify-between items-center py-4 cursor-pointer">
                  <div className="text-[16px] font-semibold text-[#186F3D]">
                    Product Images
                  </div>
                  <div >
                    {tab === "productImage" ? (
                      <img src={ArrowDown} alt="arrow-down" />
                    ) : (
                      <img src={ArrowRight} alt="arrow-right" />
                    )}
                  </div>
                </div>
                
                  <div className={`${tab === "productImage" ? "" : "hidden"}`} onClick={(e) => e.stopPropagation()}>
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
          </div>

          <section className="flex items-center justify-between pt-[7%]">
            <div className="flex gap-6">
              <Button
                variant="tertiary"
                size="big"
                type="button"
                className=""
                disabled={_.isEqual(initialProductInfo, productInfo)}
                onClick={() => handleProductDraft("draft")}
              >
                Save as Draft
              </Button>

              {isDraft && <Button
                variant="tertiary"
                size="big"
                type="button"
                className=""
                onClick={() => handleProductDraft("discard")}
              >
                Discard Draft
              </Button>}
            </div>

            <div className="flex justify-between items-center gap-[24px]">

              <Button
                variant="secondary"
                type="button"
                className="w-[133px] h-[40px]"
                onClick={() => navigate("/products")}
              >
                Cancel
              </Button>

              <Button
                variant="primary"
                type="submit"
                className="w-[133px] h-[40px]"
                disabled={_.isEqual(initialProductInfo, productInfo)}
              >
                Submit
              </Button>
            </div>
          </section>
        </div>
      </form>
    </div>
  );
};


ProductChanges.propTypes = {
  isEdit: PropTypes.bool.isRequired,
  productInfo: PropTypes.object,
}



export default ProductChanges;
