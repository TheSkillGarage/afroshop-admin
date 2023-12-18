import React from "react";
import { AdminNavbar, PageLayout } from "../../components";
import NewRole from "../../components/roles-and-permissions/new-role";

const AddNewRole = () => {
  return (
    <>
      <AdminNavbar />
      <NewRole />
    </>
  );
};

export default AddNewRole;
