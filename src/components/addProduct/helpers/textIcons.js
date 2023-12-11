import { useState } from "react";
import styled from "styled-components";

const StyledIcon = styled.span`
  cursor: pointer;
  background-color: ${(props) => (props.icon ? "#FFE0B2" : "white")};
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

export const TextIcons = ({ src, alt, styleText }) => {
    const [activeIcon, setActiveIcon] = useState(false);
    const [activeBtn, setActiveBtn] = useState({
      Bold: true,
      Italic: true,
      UnorderedList: true,
      OrderedList: true,
      AlignLeft: false,
      AlignRight: false,
      AlignCenter: false,
      AlignJustify: false,
    })
  
    const handleClickIcon = () => {
      styleText()
      setActiveIcon((prev) => {
        if(alt === "OrrderedList"){

        }
        return !prev
      });
    };
    return (
      <StyledIcon icon={activeIcon} onClick={handleClickIcon}>
       <div>
       <img src={src} alt={alt} />
       </div>
      </StyledIcon>
    );
  };
