import React from "react";
import { AdminNavbar, } from "../components";
import ProductChanges from "../components/products-changes";

const AddProducts = () => {
  return (
    <>
      <AdminNavbar name={"AddProducts"} />
      <ProductChanges name="new"/>
    </>
  );
};

export default AddProducts;
