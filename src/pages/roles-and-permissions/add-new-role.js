import React from "react";
import { PageLayout } from "../../components";
import NewRole from "../../components/roles-and-permissions/new-role";

const AddNewRole = () => {
  return (
    <PageLayout pageName={"AddNewRole"}>
      <NewRole />
    </PageLayout>
  );
};

export default AddNewRole;
