import React from "react";
import PropTypes from "prop-types";
import { CheckboxDisplay, CheckboxInput } from "./checkbox.styles";

/**
 * @description Checkbox Component
 *
 * @param {string} name : to create a unique id for each checkbox to know when it is checked
 * @param {func} handleChange : This is to handle Onchange on checkbox to know when a user interact with it for example to check and uncheck state of the checkbox const handleChange = () => setIsChecked(!isChecked)
 * @param {boolean} isChecked : The state of check state  for example const [isChecked, setIsChecked] = useState(false); . This shows the state of the checkbox
 * @param {boolean} isDisabled: If set to true the checkbox is disabled but it is optional
 * @param {ReactNode} children : accepts strings , element e.g <p>Test</p> or <Ratings/>
 * @example <Checkbox name="newsletter" handleChange={handleChange} isChecked={isChecked}><p className="ml-3">Newsletter</p></Checkbox> or <Checkbox name="rating" handleChange={handleChange} isChecked={isChecked}><Ratings/></Checkbox>
 */

const Checkbox = ({ name, handleChange, isChecked, isDisabled, children }) => {
  return (
    <label htmlFor={name} className="flex items-center">
      <CheckboxInput
        id={name}
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        onClick={handleChange}
        disabled={isDisabled}
      />
      <CheckboxDisplay />
      {children}
    </label>
  );
};

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  children: PropTypes.node,
};

export default Checkbox;
