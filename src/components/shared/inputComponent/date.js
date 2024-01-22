import React, { useState } from "react";
import Calendar from "react-calendar";
import InputComponent from ".";

const DateInput = ({
  className,
  fieldName,
  minDate,
  maxDate,
  errors,
  control,
  disabled,
  leftIcon,
  rightIcon,
  onIconClick,
  iconClassName,
  label,
  name,
  placeholder,
  required,
  requiredMessage,
  type,
  value,
  loading,
  success,
  register,
  patternValue,
  patternMessage,
  options,
  keyDown,
  handleChange,
  onClick,
  isReadOnly = false,
  multiple = false,
  compoundValidation = false,
}) => {
  const [calenderOpen, setCalenderOpen] = useState();

  const toggleCalender = () => {
    setCalenderOpen(!calenderOpen);
  };
  return (
    <div>
      <InputComponent
        value={value}
        label={label}
        fieldName={fieldName}
        name={name}
        placeholder={placeholder}
        control={control}
        inputType={type}
        required={required}
        requiredMessage={requiredMessage}
        type={type}
        register={register}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        handleChange={() => null}
        disabled={disabled}
        errors={errors}
        className={className}
        handleInputClick={toggleCalender}
      />
      {calenderOpen && (
        <Calendar
          onChange={(value) => handleChange(value?.toString())}
          minDate={minDate}
          maxDate={maxDate}
        />
      )}
    </div>
  );
};

export default DateInput;
