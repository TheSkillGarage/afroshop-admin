import React from "react";
import classNames from "classnames";
import {
  RightGreenArrow,
  RightWhiteArrow,
  RightGreyIcon,
  LeftBlackArrow,
  WhiteCart,
  DownloadIcon,
  BackToTop,
  AddIcon,
  LogoutIcon2
} from "../../../images";
import PropTypes from "prop-types";
import { ClipLoader } from 'react-spinners';

/**
 * @description Button Component
 *
 * @param {string} type : to indicate the type of button, it can be type "submit", "button" or "reset", depending on the action performed.
 * @param {string} variant : to indicate different variants of the button which have different colors i.e "primary", "secondary" or "tertiary" variant. A button is of the primary vairant by default.
 * @param {string} outline : to indicate the different outline colors on the button i.e a button with a colored border which can be any color but right now restricted to "black", "green" and "white".
 * @param {func} onClick : to handle onClick actions on button to know when a user clicks on it and the action performed. The action comes from the component its being used in.
 * @param {string} icon : the different arrows that are used in a button are called icons. it can be "grey", "white", "cart" or "green".
 * @param {string} direction: to indicate the direction of the icon (arrow) used in a button. It can be "row" or "reverse". It's default value is "row"
 * @param {string} size: to indicate the sizes of a button i.e the width and the height, Size can "big", "small" or "full" and a default size is provided if the size props is not used.
 * @param {boolean} loading: to indicate when a button is in its loading state or not. If it's true then the loader svg shows and if it's false, the text in the button shows. For example const [loading, setLoading] = useState(false);
 * @example <Button type="button" onClick={handleClick} variant="secondary" loading={loading} outline="green">Sign up</Button> or <Button type="button" onClick={handleClick} icon="white" size="small"><Log in/></Button>
 */

const VARIANT = {
  primary:
    "bg-[#186F3D] text-[#FFFFFF] hover:bg-[#25945A] focus:bg-[#0C4D26] disabled:bg-[#F2F2F2] disabled:text-[#CCCCCC]",
  secondary:
    "bg-[#FCAE1726] text-[#333333] hover:bg-[#FCAE171A] focus:bg-[#FCAE1733]",
  tertiary:
    "bg-[#FFFFFF] text-[#186F3D] hover:text-[#25945A] focus:text-[#0C4D26] border border-1 border-[#186F3D]",
  transparent: "bg-transparent",
  disabled: "bg-[#F2F2F2] text-[#CCCCCC]"
};
const OUTLINE = {
  black: "border border-1 border-black",
  white: "border border-1 border-white",
  green: "border border-1 border-[#186F3D]",
};
const ICONS = {
  white: <RightWhiteArrow />,
  grey: <RightGreyIcon />,
  green: <RightGreenArrow />,
  black: <LeftBlackArrow />,
  cart: <WhiteCart />,
  download: <DownloadIcon />,
  top: <BackToTop />,
  add: <AddIcon />,
  logout: <img src={LogoutIcon2} alt="log-out-icon" />,
};

const iconDirection = {
  row: "flex flex-row",
  reverse: "flex flex-row-reverse",
};
const SIZE = {
  small: "w-36 h-10",
  big: "w-44 h-10",
  full: "w-full h-full"
};

const LoaderColor = {
  primary: "#FFFFFF",
  secondary: "#1E1E1E",
  tertiary: "#186F3D"
}

const Button = ({
  type = "button",
  variant = "primary",
  children = null,
  icon,
  direction = "row",
  className,
  outline = "",
  onClick,
  loading,
  size,
  ...restProps
}) => {
  const classes = classNames(
    outline && OUTLINE[outline],
    variant && VARIANT[variant],
    size && SIZE[size],
    className
  );

  return (
    <button
      {...restProps}
      disabled={variant === "disabled"}
      type={type}
      className={`flex flex-row justify-center items-center rounded ${!size && `w-44 h-10`} ${classes}`}
      onClick={onClick}
    >
      {loading ? (
        <ClipLoader
          color={LoaderColor[variant]}
          loading={true}
          size={14}
          speedMultiplier={2}
        />
      ) : (
        <span
          className={`${icon && iconDirection[direction]
            } justify-center items-center gap-2 font-normal leading-6 text-base w-full`}
        >
          {children}
          {icon && ICONS[icon]}
        </span>
      )}
    </button>
  );
};

export default Button;

Button.propTypes = {
  type: PropTypes.string,
  variant: PropTypes.string,
  outline: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.string,
  size: PropTypes.string,
  direction: PropTypes.string,
  loading: PropTypes.bool
};
