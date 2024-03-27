import styled from "styled-components";
import { greyMarkIcon, whiteMarkIcon } from "../../../images";

const CheckboxDisplay = styled.div``;

const CheckboxInput = styled.input`
  -webkit-appearance: none;
  appearance: none;

  & + ${CheckboxDisplay} {
    width: 24px;
    height: 24px;
    border: 1px solid #CCCCCC;
    background-color: #ffffff;
    border-radius: 4px;
    box-sizing: border-box;
    margin-right: 0.5rem;
  }

  &:hover + ${CheckboxDisplay} {
    border: 1px solid #186F3D;
  }

  &:focus + ${CheckboxDisplay} {
    outline: 2px solid #FFE0B2;
  }

  &:disabled + ${CheckboxDisplay} {
    background-color: #F2F2F2;
    border: 1px solid #F2F2F2;
    background-image: url("${greyMarkIcon}");
    background-repeat: no-repeat;
    background-position: center;
  }

  &:checked + ${CheckboxDisplay} {
    background-color: #186f3d;

    background-image: url("${whiteMarkIcon}");
    background-repeat: no-repeat;
    background-position: center;
  }
`;

export { CheckboxDisplay, CheckboxInput };
