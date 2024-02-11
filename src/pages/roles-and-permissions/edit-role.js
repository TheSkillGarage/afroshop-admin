import React from "react";
import { AdminNavbar } from "../../components";
import EditRole from "../../components/roles-and-permissions/edit-role";

const AddNewRole = () => {
  return (
    <>
      <AdminNavbar />
      <EditRole />
    </>
  );
};

export default AddNewRole;
