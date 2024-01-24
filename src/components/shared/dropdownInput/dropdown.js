import React, { forwardRef, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

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
      isDisabled,
      handleChange,
      closeMenuOnSelect,
      handleSelectedYear
    },
    ref
  ) => {
    const [selectedOptions, setSelectedOptions] = useState(value ?? []);
    const components = makeAnimated();
    const selectStyles = {
      control: (baseStyles, state) => ({
        ...baseStyles,
        background: errors?.errors[field?.name] ? "#FF3B300D" : "#FFFFFF",
        fontWeight: 400,
        fontSize: "13px",
        lineHeight: "23px",
        height: "40px",
        color: "#186F3D",
        border: errors?.errors[field?.name]
          ? "1px solid #FF3B30"
          : "1px solid #186F3D",
        boxShadow: state.isFocused ? 0 : 0,
        "&:hover": { border: "1px solid #186F3D" },
      }),
      placeholder: (baseStyles) => ({
        ...baseStyles,
        color: "#333333",
        fontSize: "13px",
      }),
      dropdownIndicator: (selectProps, state, baseStyles) => ({
        ...baseStyles,
        color: "#186F3D",
        width: "34px",
        transition: "all .1s ease",
        transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
      }),
      indicatorSeparator: () => null,
      option: (baseStyles, state) => ({
        ...baseStyles,
        background: state.isFocused || state.isSelected ? "#F2F2F2" : "#FFFFF",
        fontSize: "13px",
        color: state.isFocused || state.isSelected ? "#186F3D" : "black",
      }),
    };
    return (
      <>
        <Select
          value={multiple ? selectedOptions : value}
          defaultValue={[options[0]]}
          styles={selectStyles}
          isMulti={multiple}
          isSearchable={false}
          placeholder={placeholder}
          components={components}
          name={field?.name}
          inputRef={ref}
          options={options}
          isDisabled={isDisabled}
          classNamePrefix="select"
          closeMenuOnSelect={closeMenuOnSelect}
          onChange={(val) => {
            field?.onChange(
              !multiple
                ? val?.label
                : setSelectedOptions((prev) =>
                    val?.map((v) =>
                      v?.value !== prev?.value
                        ? { label: v?.label, value: v?.value }
                        : prev
                    )
                  )
            );
            handleChange?.(multiple ? val : val?.label);
            handleSelectedYear(val?.value);
          }}
          className={`${className} basic-multi-select`}
        />
      </>
    );
  }
);
export default SelectDropdown;
