import { useState } from "react";
import styled from "styled-components";

const StyledIcon = styled.span`
  cursor: pointer;
  background-color: ${(props) => (props.activeIcon ? "#FFE0B2" : "white")};
  padding: 10px;
  width: 35px;
  height: 35px;
  border-radius: 50%;

  img {
    width: 100%;
    height: auto;
    margin: 0 auto;
  }
`;

export const TextIcons = ({ src }) => {
    const [activeIcon, setActiveIcon] = useState(false);
  
    const handleClickIcon = () => {
      setActiveIcon((prev) => !prev);
    };
    return (
      <StyledIcon activeIcon={activeIcon} onClick={handleClickIcon}>
        <img src={src} alt="icon" />
      </StyledIcon>
    );
  };
