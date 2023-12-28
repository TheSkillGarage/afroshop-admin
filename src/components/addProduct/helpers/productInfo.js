import { React, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const ProductInfo = () => {
  const [text, setText] = useState("");
  const modules = {
    toolbar: [
      ["bold", "italic"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: "center" }, { align: "right" }, { align: "justify" }],
      ["link"],
    ],
  };

  return (
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
          <div class="text-[13px] text-[#B3B3B3]">Availability</div>
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
  );
};
