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
import RadioButton from "../shared/radioBtn";
import DatabaseModal from "../addProduct/database-modal";

const ProductChanges = ({
  isEdit,
  productInfo,
  handleProductInfo,
  handleFormSubmit,
  handleProductDraft,
  isLoading,
  isDraftLoading,
  product,
  productType,
  setProductType,
  databaseInfo,
  setDatabaseInfo,
  handleDatabaseInfo,
  handleSetDatabaseInfo
}) => {
  const navigate = useNavigate();
  const [draftButtonClicked, setDraftButtonClicked] = useState(false);
  const [isTaxable, setIsTaxable] = useState(productInfo?.taxable);
  const categories = useSelector((state) => state.productCategories);


  const [tab, setTab] = useState("");
  const [openModal, setOpenModal] = useState(false);

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
    formState: { errors, isValid, isDirty },
    register,
    handleSubmit,
    getValues,
  } = useForm({
    mode: "onChange",
    defaultValues: databaseInfo,
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

  const disableButton = !isValid || !isDirty;
  const isSubmitDisabled = disableButton && productType !== "database" && databaseInfo ? Object.keys(databaseInfo)?.length === 0 : false;

  return (
    <div className="w-[100%] mx-auto bg-[#F2F2F2]">
      <div className="flex items-center py-[20px] text-[13px] px-[24px]">
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

      {!isEdit && <div className="bg-[#FFFFFF] px-[24px]">
        <div className="flex p-[24px] gap-6">
          <div className="flex gap-3">
            <RadioButton
              name="manual"
              id="manual"
              checked={productType === "manual"}
              handleChange={() => { setProductType("manual"); setDatabaseInfo({}) }}
            />
            <label for="manual">Manual Entry</label>
          </div>

          <div className="flex gap-3">
            <RadioButton
              name="database"
              id="database"
              checked={productType === "database"}
              handleChange={() => { setProductType("database") }}
            />
            <label for="database">Database Entry</label>
          </div>
        </div>

        {productType === "database" &&
          <div>
            <DatabaseModal
              openModal={openModal}
              closeModal={setOpenModal}
              handleDatabaseInfo={handleDatabaseInfo} />
            <div className="py-8 px-6">
              <Button type="button" variant="tertiary" outline="green" icon="add" direction="reverse" onClick={() => setOpenModal(true)}>Add Product</Button>
            </div>
          </div>
        }
      </div>}
      <form
        className="bg-white p-[24px] mx-[12px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col justify-between h-[100%]">
          <div>
            <section className="p-[24px]">
              {productType === "manual" &&
                <div className="flex gap-10">
                  <div className=" md:w-[327px] w-[50%]">
                    <div className="mb-8 text-start w-[327px] z-0">
                      <InputComponent
                        inputType="select"
                        label="Category"
                        fieldName="productCategory"
                        value={productInfo?.productCategory}
                        handleChange={(val) => {
                          handleProductInfo("productCategory", val.value)
                        }}
                        register={register}
                        control={control}
                        errors={errors}
                        required={true}
                        requiredMessage={"This field is required"}
                        options={productCategories}
                        placeholder={
                          productInfo?.productCategory !== ""
                            ? productInfo?.productCategory
                            : "Select"
                        }
                        className="w-full"
                      />
                    </div>
                  </div>
                  {productInfo.productCategory === "Others" && (
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
                      setIsTaxable(!isTaxable);
                      handleProductInfo("taxable", !isTaxable);
                    }}
                    isDisabled={false}
                    value={isTaxable === true}
                    valueOnChecked={true}
                  >
                    Taxable
                  </Checkbox>
                </div>}
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
                  databaseInfo={databaseInfo}
                  isProductInfoOpen={tab === "productInfo"}
                  handleProductInfo={handleProductInfo}
                  handleSetDatabaseInfo={handleSetDatabaseInfo}
                  register={register}
                  control={control}
                  errors={errors}
                  values={getValues()}
                  draftButtonClicked={draftButtonClicked}
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
                      databaseInfo={databaseInfo}
                    />
                  </div>

                  <ImageDisplay
                    selectedFiles={databaseInfo && Object.keys(databaseInfo).length !== 0 ? databaseInfo?.images : productInfo?.images}
                    onDelete={handleDelete}
                  />
                </div>
              </div>
            </section>
          </div>

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
                variant={isSubmitDisabled ? "disabled" : "primary"}
                type="submit"
                className="w-[133px] h-[40px]"
                loading={isLoading}
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
};

export default ProductChanges;
