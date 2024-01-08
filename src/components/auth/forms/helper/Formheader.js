import React from "react";
import { SellerCenter } from "../../../../images";
import { PropTypes } from "prop-types";

/**
 * @description Form Header Component
 *
 * @param {string} name : to pass in image name for display in the component
 **/

const Formheader = ({ icon }) => {
  return (
    <div>
      <div>
        <img src={SellerCenter} alt="logo" />
      </div>
      <div>
        <img src={icon} alt="tick illustration" />
      </div>
    </div>
  );
};

export default Formheader;

Formheader.propTypes = {
  icon: PropTypes.string.isRequired,
};
