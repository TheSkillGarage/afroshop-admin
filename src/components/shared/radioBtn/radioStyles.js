import styled from "styled-components";
import { radio } from "../../../images";

const Wrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const Radio = styled.input`
  appearance: none;
  margin: 0;
  width: 1.5em;
  height: 1.5em;
  border: 1px solid gray;
  border-radius: 50%;
  &:after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 0.75em;
    height: 0.75em;
    margin: 5px;
  }
  &:hover {
    border: 1px solid green;
  }
  &:focus {
    border: 1px solid green;
    outline: 2px solid #ffe0b2;
  }
  &:checked {
    border: 1px solid green;
    background-image: url("${radio}");
    background-repeat: no-repeat;
    background-position: center;
  }

  &:disabled {
    cursor: not-allowed;
    border: 1px solid #f2f2f2;
    background-color: #f2f2f2;
    &:checked {
      &:after {
        background-color: #cccccc;
      }
    }
  }
`;
export {Wrapper, Radio}