import React from "react";
import { AdminNavbar, AddProduct } from "../components";

const AddProducts = () => {
  return (
    <>
      <AdminNavbar name={"AddProducts"} />
      <AddProduct name="new"/>
    </>
  );
};

export default AddProducts;
