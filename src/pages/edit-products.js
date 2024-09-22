import React from "react";
import { PageLayout, EditProduct } from "../components";
import { Link } from "react-router-dom";
import { ColorArrowRight } from "../images";

const EditProducts = () => {
  return (
    <PageLayout pageName={"AddProducts"}>
      <div className="w-[100%] mx-auto bg-[#F2F2F2]">
        <div className="flex items-center py-[20px] text-[13px] px-[24px]">
          <Link to="/products">
            <span className="text-[#999999]">Products</span>
          </Link>
          <span className="px-[5px]">
            <img src={ColorArrowRight} alt="arrow-right" />
          </span>
          <span className="text-green"> Edit Products</span>
        </div>
        <EditProduct />
      </div>
    </PageLayout >
  );
};

export default EditProducts;

