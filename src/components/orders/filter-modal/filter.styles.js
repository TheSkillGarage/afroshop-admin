import styled from 'styled-components';

const CustomScrollbar = styled.div`
  position: relative;
  max-height: 393px;
  overflow-y: scroll;
  z-index: 10;
  background-color: #ffffff;

  /* For WebKit browsers (Chrome, Safari) */
  &::-webkit-scrollbar {
    width: 5px; /* Set scrollbar width */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #e6e6e6; /* Set scrollbar color */
    border-radius: 4px; /* Set border radius */
  }

  &::-webkit-scrollbar-track {
    background-color: transparent; /* Make scrollbar background color transparent */
  }

  /* For Firefox */
  scrollbar-width: thin;
  scrollbar-color: #e6e6e6 transparent;

  /* For IE */
  -ms-overflow-style: none; /* Hide scrollbar in IE */

  &::-ms-scrollbar-thumb {
    background-color: #e6e6e6;
    border-radius: 4px; /* Set border radius */
  }

  &::-ms-scrollbar-track {
    background-color: transparent; /* Make scrollbar background color transparent */
  }

  /* Show scrollbar on hover for IE */
  &:hover::-ms-scrollbar-thumb {
    background-color: #555; /* Change thumb color on hover for IE */
  }
`;

// const Paragraph = styled.p`
//   position: relative;
//   z-index: 1; /* Set a higher z-index */
//   width: 100%;
//   height: 48px;
//   font-size: 16px;
//   line-height: 24px;
//   color: #333333;
//   background-color: #ffffff;
//   cursor: pointer;
//   transition: background-color 0.3s, color 0.3s;

//   &:hover {
//     background-color: #f2f2f2;
//     color: #186f3d;
//   }
// `;



export default CustomScrollbar;
