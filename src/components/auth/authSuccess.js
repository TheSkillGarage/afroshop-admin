import React from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import Button from "../shared/button";
import { Tick } from "../../images";

const AuthSuccess = ({ text }) => {
  return (
    <div className="text-center flex flex-col justify-center items-center">
      <img src={Tick} alt="tick illustration" />
      <div>
        <div className="text-center font-bold py-[24px]">{text}</div>
        <Link to="/dashboard">
          {" "}
          <Button icon="white" className="w-[400px]">
            Go to dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AuthSuccess;

AuthSuccess.propTypes = {
  text: PropTypes.string.isRequired,
}
