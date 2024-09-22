import React from "react";
import { AddProduct, PageLayout } from "../components";
import { Link } from "react-router-dom";
import { ColorArrowRight } from "../images";

const AddProducts = () => {
  return (
    <PageLayout pageName={"AddProducts"}>
      <div className="w-[100%] mx-auto bg-[#F2F2F2]">
        <div className="flex items-center py-[20px] text-[13px] px-[24px]">
          <Link className="text-[#999999]" to="/products">
            Products
          </Link>
          <img className="px-[5px]" src={ColorArrowRight} alt="arrow-right" />
          <span className="text-green"> Add New Products</span>
        </div>
        <AddProduct />
      </div>
    </PageLayout >
  );
};

export default AddProducts;
