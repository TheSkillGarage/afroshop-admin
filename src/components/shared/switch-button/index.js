import React from "react";
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Slider = styled.span`
&:before{
  position: absolute; 
  content: "";
  height: 16px; 
  width: 16px; 
  left: 4px;
  bottom: 4px;
  background-color: #ffffff;
  transition: ease-in 0.3s;
  border-radius: 50%;
}
`;

const Switchbox = styled.input`
&:checked + ${Slider} {
  background-color: #186F3D;
  box-shadow: 0 0 0 0 !important;
}

&:checked + ${Slider}::before {
    transform: translateX(24px);
}

&:hover + ${Slider}{
  box-shadow: 0px 4px 8px rgba(51, 51, 51, 0.16);
}

&:disabled + ${Slider}{
  background-color: #F2F2F2;
}

&:focus + ${Slider}{
  outline: solid 2px #FFE0B2 !important;
}
`

/**
 * @description SwitchButton Component
 *
 * @param {string} name : this is the name and id of the checkbox element
 * @param {boolean} checked : this controls the state of the switch button i.e whether on or off. true = checked; false = unchecked
 * @param {func} handleSwitch : this function is used to change the state of the switch button between on and off i.e true or false
 * @param {boolean} disabled : this controls whether the switch is enabled or not. true = disabled, false = enabled

 * @example <SwitchButton name={"newsletter"} checked={isChecked} handleSwitch={handleSwitch} disabled={false} />
 */


const SwitchButton = ({ name, checked, handleSwitch, disabled }) => {

  return (
    <label htmlFor={name} className="relative inline-block h-6 w-12">
      <Switchbox
        type="checkbox"
        name={name}
        id={name}
        checked={checked}
        onChange={handleSwitch}
        disabled={disabled}
        className="w-0"
      />
      <Slider className="absolute cursor-pointer inset-x-0 inset-y-0 bg-gray-300 ease-in duration-200 rounded-xl"></Slider>
    </label>

  )
}

SwitchButton.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  handleSwitch: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export default SwitchButton;
