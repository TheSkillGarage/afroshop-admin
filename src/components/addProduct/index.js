import { React, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  DottedLine,
  ColorArrowRight,
} from "../../images";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { CATEGORY_DATA} from "../../data";
import { FileInput, ImageDisplay } from "./helpers";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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

const ProductImage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isProductInfoOpen, setIsProductInfoOpen] = useState(false);
  const [isProductImageOpen, setIsProductImageOpen] = useState(false);
  const [text, setText] = useState("");

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

  const modules = {
    toolbar: [
      ['bold', 'italic'],
      [
        {list: 'ordered'},
        {list: 'bullet'}
      ],
      [{ align: 'center' }, { align: 'right' }, { align: 'justify' }], 
      ['link']
    ]
  }

  return (
    <div className="w-[100%] mx-auto bg-[#F2F2F2]">
      <div className="py-[12px]">
        <div className="flex items-center py-[8px] text-[13px] px-[24px]">
          <Link to="/products">
            <span className="text-[#999999]">Products</span>
          </Link>
          <span className="px-[5px]">
            <img src={ColorArrowRight} alt="arrow-right"/>
          </span>
          <span className="text-green"> Add New Products</span>
        </div>
      </div>
      <div className="bg-white p-[24px] mx-[12px]">
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
                      onChange={() => selectedCategory}
                      className="absolute -z-10 opacity-0"
                    >
                      {CATEGORY_DATA.map(({ cat }, index) => {
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
                      {CATEGORY_DATA.map(({ cat }, index) => {
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
                      <div className="flex justify-end items-center px-2 absolute pointer-events-none my-[-35px] right-0">
                        <img src={ArrowDown} alt="arrow-down"/>
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
                  <div onClick={handleProductInfoOpen} className="cursor-pointer">
                    {isProductInfoOpen ? (
                      <img src={ArrowDown} alt="arrow-down"/>
                    ) : (
                      <img src={ArrowRight} alt="arrow-right"/>
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
                      <div className="h-[200px] pb-[40px]">
                        <ReactQuill
                          theme="snow"
                          value={text}

                          onChange={setText}
                          modules={modules}
                          className="h-[100%] w-[100%]"
                          
                        />
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
                <img className="w-[100%]" src={DottedLine} alt="dotted-lines"/>
              </div>
              <div className="p-[16px] border border-[#B3B3B3] rounded-[8px]">
                <div className="flex justify-between items-center">
                  <div className="text-[16px] font-semibold text-[#186F3D]">
                    Product Images
                  </div>
                  <div onClick={handleProductImageOpen} className="cursor-pointer">
                    {isProductImageOpen ? (
                      <img src={ArrowDown} alt="arrow-down"/>
                    ) : (
                      <img src={ArrowRight} alt="arrow-right"/>
                    )}
                  </div>
                </div>
                {isProductImageOpen && (
                  <div className="pt-[16px]">
                    <div className="w-[100%]">
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
