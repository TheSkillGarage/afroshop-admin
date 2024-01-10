import React from "react";
import { AuthLayout, AuthSuccess } from "../components";

const PasswordSucess = () => {
  return (
    <AuthLayout>
      <AuthSuccess text="Password Change Successful!"/>
    </AuthLayout>
  );
};

export default PasswordSucess;
