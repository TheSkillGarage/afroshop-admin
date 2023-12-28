import React from 'react';
import Select from 'react-select';

const SelectDropdown = ({ className, options, field, errors, placeholder, multiple }) => {
    const selectStyles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      background: errors?.errors[field?.name] ? "#FF3B300D" : '#FFFFFF',
      fontWeight: 400,
      fontSize: '13px',
      color: "#186F3D",
      height: '40px',
      border: "1px solid #186F3D",
      boxShadow: state.isFocused ? 0 : 0,
      '&:hover': {border: '1px solid #186F3D'},
    }),
    placeholder :(baseStyles) =>({
      ...baseStyles,
      color: "#186F3D",
      fontSize: "16px"
    }),
    dropdownIndicator: (selectProps, state,baseStyles)=>({
      ...baseStyles,
      color: "#186F3D",
      width: "34px",
      transition: 'all .1s ease',
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null
    }),
    indicatorSeparator:()=> null,
    option: (baseStyles,state) =>({
      ...baseStyles,
      background: state.isFocused || state.isSelected ? "#F2F2F2" : "#FFFFF",
      fontSize: "13px",
      color: state.isFocused || state.isSelected ? "#186F3D" : "black"
    })
  };
  return (
    <>
      <Select
        styles={selectStyles}
        isMulti={multiple}
        isSearchable = {false}
        placeholder= {placeholder}
        name={field?.name}
        inputRef={field?.ref}
        options={options}
        onChange={(val) => field?.onChange(val?.value)}
        className = {`${className}`}
      />
    </>
  );
};
export default SelectDropdown;
