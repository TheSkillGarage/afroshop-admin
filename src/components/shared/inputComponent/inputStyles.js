import styled from "styled-components";

const InputBox = styled.div`
  align-items: center;
  gap: 10px;
  padding: 8px 20px;
  font-size: 16px;
  font-weight: 400;
  background: #f2f2f2;
  height: 53px;
  width: 100%;
  border: ${({ loading, success, error }) =>
    loading || success ? "1px solid #cccccc " : error ? "1px solid #FF3B30" : ""};
  border-radius: 4px;

  &.input_error {
    background: #ff3b300d;
    border: 1px solid #ff3b30;
  }

  &:hover {
    border: ${({ readOnly }) => (readOnly ? "none" : "1px solid #cccccc")};
  }

  &:focus-within {
    border: ${({ readOnly, error }) => (readOnly ? "none" : !error && "1px solid #186f3d")};
  }

  &:disabled {
    cursor: not-allowed;
    border: 1px solid #f2f2f2;
    background-color: #f2f2f2;
  }
`;

export { InputBox };
