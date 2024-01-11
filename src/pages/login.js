import React from "react";
import { AuthLayout } from "../components";
import LogInForm from "../components/auth/forms/login";


const LogInPage = () => {
  return (
    <AuthLayout>
      <LogInForm />
    </AuthLayout>
  );
};

export default LogInPage;
