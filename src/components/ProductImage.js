import { React, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Chicken,
  Delete,
  Dot,
  Pause,
  DottedLine,
  Frame,
  Framer,
  ColorArrowRight,
  AlignLeft,
  AlignRight,
  AlignCenter,
  AlignJustify,
  Bold,
  Italic,
  Link,
  OrderedList,
  UnorderedList,
} from "../images";
import styled from "styled-components";

const StyledList = styled.ul`
  box-shadow: 0 8px 16px 0 rgba(51, 51, 51, 0.12);
  border-radius: 4px;
  list-style-type: none;
  width: 100%;
  padding: 0;
  margin: 0;
  display: ${(props) => (props.open ? "block" : "none")};
  opacity: ${(props) => (props.open ? "1" : "0")};
  transition: display 0.3s, opacity 0.3s;
  height: 150px;
  overflow-y: auto;
`;

const StyledListItem = styled.li`
  padding: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: #f2f2f2;
    color: #186f3d;
  }
`;
const Placeholder = styled.div`
  padding: 0.75rem;
  border: none;
  background-color: #f2f2f2;
  border-radius: 0.25rem;
  cursor: pointer;
`;
const StyledIcon = styled.span`
  cursor: pointer;
  background-color: ${(props) => (props.activeIcon ? "#FFE0B2" : "white")};
  padding: 10px;
  width: 35px;
  height: 35px;
  border-radius: 50%;

  img {
    width: 100%;
    height: auto;
    margin: 0 auto;
  }
`;

const TextIcons = ({ src }) => {
  const [activeIcon, setActiveIcon] = useState(false);

  const handleClickIcon = () => {
    setActiveIcon((prev) => !prev);
  };
  return (
    <StyledIcon activeIcon={activeIcon} onClick={handleClickIcon}>
      <img src={src} alt="icon" />
    </StyledIcon>
  );
};

const FileInput = ({ onFilesSelect }) => {
  const handleFileChange = (event) => {
    const files = event.target.files;
    onFilesSelect(files);

    
  };

  return (
    <div>
      <input
        type="file"
        className="hidden"
        id="productImage"
        multiple
        onChange={handleFileChange}
        accept=".jpeg, .jpg, .png"
      />
      <label htmlFor="productImage">
        <img src={Framer} className="w-[100%]" alt="Upload" />
      </label>
      <div className=" flex items-center justify-between py-[24px]">
        <div>
          <p className="text-[10px] text-[#186F3D] font-semibold">Uploading</p>
          <div className=" flex items-center justify between gap-[10px]">
            <span className="text-[10px] text-[#B3B3B3]">50%</span>
            <span>
              <img src={Dot} />
            </span>
            <span className="text-[10px] text-[#B3B3B3]">20 seconds left</span>
          </div>
        </div>
        <div className="border border-2 border-[#186F3D] w-[706px]"></div>
        <div className=" flex items-center justify between gap-[24px]">
          <span>
            <img src={Pause} />
          </span>
          <span>
            <img src={Delete} />
          </span>
        </div>
      </div>
    </div>
  );
};

