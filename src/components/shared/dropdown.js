import React from 'react';
import Select from 'react-select';

const DropdownSelect = ({ className, options, placeholder }) => {
  const selectStyles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      background: '#FFFFFF',
      fontWeight: 400,
      fontSize: '13px',
      height: '40px',
      border: '1px solid #186F3D',
      boxShadow: 0,
      '&:hover':  '1px solid #186F3D',
    }),
    placeholder: (baseStyles) => ({
      ...baseStyles,
      color: '#186F3D',
    }),
    dropdownIndicator: (selectProps, state, baseStyles) => ({
      ...baseStyles,
      color: '#186F3D',
      width: '34px',
      transition: 'all .1s ease',
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null,
    }),
    indicatorSeparator: () => null,
    option: (baseStyles, state) => ({
      ...baseStyles,
      background: state.isFocused || state.isSelected ? '#F2F2F2' : '#FFFFF',
      fontSize: '13px',
      color: '#186F3D',
    }),
  };
  return (
    <>
      <Select
        styles={selectStyles}
        isSearchable={false}
        placeholder={placeholder}
        options={options}
        className={`${className}`}
      />
    </>
  );
};
export default DropdownSelect;
