import React, { forwardRef, useState } from "react";
import Select from "react-select";

const SelectDropdown = forwardRef(
  (
    {
      className,
      options,
      field,
      errors,
      placeholder,
      multiple,
      value,
      defaultValue,
    },
    ref
  ) => {
    const selectStyles = {
      control: (baseStyles, state) => ({
        ...baseStyles,
        background: errors[field.name] ? "#FF3B300D" : "#F2F2F2",
        fontWeight: 400,
        fontSize: "16px",
        height: "53px",
        border: errors[field.name]
          ? "1px solid #FF3B30"
          : state.isFocused
          ? 0
          : 0,
        boxShadow: state.isFocused ? 0 : 0,
        "&:hover": { border: state.isFocused ? "1px solid #186F3D" : 0 },
      }),
      placeholder: (baseStyles) => ({
        ...baseStyles,
        color: "#333333",
        fontSize: "16px",
      }),
      dropdownIndicator: (selectProps, state, baseStyles) => ({
        ...baseStyles,
        color: "black",
        width: "34px",
        transition: "all .1s ease",
        transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
      }),
      indicatorSeparator: () => null,
      option: (baseStyles, state) => ({
        ...baseStyles,
        background: state.isFocused || state.isSelected ? "#F2F2F2" : "#FFFFF",
        fontSize: "16px",
        color: state.isFocused || state.isSelected ? "#186F3D" : "black",
      }),
    };
    return (
      <>
        <Select
          value={value}
          defaultValue={defaultValue}
          styles={selectStyles}
          isMulti={multiple}
          isSearchable={false}
          placeholder={placeholder}
          name={field?.name}
          inputRef={ref}
          options={options}
          onChange={(val) => field.onChange(val?.value)}
          className={`${className}`}
        />
      </>
    );
  }
);
export default SelectDropdown;
