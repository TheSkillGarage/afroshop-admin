import { useState } from "react";
import { Dot, Framer } from "../../../images";
import { Controller } from "react-hook-form";


export const FileInput = ({ onFilesSelect, register, control, errors }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [activeUpload, setActiveUpload] = useState(false);

  const handleIsUploading = () => {
    setActiveUpload(true);
    setShowUpload(true);
    setTimeout(() => setIsUploading(true), 100);
    setTimeout(() => {
      setActiveUpload(false);
      setShowUpload(false);
      setIsUploading(false);
    }, 2200);
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    onFilesSelect(files);
    handleIsUploading();
  };


  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    onFilesSelect(files);
    handleIsUploading();
  };


  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <Controller
        control={control}
        name={"productImage"}
        rules={{ required: "File is Required" }}
        render={({ field }) => {
          return (
            <div >
              <input
                {...register(field.name)}
                type="file"
                className="hidden"
                id="productImage"
                multiple
                field={field}
                onChange={handleFileChange}
                accept=".jpeg, .jpg, .png"
              />
            </div>
          );
        }}
      />

      <label htmlFor="productImage">
        <img
          src={Framer}
          className="w-[100%] cursor-pointer"
          alt="Upload"
        />
      </label>
      
      {showUpload && (
        <div className="flex pt4  items-center justify-between py-[24px]">
          <div>
            <p className="text-[10px] text-[#186F3D] font-semibold">
              Uploading
            </p>
            <div className=" flex items-center justify between gap-[10px]">
              <span className="text-[10px] text-[#B3B3B3]">50%</span>
              <span>
                <img src={Dot} alt="" />
              </span>
              <span className="text-[10px] text-[#B3B3B3]">
                20 seconds left
              </span>
            </div>
          </div>
          <div className={`bg-[#e6e6e6] rounded-[30px] h-[4px] w-[980px]`}>
            {activeUpload && (
              <div
                className={`bg-[#186F3D] rounded-[30px] w-[0%] h-full transition-[width] duration-[2000ms] ease-linear ${isUploading ? "w-[980px]" : "w-[0px]"
                  } `}
              ></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
