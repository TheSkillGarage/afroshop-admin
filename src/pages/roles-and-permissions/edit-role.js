import React from "react";
import { PageLayout } from "../../components";
import EditRole from "../../components/roles-and-permissions/edit-role";

const AddNewRole = () => {
  return (
    <PageLayout pageName={"AddProducts"}>
      <EditRole />
    </PageLayout>
  );
};

export default AddNewRole;
