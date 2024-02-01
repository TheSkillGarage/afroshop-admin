import { React, useEffect, useState } from "react";
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
import SelectDropdown from "../shared/dropdownInput/dropdown";

const ProductChanges = ({ name, productInfo, handleProductInfo, handleFormSubmit }) => {

  const [isProductInfoOpen, setIsProductInfoOpen] = useState(false);
  const [isProductImageOpen, setIsProductImageOpen] = useState(false);


  const [initialProductInfo] = useState(() => ({ ...productInfo }));


  const handleProductInfoOpen = () => {
    setIsProductInfoOpen((prev) => !prev);
    setIsProductImageOpen(false);
  };
  const handleProductImageOpen = () => {
    setIsProductImageOpen((prev) => !prev);
    setIsProductInfoOpen(false);
  };

  const handleSelectCategory = (val) => {
    handleProductInfo("category", val);
  };

  const handleFilesSelect = (files) => {
    const newFiles = [...productInfo.images, ...files];
    handleProductInfo("images", newFiles);
  };

  const handleDelete = (index) => {
    const newFiles = [...productInfo.images];
    newFiles.splice(index, 1);
    handleProductInfo("images", newFiles);
  };

  useEffect(() => {
    console.log("product info here: ", productInfo);
    console.log("intial product info here: ", initialProductInfo);

    console.log("is equal? ", JSON.stringify(initialProductInfo) === JSON.stringify(productInfo))
  }, [productInfo, initialProductInfo])

  const {
    control,
    formState: { errors },
    register,
  } = useForm({ mode: "all" });

  const navigate = useNavigate()

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
          {name !== "edit" ? (
            <span className="text-green"> Add New Products</span>
          ) : (
            <span className="text-green"> Edit Product</span>
          )}
        </div>
      </div>
      <form className="bg-white p-[24px] mx-[12px]">
        <div className="flex flex-col justify-between h-[100%]">
          <div>
            <section className="p-[24px]">
              <div className="md:w-[327px] w-[50%]">
                <div className="text-[13px] font-normal text-[#B3B3B3]">
                  Category
                </div>
                <div className="mb-4 text-start w-[327px]">
                  <SelectDropdown
                    name="category-data"
                    handleSelectedYear={handleSelectCategory}
                    errors={errors}
                    options={CATEGORY_DATA}
                    placeholder="Select"
                    height="53px"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="px-4 rounded-[8px] border border-[#B3B3B3]" onClick={handleProductInfoOpen}>
                <div className="flex justify-between items-center py-4 cursor-pointer">
                  <div className="text-[16px] font-semibold text-[#186F3D]">
                    Product Info
                  </div>
                  <div>
                    {isProductInfoOpen ? (
                      <img src={ArrowDown} alt="arrow-down" />
                    ) : (
                      <img src={ArrowRight} alt="arrow-right" />
                    )}
                  </div>
                </div>

                <ProductInfo
                  name="edit"
                  productInfo={productInfo}
                  isProductInfoOpen={isProductInfoOpen}
                  handleProductInfo={handleProductInfo}
                  register={register}
                  control={control}
                  errors={errors}
                />

              </div>
              <div className="py-[24px] w-[100%]">
                <img className="w-[100%]" src={DottedLine} alt="dotted-line" />
              </div>

              <div className="px-[16px] border border-[#B3B3B3] rounded-[8px]" onClick={handleProductImageOpen}>
                <div className="flex justify-between items-center py-4 cursor-pointer">
                  <div className="text-[16px] font-semibold text-[#186F3D]">
                    Product Images
                  </div>
                  <div >
                    {isProductImageOpen ? (
                      <img src={ArrowDown} alt="arrow-down" />
                    ) : (
                      <img src={ArrowRight} alt="arrow-right" />
                    )}
                  </div>
                </div>
                {isProductImageOpen && (
                  <div className="pb-4" onClick={(e) => e.stopPropagation()}>
                    <div>
                      <FileInput
                        className="hidden"
                        id="productImage"
                        onFilesSelect={handleFilesSelect}
                        register={register}
                        control={control}
                        errors={errors}
                      />
                    </div>

                    <ImageDisplay
                      selectedFiles={productInfo.images}
                      onDelete={handleDelete}
                    />
                  </div>
                )}
              </div>
            </section>
          </div>

          <section className="flex items-center justify-between pt-[7%]">
            <Button
              variant="tertiary"
              size="big"
              type="button"
              className=""
            >
              Save as Draft
            </Button>

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
                type="button"
                className="w-[133px] h-[40px]"
                disabled={JSON.stringify(initialProductInfo) === JSON.stringify(productInfo)}
                onClick={() => { name === "edit" ? handleFormSubmit() : navigate("/products") }}
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
  name: PropTypes.string.isRequired,
  productInfo: PropTypes.object,
}



export default ProductChanges;