const ImageDisplay = ({ selectedFiles, onDelete }) => {
  return (
    <div className="flex flex-wrap gap-[12px]">
      {selectedFiles.map((file, index) => (
        <div className="flex gap-[12px]">
          <div key={index} className="mb-4 relative">
            <img
              src={URL.createObjectURL(file)}
              alt={`Selected ${index + 1}`}
              className="w-[120px] h-[120px]"
            />
          </div>
          <div>
            <img src={Delete} onClick={() => onDelete(index)} />
          </div>
        </div>
      ))}
    </div>
  );
};
const ProductImage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isProductInfoOpen, setIsProductInfoOpen] = useState(false);
  const [isProductImageOpen, setIsProductImageOpen] = useState(false);

  const handleProductInfoOpen = () => {
    setIsProductInfoOpen((prev) => !prev);
    setIsProductImageOpen(false);
  };
  const handleProductImageOpen = () => {
    setIsProductImageOpen((prev) => !prev);
    setIsProductInfoOpen(false);
  };
  const toggleList = () => {
    setIsOpen(!isOpen);
  };
  const handleSelectCategory = (event) => {
    const newCategory = event.target.id;
    setSelectedCategory(newCategory);
    setIsOpen(false);
  };

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFilesSelect = (files) => {
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleDelete = (index) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };

  const categoryData = [
    { cat: "Beverages" },
    { cat: "Fruit Drinks" },
    { cat: "Wine" },
    { cat: "Snacks" },
    { cat: "Spices" },
    { cat: "Spirit" },
    { cat: "Cakes" },
    { cat: "Candy" },
  ];
  return (
    <div className="w-[98%] mx-auto">
      <div className="py-[12px]">
        <div className="flex items-center py-[8px] px-[12px]">
          <span>Products</span>
          <span className="px-[5px]">
            <img src={ColorArrowRight} />
          </span>
          <span> Add New Products</span>
        </div>
      </div>
      <div className="bg-white p-[24px]">
        <div className="flex flex-col justify-between h-[100%]">
          <div>
            <section className="p-[24px]">
              <div className="md:w-[327px] w-[50%]">
                <div className="text-[13px] font-normal text-[#B3B3B3]">
                  Category
                </div>
                <div className="mb-4 text-start w-100">
                  <div onClick={toggleList}>
                    <select
                      value={selectedCategory}
                      className="absolute -z-10 opacity-0"
                    >
                      {categoryData.map(({ cat }, index) => {
                        return (
                          <option key={index} value={cat}>
                            {cat}
                          </option>
                        );
                      })}
                    </select>
                    <Placeholder>
                      {selectedCategory ? selectedCategory : "Select an option"}
                    </Placeholder>
                  </div>

                  <div className="relative">
                    <StyledList open={isOpen}>
                      {categoryData.map(({ cat }, index) => {
                        return (
                          <StyledListItem
                            key={index}
                            className={selectedCategory === `${cat}`}
                            id={cat}
                            onClick={(e) => handleSelectCategory(e)}
                          >
                            {cat}
                          </StyledListItem>
                        );
                      })}
                    </StyledList>
                    {!isOpen ? (
                      <div class="flex justify-end items-center px-2 absolute pointer-events-none my-[-35px] right-0">
                        <img src={ArrowDown} />
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="p-[16px] rounded-[8px] border border-[#B3B3B3]">
                <div className="flex justify-between items-center">
                  <div className="text-[16px] font-semibold text-[#186F3D]">
                    Product Info
                  </div>
                  <div onClick={handleProductInfoOpen}>
                    {isProductInfoOpen ? (
                      <img src={ArrowDown} />
                    ) : (
                      <img src={ArrowRight} />
                    )}
                  </div>
                </div>
                {isProductInfoOpen && (
                  <div>
                    <div className="flex justify-between items-center pb-[25px]">
                      <div className=" w-[45%]">
                        <div class="text-[13px] text-[#B3B3B3]">Name</div>
                        <div>
                          <input
                            className="py-[8px] px-[20px] bg-[#F2F2F2] border rounded-[4px] w-[100%] focus:outline-green"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="w-[45%]">
                        <div class="text-[13px] text-[#B3B3B3]">
                          Availability
                        </div>
                        <div>
                          <input
                            className="py-[8px] px-[20px] bg-[#F2F2F2] border rounded-[4px] w-[100%] focus:outline-green"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="text-[13px] text-[#B3B3B3]">Description</div>
                      <div className="flex items-center gap-[16px] py-[10px]">
                        <TextIcons src={Bold} />
                        <TextIcons src={Italic} />
                        <TextIcons src={UnorderedList} />
                        <TextIcons src={OrderedList} />
                        <TextIcons src={AlignLeft} />
                        <TextIcons src={AlignCenter} />
                        <TextIcons src={AlignRight} />
                        <TextIcons src={AlignJustify} />
                      </div>
                      <div>
                        <textarea className="w-[100%] sm:h-[144px] h-[20%] border border-gray-600"></textarea>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-[25px]">
                      <div className=" w-[45%]">
                        <div class="text-[13px] text-[#B3B3B3]">Price ($)</div>
                        <div>
                          <input
                            className="py-[8px] px-[20px] bg-[#F2F2F2] border rounded-[4px] w-[100%] focus:outline-green"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="w-[45%]">
                        <div class="text-[13px] text-[#B3B3B3]">
                          Discount % (If Applicable)
                        </div>
                        <div>
                          <input
                            className="py-[8px] px-[20px] bg-[#F2F2F2] border rounded-[4px] w-[100%] focus:outline-green"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="py-[24px] w-[100%]">
                <img className="w-[100%]" src={DottedLine} />
              </div>
              <div className="p-[16px] border border-[#B3B3B3] rounded-[8px]">
                <div className="flex justify-between items-center">
                  <div className="text-[16px] font-semibold text-[#186F3D]">
                    Product Images
                  </div>
                  <div onClick={handleProductImageOpen}>
                    {isProductImageOpen ? (
                      <img src={ArrowDown} />
                    ) : (
                      <img src={ArrowRight} />
                    )}
                  </div>
                </div>
                {isProductImageOpen && (
                  <div className="pt-[16px]">
                    <div>
                      <FileInput
                        className="hidden"
                        id="productImage"
                        onFilesSelect={handleFilesSelect}
                      />
                    </div>

                    <ImageDisplay
                      selectedFiles={selectedFiles}
                      onDelete={handleDelete}
                    />
                  </div>
                )}
              </div>
            </section>
          </div>
          <section className="flex items-center justify-between pt-[7%]">
            <div>
              <button className="py-[10px] px-[20px] border border-[#186F3D] text-[#186F3D] rounded-[4px]">
                Save as Draft
              </button>
            </div>
            <div className="flex justify-between items-center gap-[24px]">
              <button className="py-[10px] px-[20px] text-[#333333] rounded-[4px] border bg-[rgba(252,174,23,0.15)] border-[rgba(252,174,23,0.15)]">
                Cancel
              </button>
              <button className="py-[10px] px-[20px] border border-[#186F3D] bg-[#186F3D] text-[#ffffff] rounded-[4px]">
                Submit
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductImage;
