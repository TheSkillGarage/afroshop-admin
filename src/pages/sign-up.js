import React from "react";
import { AuthLayout } from "../components";
import SignUpForm from "../components/auth/forms/sign-up";

const SignUpPage = () => {
  return (
    <AuthLayout>
      <SignUpForm />
    </AuthLayout>
  );
};

export default SignUpPage;
