import React from "react";
import { Wrapper, Radio } from "./radioStyles";
import PropTypes from "prop-types";

/**
 * @description RadioButton Component
 *
 * @param {string} name : to identify the the input
 * @param {string} id : to give link label to input tags
 * @param {boolean} checked : this control the checked state of the radio button
 * @param {boolean} disabled : to control the disabled state of the radio button
 * @param {ReactNode} children : accepts strings , element e.g <p>Test</p>
 *  @param {func} handleChange : This is to handle Onchange on RadioButton to know when a user interact with it. e.g const handleChange = () => setIsDisabled(!isDisabled)
 * @example <RadioButton   id={id} name={name} checked={checked} disabled={disabled}/>
 */

const RadioButton = ({
  name,
  id,
  value,
  checked,
  disabled,
  children,
  handleChange,
}) => {
  return (
    <Wrapper>
      <label htmlFor={id} className="flex items-center gap-3">
        <Radio
          type="radio"
          value={value}
          id={id}
          name={name}
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
        />
        {children}
      </label>
    </Wrapper>
  );
};
RadioButton.defaultProps = {
  name: "radio",
  id: "on",
  checked: false,
  disabled: false,
};
RadioButton.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  handleChange: PropTypes.func.isRequired,
};

export default RadioButton;
