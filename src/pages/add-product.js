import React from "react";
import { AdminNavbar, AddNewProduct } from "../components";

const AddProducts = () => {
  return (
    <>
      <AdminNavbar name={"AddProducts"} />
      <AddNewProduct name="new"/>
    </>
  );
};

export default AddProducts;
