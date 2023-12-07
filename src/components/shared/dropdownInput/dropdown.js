import React from 'react';
import Select from 'react-select';

const SelectDropdown = ({ className, options, field, errors, placeholder }) => {

    const selectStyles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      background: errors[field.name] ? "#FF3B300D" : '#F2F2F2',
      fontWeight: 400,
      fontSize: '16px',
      height: '53px',
      border: errors[field.name]? "1px solid #FF3B30": state.isFocused ? 0 : 0,
      boxShadow: state.isFocused ? 0 : 0,
      '&:hover': {border: state.isFocused ? '1px solid #186F3D' : 0},
    }),
    placeholder :(baseStyles) =>({
      ...baseStyles,
      color: "black"
    }),
    dropdownIndicator: (selectProps, state,baseStyles)=>({
      ...baseStyles,
      color: "black",
      width: "34px",
      transition: 'all .1s ease',
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null
    }),
    indicatorSeparator:()=> null,
    option: (baseStyles,state) =>({
      ...baseStyles,
      background: state.isFocused || state.isSelected ? "#F2F2F2" : "#FFFFF",
      fontSize: "16px",
      color: state.isFocused || state.isSelected ? "#186F3D" : "black"
    })
  };
  return (
    <>
      <Select
        styles={selectStyles}
        isSearchable = {false}
        placeholder= {placeholder}
        name={field.name}
        inputRef={field.ref}
        options={options}
        value={options.find((c) => c.value === field.value)}
        onChange={(val) => field.onChange(val.value)}
        className = {`${className}`}
      />
    </>
  );
};
export default SelectDropdown;
