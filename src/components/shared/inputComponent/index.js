import React, { forwardRef, useState } from "react";
import { InputBox } from "./inputStyles";
import PropTypes from "prop-types";
import { ErrorIcon, LoadingIcon, successIcon } from "../../../images";
import SelectDropdown from "../dropdownInput/dropdown";
import { Controller } from "react-hook-form";

/**
 * @description Input Component
 *
 * @param {string} inputType : to indicate the type of input, it can be type "select" or defualt input.
 * @param {string} type : to indicate the type of input, it can be type "email", "password", "phone" or default "text".
 * @param {string} fieldName : to indicate fieldname to which input is associated and needed for validation.
 * @param {string} leftIcon : icon to be displayed on left side of input box
 * @param {string} rightIcon : icon to be displayed on right side of input box
 * @param {string} placeholder : text to displayed as placeholder
 * @param {string} requiredMessage: error message to be displayed if validation fails
 * @param {string} patternValue: pattern to be checked for validation
 * @param {boolean} required: to indicate filed is mandatory or not
 * @param {string} register: to indicate filed to be registered o form
 * @example <InputComponent type="email" placeholder="Enter email" fieldName="email" requiredMessage="Enter valid email" patternValue={/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/} patternMessage="Invalid email address" register={register} errors={errors} leftIcon={Sms}/>
 * */

const InputComponent = forwardRef(
  (
    {
      min,
      max,
      className,
      id,
      fieldName,
      inputType,
      maxLength,
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
      handleInputClick,
      isReadOnly = false,
      multiple = false,
      compoundValidation = false,
      isDisabled = false,
      onBlur,
      defaultValue,
      closeMenuOnSelect,
    },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        <label className="text-[#B3B3B3] text-[13px]">{label}</label>
        {inputType === "select" ? (
          <Controller
            control={control}
            name={fieldName}
            rules={{ required: requiredMessage }}
            render={({ field }) => {
              return (
                <div className="relative">
                  {leftIcon ? (
                    <img src={leftIcon} className="absolute" alt="leftIcon" />
                  ) : null}
                  <SelectDropdown
                    {...register(fieldName)}
                    multiple={multiple}
                    className={`${className} rounded`}
                    field={field}
                    name={field?.name}
                    register={register}
                    errors={errors}
                    isDisabled={isDisabled}
                    options={options}
                    handleChange={handleChange}
                    closeMenuOnSelect={closeMenuOnSelect}
                    defaultValue={defaultValue}
                    value={
                      field.value
                        ? !multiple
                          ? { value: field?.value, label: field?.value }
                          : field.value?.map((v) => v)
                        : null
                    }
                    placeholder={placeholder}
                  />
                </div>
              );
            }}
          />
        ) : (
          <InputBox
            loading={loading}
            success={success}
            readOnly={isReadOnly}
            className={`${className} ${type === "file" ? "hidden" : "flex"} ${errors[fieldName] &&
              (fieldName === "currentPassword" ? null : "input_error")
              }`}
          >
            {leftIcon ? <img src={leftIcon} alt="leftIcon" /> : null}
            <input
              id={id}
              className={`bg-inherit w-full border-none focus:outline-none text-[16px] font-normal placeholder-[#333333] ${className}`}
              type={type}
              min={min}
              max={max}
              name={name}
              placeholder={placeholder}
              value={value}
              maxLength={maxLength}
              disabled={disabled}
              onClick={handleInputClick}
              errors={errors}
              {...register(fieldName, {
                required: requiredMessage,
                onChange: handleChange,
                pattern: patternValue
                  ? {
                    value: patternValue,
                    message: patternMessage,
                  }
                  : null,
              })}
              readOnly={isReadOnly}
              onKeyDown={keyDown}
              onBlur={onBlur}
            />

            {rightIcon ? (
              <img
                src={rightIcon}
                alt="rightIcon"
                onClick={onIconClick}
                className={`cursor-pointer ${iconClassName}`}
              />
            ) : null}
          </InputBox>
        )}

        {fieldName !== "currentPassword" && errors[fieldName] && (
          <div className="flex flex-row gap-2 mt-1 ">
            <img src={ErrorIcon} alt="errorIcon" />
            <span className="text-[#FF3B30] text-[10px]">
              {errors[fieldName].message}
            </span>
          </div>
        )}

        {loading && (
          <div className="flex flex-row gap-2">
            <img src={LoadingIcon} alt="LoadingIcon" />
            <span className="text-[#AAAAAA] text-[10px]">Loading</span>
          </div>
        )}

        {success && (
          <div className="flex flex-row gap-2 h-4 items-center">
            <img src={successIcon} alt="successIcon" className="w-4 h-4" />
            <span className="text-[#AAAAAA] text-[10px]">Success</span>
          </div>
        )}
      </div>
    );
  }
);
InputComponent.propTypes = {
  inputType: PropTypes.string.isRequired,
  fieldName: PropTypes.string,
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
  placeholder: PropTypes.string,
  warning: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  success: PropTypes.bool,
  errors: PropTypes.any.isRequired,
  compoundValidation: PropTypes.bool,
  required: PropTypes.bool,
  value: PropTypes.any,
};

export default InputComponent;
